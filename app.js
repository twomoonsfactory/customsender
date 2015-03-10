var app = angular.module('gameMaster')
	.controller('gameController', [$scope, gameValues, castServices, function($scope, gameServices, castServices){
		// set default databindings on display
		$scope.messages = gameValues.header;
		$scope.hulk = gameValues.firstImage;

		// onMessage event handler for the simpleBus test channel
		simpleBus.onMessage = function(event) {
			$log.log('Sender ' + event.senderID + ' message: ' + event.data);
			// send message to be displayed on screen
			$scope.messages = event.data;
			$scope.hulk = gameValues.secondImage;
			simpleBus.send(event.senderId, "Polo");
		}


	}]);
	.value('gameValues', {
		// game constants/initial values/values to be available across controllers
		header: "Waiting for message...",
		firstImage: "https://33.media.tumblr.com/48b1991b8026737f52d607651be4a43e/tumblr_nkpb0640Of1qcm3fwo1_500.gif",
		secondImage: "https://31.media.tumblr.com/9609c3e2cd75207185faeff18e44d2ab/tumblr_mthtpofxcy1rdbd0qo2_500.gif"
	});
	.factory('gameServices', function(){
		// game particular functions to go here as needed


		return gameServices;
	});

var caster = angular.module('castServices')
	.value('cast', cast)
	.factory('castMessageBus', ['cast', '$log', function(cast, $log){

	// start up chromecast
	cast.receiver.logger.setLevelValue(0);
	var castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
	$log.log('Starting Receiver Manager');

	// 'ready' event handler
	castReceiverManager.onReady = function(event) {
		$log.log('Received Ready event: ' + JSON.stringify(event.data));
		castReceiverManager.setApplicationState("Application status is ready...");	
	};

	// 'senderconnected' event handler
	castReceiverManager.onSenderConnected = function(event){
		$log.log('Received Sender Connected event: ' + event.data);
		$log.log(castReceiverManager.getSender(event.data).userAgent);
	};

	// 'senderdisconnected' event handler
	castReceiverManager.onSenderDisconncted = function(event){
		$log.log('Received Sender Disconnected event: ' + event.data);
		if (castReceiver.Manager.getSenders().length == 0){
			close();
		}
	};

	// 'systemvolumechanged' event handler
	castReceiverManager.onSystemVolumeChanged = function(event){
		$log.log('Received System Volume Changed event: ' + event.data['level'] + ' ' + event.data['muted']);
	};

	// test CastMessageBus for the app connection -- we will be creating
	// more as we need more for the actual app functionality
	var simpleBus = castReceiverManager.getCastMessageBus('urn:x-cast:com.pt.basic');

	// initialization for the manager and log
	castReceiverManager.start({statusText: "Application is starting"});
	$log.log('Receiver Manager started');

	return castMessageBus;
	}]);