<!--
// created by AJ Larson as Senior Capstone and proof of concept
// Chromecast party game
-->
script 
var TG_NAMESPACE = "urn:x-cast:com.twomoonsfactory.things";

var TG_APP_ID = 285A9A14;

function ThingsEvent() {}

ThingsEvent.prototype.event;

ThingsEvent.prototype.message;

ThingsEvent.prototype.player;

ThingsEvent.prototype.end_state;

var ThingsEventCommand;

//Game Scope
function ThingsGameAppCtrl($scope){
	
	this.logger_ = {'info':
	
		function(message){
			console.info('[ThingsGameAppCtrl] ' + JSON.stringify(message));
		}
	};
	
	this.scope_ = $scope;
	
	this.model_ = {};
	this.resetModel_();
	
	this.session = null;
	
	this.playerNumber = 0;
	
	this.playAction = false;
	
	window['__onGCastApiAvailable'] = (function(loaded, errorInfo) {
		if (loaded) {
			this.init_();
		} else {
			this.appendMessage_(errorInfo);
		}
	}).bind(this);
	
	  var script = document.createElement('script');
  script.src = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js';
  document.head.appendChild(script);
}

ThingsGameAppCtrl.nullFunction = function () {};

ThingsGameAppCtrl.prototype.appendMessage_ = function(message) {
	if (message) {
		this.model_['message'] += '\n' + JSON.stringify(message);
		this.safeApply_();
	}
};

ThingsGameAppCtrl.prototype.init_ = function() {
	if (!chrome.cast || !chrome.cast.isAvailable) {
		setTimeout(this.init_.bind(this), 1000);
		return;
	}

	this.scope_['apiInitialzed'] = false;
	this.scope_['stop'] = this.stop_.bind(this);
	this.scope_['move'] = this.move_.bind(this);
	this.scope_['play'] = this.play_.bind(this);
	this.scope_['quit'] = this.quit_.bind(this);
	this.model_['message'] = '';

	var sessionRequest = new chrome.cast.SessionRequest(TTT_APP_ID);
	var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
		this.sessionListener_.bind(this),
		this.receiverListener_.bind(this));

	chrome.cast.initialize(apiConfig, this.onInitSuccess_.bind(this),
		this.onError_.bind(this));
};


ThingsGameAppCtrl.prototype.sessionUpdateListener_ = function(isAlive) {
	var message = isAlive ? 'Session Updated' : 'Session Removed';
	message += ': ' + this.session_.sessionId;
	this.appendMessage_(message);
	if (!isAlive) {
		this.session_ = null;
		this.model_['status'] = 'Game not started.';
		this.model_['started'] = false;
		this.resetModel_();
	}	
	this.safeApply_();
};

ThingsGameAppCtrl.prototype.receiverListener_ = function(e) {
	this.appendMessage_('receiver listener: ' + e);
};

ThingsGameAppCtrl.prototype.onInitSuccess_ = function() {
	this.appendMessage_('init success');
	this.scope_['apiInitialzed'] = true;
	this.launch_();
	this.safeApply_();
};

ThingsGameAppCtrl.prototype.sessionListener_ = function(e) {
	this.appendMessage_('New session ID: ' + e.sessionId);
	this.session_ = e;
	e.addUpdateListener(this.sessionUpdateListener_.bind(this));
	e.addMessageListener(TTT_NAMESPACE,
		this.onReceiverMessage_.bind(this));
	window.setTimeout(this.requestLayout_.bind(this), 250);
	this.safeApply_();
	if( this.playAction ) { // initiated by join action
		this.play_();
		this.playAction = false;
	}
};

ThingsGameAppCtrl.prototype.onReceiverMessage_ = function(
		namespace, messageString) {
	this.appendMessage_('Got message: ' +
						namespace + ' ' +
						messageString);
	var message = /** @type {TicTacToeEvent} */ (JSON.parse(messageString));
	if (message.event == 'board_layout_response') {
		this.board = message.board;
		this.model_['boardDisplay'] = [
			this.board.slice(0, 3),
			this.board.slice(3, 6),
			this.board.slice(6, 9)
		];
	} else if (message.event == 'error') {
		alert(message.message);
	} else if (message.event == 'moved') {
		//this.requestLayout_();
		if (this.model_['started']) {
		this.model_['myTurn'] = message.player != this.player_;
		if (this.model_['boardDisplay']) {
			this.model_['boardDisplay'][message.row][message.column] =
			message.player == 'X' ? 1 : 2;
		} else {
			this.requestLayout_();
		}
		} else {
		this.model_['status'] = 'Observing a game.';
		this.model_['observing'] = true;
		this.requestLayout_();
		}
	} else if (message.event == 'joined') {
		this.requestLayout_();
		this.player_ = message.player;
		this.playerNumber_ = this.player_ == 'X' ? 1 : 2;
		this.model_['status'] = 'Game in progress.';
		this.model_['symbol'] = this.player_;
		this.model_['gameInProgress'] = true;
		this.model_['myTurn'] = this.player_ == 'X';
	} else if (message.event == 'endgame') {
		this.model_['status'] = 'Game over.';
		this.model_['outcome'] = message.end_state;
		this.model_['gameInProgress'] = false;
		this.model_['observing'] = false;
		this.model_['started'] = false;
	}
	this.safeApply_();
};