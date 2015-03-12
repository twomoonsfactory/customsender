angular.module('gameMaster', ['gameMaster.controllers', 'gameMaster.services', 'gameMaster.castServices']);

angular.module('gameMaster.controllers', [])
  .controller('gameController', ['$scope', '$log', 'imageProvider', 'messageBus', function($scope, $log, imageProvider, messageBus/*,messageSender, messageReceiver*/){
      $scope.message = 'Waiting to hear Marco...';
      $scope.hulk = imageProvider.getPic('waiting');

      // $scope.players = [];

      // messageReceiver.subscribe(messagereceiver.messagetypes.playerconnected, function(args){
      // 	$scope.players.push({id: args.id});
      // 	$scope.checkPlayerName();
      // });

  		// var receiver{
  		// 	messagetypes = {
  		// 		playerconnected: 'playerconnected',  				
  		// 	}

  		// 	var subscribers = {};


  		// 	function subscribe(eventId, callback){
  		// 		if(!messagetypes[eventId])
  		// 		{
  		// 			console.log("INVALID MESSAGE TYPE!");
  		// 			return;
  		// 		}
  				
  		// 		subscribers[eventId].push(callback);
  		// 	}

  		// 	function publish(eventId, args){  	
  		// 		if(!messagetypes[eventId])
  		// 		{
  		// 			console.log("INVALID MESSAGE TYPE!");
  		// 			return;
  		// 		}
  		// 		var callbacks = subscribers[eventId];

  		// 		for (var i = callbacks.length - 1; i >= 0; i--) {();
  		// 			callbacks[i](args);
  		// 		};
  		// 	}
  		// }

      // $scope.checkPlayerName = function(){
      // 	var lastPlayerJoined = $scope.players[$scope.players.length-1];
      // 	if(!lastPlayerJoined.name){
      // 		messageSender.requestplayername(lastPlayerJoined.id);
      // 	}
      // };
      
      // messageSender.send('requestgamename', [7], {});
      // messageSender.send('requestpromptvote', [1,2,3,4,5,6,7], {options: ['things that fart', 'things that x', 'things that write']});

      // messageSender.requestgamename([7]);
      // messageSender.requestpromptvote([1,2,3,4,5,6,7], currentOptions);



      //here's the chromecast message handler:
      // castMessageBus.onMessage = function(event){
        $log.log("Message received: " + event.data);
        $scope.message = event.data;
        $scope.hulk = imageProvider.getPic('done');
        $scope.$apply();
        castMessageBus.send(event.senderId, "Polo");
    };
      
}]);

angular.module('gameMaster.services', [])
  .service('imageProvider', function() {
    var images = [{
      id: "waiting",
      image: "https://33.media.tumblr.com/48b1991b8026737f52d607651be4a43e/tumblr_nkpb0640Of1qcm3fwo1_500.gif"
    }, {
      id: "done",
      image: "https://31.media.tumblr.com/9609c3e2cd75207185faeff18e44d2ab/tumblr_mthtpofxcy1rdbd0qo2_500.gif"
    }];

    this.getPic = function(arg) {
      for (var i = 0; i < images.length; i++) {
        if (images[i].id === arg)
          return images[i].image;
      }

    };

  });

angular.module('gameMaster.castServices', [])
  .value('cast', cast)
  .factory('messageBus', function(cast, $log/*, messageReceiver*/) {

	// var messageBuses = {
 //  		gamename: castReceiverManager.getCastMessageBus('urn:x-cast:com.partythings.gamename'),
 //  		playername: castReceiverManager.getCastMessageBus('urn:x-cast:com.partythings.playername'),
 //  	};

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
    castReceiverManager.onSenderConnected = function(event) {
      $log.log('Received Sender Connected event: ' + event.data);
      $log.log(castReceiverManager.getSender(event.data).userAgent);

      //messageReceiver.publish(messagereceiver.messagetypes.playerconnected, {id:event.senderId});
    };

    // 'senderdisconnected' event handler
    castReceiverManager.onSenderDisconncted = function(event) {
      $log.log('Received Sender Disconnected event: ' + event.data);
      if (castReceiverManager.getSenders().length === 0) {
        close();
      }
    };

    // 'systemvolumechanged' event handler
    castReceiverManager.onSystemVolumeChanged = function(event) {
      $log.log('Received System Volume Changed event: ' + event.data.level + ' ' + event.data.muted);
    };

    // test CastMessageBus for the app connection -- we will be creating
    // more as we need more for the actual app functionality
    var messageBus = castReceiverManager.getCastMessageBus('urn:x-cast:com.pt.basic');

    // initialization for the manager and log
    castReceiverManager.start({statusText: "Application is starting"});
    $log.log('Receiver Manager started');

    return messageBus;
  })
	// .service('messageSender', 'messageBus' function($log, messageBuses){		
	// 	var

	// 	this.getGameName = function(args){
	// 		messageBuses.gamename.send(args.id, null);
	// 	}		

	// });
	// 	.service('messageReceiver', 'messageBus' function($log, messageBuses){		

	// 	var messageHandlers = {
	// 		gamenameHandler: messageBuses.gamename.onMessage = function(event){

	// 		},

	// 	}

	// 	init();

	// });