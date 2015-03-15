angular.module('gameMaster', ['gameMaster.controllers', 'gameMaster.services', 'gameMaster.castServices']);
//all display changes still need to be written in -- all internal except the basic test at the moment.
angular.module('gameMaster.controllers', [])
	.controller('gameController', ['$scope', '$log', 'imageProvider', 'messageSender', 'messageReceiver', 'eventService', 'stateManager'
		function($scope, $log, imageProvider, messageSender, messageReceiver, eventService, stateManager) {
	     
	      	$scope.message = 'Waiting for Marco';
	      	$scope.hulk = imageProvider.getPic('waiting');
	      	$scope.gamename = null;
	      	$scope.players = [];
	      	$scope.things = [];
	      	$scope.wrongGuesses = [];
	      	$scope.prompt;
	      	$scope.prompts = {prompt1:null,vote1:0,prompt2:null,vote2:0,prompt3:null,vote3:0};
	      	$scope.currentResults = [];
	      	var playerCount = 0;
	      	var unguessedCount;
	      	var stateCount = 0;
	      	var currentPlayer = 0;
	      	var playerMin = 5;

	      	eventService.subscribe("test", function(args){
	      		$scope.message = args.message;
	      		messageSender.sendTest({senderId: args.senderId, message: "Polo"});
	      	});

	      	//player join handler
	      	eventService.subscribe("playerJoined", function(args){
	      		if(playerCount===0){
	      			stateManager.changeState("waitingForStart");
	      		}
	      		if($scope.gamename = null){
	      			messageSender.requestGameName({senderId:args.senderId, message: "Please name your game!"});
	      		}
	      		else{
	      			messageSender.requestPlayerName({senderId:args.senderId, message: "What is your name?"});
	      		}
	      	});

	      	//game namer will need a player name still
	      	eventService.subscribe("gamenameReceived", function(args){
	      		messageSender.requestPlayerName({senderId:args.senderId, message: "What is your name?"});
	      	});

	      	//handles new players after name received
	      	eventService.subscribe("playernameReceived", function(args){
	      		$scope.players[playerCount] = {status: "notReady",
	      			score: 0,
	      			senderId: args.senderId,
	      			name: args.message,
	      			guessedThisRound: false,
	      			quit: false
	      		};
	      		//if the game is already in progress, will have the player wait for the next game
	      		if(stateManager.state!=="waitingForReady"&&stateManager.state!=="waitingForStart"){
	      			messageSender.sendStandby({senderId:args.senderId, message: "Waiting for the next round."});
	      			$scope.players[playerCount].status = "standingBy";
	      		}
	      		else if(playerCount===playerMin-1{
	      			stateManager.changeState("waitingForReady");
	      		}
	      		playerCount++;
	      	});

	      	//request ready when waitingForReady state is reached
	      	eventService.subscribe("waitingForReady", function(args){
	      		for(var i = 0; i < $scope.players.length; i++){
	      			if($scope.players[i].status!=="quit"){
	      				messageSender.requestReady({senderId:$scope.players[i].senderId, "Ready Up!");
	      			}
	      		}
	      	});

	      	//tallies ready players and moves state when all elegible players are ready
	      	eventService.subscribe("readyReceived", function(args){
	      		for(var i = 0; i < $scope.players.length; i++){
	      			if($scope.players[i].senderId===args.senderId && args.message==="Ready"){;
	      				$scope.players[i].status="ready";
	      				stateCount++;
	      			}
	      			if(stateCount===playerCount){
	      				stateManager.changeState("waitingForVote")
	      				stateCount=0;
	      			}
	      		}
	      	});

	      	//sends prompts to be voted on
	      	eventService.subscribe("waitingForVote", function(args){
	      		//var prompts = getPrompts();
	      		for(var i = 0; i < $scope.players.length; i++){
	      			//grabs players who were waiting for the next round;
	      			if($scope.players[i].status==="ready"||$scope.players[i].status==="standingBy"){
	      				if($scope.players[i].status==="sdandingBy")
	      					playerCount++;
	      				messageSender.requestPrompt($scope.players[i].senderId, JSON.stringify({prompt1:$scope.prompt1,prompt2:$scope.prompt2,prompt3:$scope.prompt3));
	      				$scope.players[i].status="voting";
	      			}
	      		}
	      	});
	      	
	      	//tallies votes on prompts and triggers state change when all votes received
	      	eventService.subscribe("promptReceived", function(args){
	      		for(var i = 0; i < $scope.players.length; i++){
	      			if($scope.players[i].senderId===args.senderId){
	      				$scope.players[i].status="waiting";
	      				switch(args.message){
	      					case "prompt1":
	      						$scope.prompts.vote1++;
	      						break;
      						case "prompt2":
      							$scope.prompts.vote2++;
  								break;;
							default:
								$scope.prompts.vote3++;
						}
	      				stateCount++
	      			}
	      		}
	      		if(stateCount===playerCount){
	      			stateManager.changeState("waitingForThing");
	      			stateCount=0;
	      			if($scope.prompts.vote1>$scope.prompts.vote2 && $scope.prompts.vote1>$scope.prompts.vote3){
	      				$scope.prompt = $scope.prompts.prompt1;
	      			}
	      			else if($scope.prompts.vote2>$scope.prompts.vote1 && $scope.prompts.vote2>$scope.prompts.vote3){
	      				$scope.prompt = $scope.prompgs.prompt2;
	      			}
	      			else if($scope.prompts.vote3>$scope.prompts.vote1 && $scope.prompts.vote3>$scope.prompts.vote2){
	      				$scope.prompt = $scope.prompts.prompt3;
	      			}
	      			else if($scope.prompts.vote1!==$scope.prompts.vote2 && $scope.prompts.vote1===$scope.prompts.vote3){
	      				if(Math.random()<0.5){
	      					$scope.prompt = $scope.prompts.prompt1;
	      				}
	      				else{
	      					$scope.prompt = $scope.prompts.prompt3;
	      				}
	      			}
	      			else if($scope.prompts.vote1!==$scope.prompts.vote3 && $scope.prompts.vote1===$scope.prompts.vote2){
	      				if(Math.random()<0.5){
	      					$scope.prompt = $scope.prompts.prompt1;
	      				}
	      				else{
	      					$scope.prompt = $scope.prompts.prompt2;
	      				}
	      			}
	      			else if($scope.prompts.vote1!==$scope.prompts.vote2 && $scope.prompts.vote2===$scope.prompts.vote3){
	      				if(Math.random()<0.5){
	      					$scope.prompt = $scope.prompts.prompt2;
	      				}
	      				else{
	      					$scope.prompt = $scope.prompts.prompt3;
	      				}
	      			}
	      			else{
	      				switch(Math.floor(Math.random()*3) + 1){
	      					case 1:
	      						$scope.prompt = $scope.prompts.prompt1;
	      						break;
      						case 2:
      							$scope.prompt = $scope.prompts.prompt2;
      							break;
  							default:
  								$scope.prompt = $scope.prompts.prompt3;
	      				}
	      			}
	      			$scope.prompts = null;
	      			stateCount = 0;
	      			unguessedCount = playerCount;
	      		}
	      	});

	      	//sends request for response to prompt
	      	eventService.subscribe("waitingForThing", function(args){
	      		for(var i = 0; i < $scope.players.length; i++){
	      			if($scope.players[i].status==="waiting" && $scope.players[i].guessedThisRound===false){
	      				messageSender.requestThing({senderId:$scope.players[i]), message:$scope.prompt});
	      				$scope.players[i].status="writing";
	      			}
	      		}
	      	});

			//handles prompt responses, haha
			eventService.subscribe("thingReceived", function(args){
				for(var i = 0; i < $scope.players.length; i++){
					if($scope.players[i].senderId===args.senderId){
						$scope.things.push({writer:$scope.players[i].name,thing:args.message, guessedThisTurn: null, guesser: [], turnsUnguessed: 0);
						$scope.players[i].status="waiting";
						stateCount++;
					}
				}
				if(stateCount===playerCount){
					//shuffle "things" before displaying it
					stateManager.changeState("waitingForGuesses");
					stateCount=0;
				}
			});

			//requests the player's guess
			eventService.subscribe("waitingForGuesses", function(args){
				for(var i = 0; i < $scope.players.length; i++){
					if($scope.players[i].status==="waiting"){
						messageSender($scope.players[i].senderId, JSON.stringify($scope.things));
						$scope.players[i].status = "guessing");
					}
				}
			});
			
			//handles received guesses
			eventService.subscribe("guessReceived", function(args){
				for(var i = 0; i < $scope.players.length; i++){
					var guess = angular.fromJson(args.message)
					if($scope.players[i].senderId===args.senderId){
						var correct = false;
						var exists = false;
						//evaluates guesses and sorts them into things for correct guesses and wrongGuesses if not.
						for(var j = 0; j < $scope.things.length; j++){
							correct = false;
							exists = false;
							if(guess.thing===$scope.things[j].thing && guess.writer===$scope.things[j].writer){
								correct = true;
								$scope.things[j].guessedThisTurn = true;
								$scope.things[j].guesser.push($scope.players[i].playername);
							}
							if(!correct){
								for(var k = 0; k < $scope.wrongGuesses.length; k++){
									for(var l = 0; l < $scope.wrongGuesses.length; l++){
										if(guess.thing===$scope.wrongGuesses[k].thing && (guess.writer===$scope.wrongGuesses[l].writer)){
											exists=true;
											wrongGuesses[k].guesser.push($scope.players[i].playername);
										}
									}
								}
								if(!exists){
									wrongGuesses.push({thing:guess.thing, writer:guess.writer, guesser[$scope.players[i].playername]});
								}
							}
						}						
						$scope.players[i].status="waiting";
						stateCount++;
					}
				}
				if(stateCount===playerCount){
					stateManager.changeState("roundResults");
				}
			});

			//resolves guesses w/displays and scores
			eventService.subscribe("roundResults", function(args){
				for(var i = 0; i < $scope.things.length; i++){
					var crCounter = 0;
					if($scope.things[i].guessedThisTurn!==false){
						if($scope.things[i].guessedThisTurn){
							$scope.things[i].guessedThisTurn = false;
							for(var j =0; j < $scope.players.length; j++){
								if($scope.thing[i].writer===$scope.players[j].playername){
									$scope.players[j].guessedThisRound=true;
									unguessedCount--;
								}
							}
							$scope.currentResults[crCounter]={thing:$scope.things[i].thing,
														guessed:$scope.things[i].guessedThisTurn,
														guesses:[]};
							for(var j = 0; j < $scope.things[i].guesser.length; j++){
								$scope.currentResults[crCounter].guesses.push({guesser:$scope.things[i].guesser[j],
																			writer:$scope.things[i].writer,
																			correct:true});
							}
						}
						else{
							$scope.things[i].turnsUnguessed++;
							$scope.currentResults[crCounter]={thing:$scope.things[i].thing,
																guessed:false,
																guesses:[]};
							//assigns bonus points for another round unguessed
							for(var j = 0; j < $scope.players.length; j++){
								if($scope.thing[i].writer===$scope.player[j].playername){
									$scope.player[j].score += 3;
								}
							}

						}
						for(var j = 0; j < $wrongGuesses.length; j++){
								if(wrongGuesses[j].thing===$scope.things[i].thing){
									for(var k = 0; k < $wrongGuesses[j].guesser.length; k++){
										$scope.currentResults[crCounter].guesses.push({guesser:wrongGuesses[j].guesser[k],
																					writer:wrongGuesses[j].writer,
																					correct:false});
									}
								}
							}
						crCounter++;
					}	
				}
				//display results and assign points for votes, point handler will send score updates to individual players
				//if point handling results in player exceeding point threshold
				//stateManager.changeState("endGame");
				//else
				stateManager.changeState("waitingForVote");
			});
			
			//handles end game
			eventService.subscribe("endGame", function(args){
				for(var i = 0; i < $scope.players.length; i++){
					if($scope.players[i].status==="waiting"){
						messageSender.sendEnd($scope.players[i].senderId, /*scoreHandler.winner + " won the game with " + scoreHandler.highscore
							+ " points!\n*/You had " + $scope.players[i].score) points!");
					}
				}
				stateManager.changeState("waitingForReady");
			});

			//handles player quit
			eventService.susbscribe("playerQuit", function(args){
				for(var i = 0; i < $scope.players.length; i++){
					if(args.senderId===$scope.players[i].senderId){
						$scope.players[i].quit=true;
						//change the player's display
						switch(stateManater.state){
							case "waitingForStart" || "waitingForReady":
								$scope.players = $scope.players.slice(i+1);
								break;
							case "waitingForVote":
								$scope.players = $scope.players.slice(i+1);
								playerCount--;
								break;
							case "waitingForGuesses" || "waitingForThing":
								if($scope.players[i].status!=="waiting"){
									$scope.players = $scope.players.slice(i+1);
									playerCount--;
								}				
								else{
									//figure out how to handle this
								}
								break;
						}
					}
				}
			});
  	}]);

angular.module('gameMaster.services', [])
//provides the requested image as a return
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

  	})
  	//sub-pub service
  	.service('eventService', function($log){
  		this.subs = {};
  		this.subscribe = function(eventId, subscriber){
  			if(!this.subs.eventID){
  				this.subs[eventID] = [];
  			}
  			this.subs[eventId].push(subscriber);
  		};
  		this.publish = function(eventId, args){
  			if(!this.subs.eventID){
  				$log.log('Invalid eventId published: ' + eventId);
  			}
  			else{
  				for(var i = 0; i > this.subs[eventID].length; i ++){
  					this.subs[eventId][i](args);
  				}
  			}
  		}
  	})
  	//manages the state of the game
  	.service('stateManager', function(eventService, $log){
  		this.state = null;
  		this.changeState = function(newState){
  			if(this.state!==newState){
  				this.state = newState;
  				$log.log("New gamestate entered: " + this.state);
  				eventService.publish(this.state, this.state);
  			}
  		};
  	});

angular.module('gameMaster.castServices', [])
  	.value('cast', cast)
  	.factory('castMessageBus', function(cast, channels, messagetypes, eventService, $log) {

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
	      eventService.publish('playerJoined', {senderId: event.senderId, message: event.data});
	    };

	    // 'senderdisconnected' event handler
	    castReceiverManager.onSenderDisconncted = function(event) {
	      $log.log('Received Sender Disconnected event: ' + event.data);
	      if (event.reason === cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER){
	      	eventService.publish('playerQuit', {senderId: event.senderId, message: event.data});
	      }
	      if (castReceiverManager.getSenders().length === 0) {
	        close();
	      }
	    };

	    // 'systemvolumechanged' event handler
	    castReceiverManager.onSystemVolumeChanged = function(event) {
	      $log.log('Received System Volume Changed event: ' + event.data.level + ' ' + event.data.muted);
	    };

	    //initializing channel collection
	    var messageBuses = [];

	    //fills the test channel for the current sender app
	  	messageBus['test'] = 'urn:x-cast:com.pt.basic';

	  	for(var i = 0; i < messagetypes.length; i++){
	  		messageBuses[messagetypes[i]] = castReceiverManager.getCastMessageBus('urn:x-cast:com.partythings.' + messagetypes[i]);
	  		$log.log(messageBus[messagetypes[i]].getNamespace());
	  	}    


	    // initialization for the manager and log
	    castReceiverManager.start({statusText: "Application is starting"});
	    $log.log('Receiver Manager started');

	    return messageBuses;
 	})
	.service('messageSender', function(castMessageBus, $log){
		//test channel
		this.sendTest = function(event){
			castMessageBus.test.send(event.senderId, event.message);
		}

		//request gamename from player
		this.requestGameName = function(event) {
			castMessageBus.gamename.send(event.senderId, event.message);
		};

		//request playername from player
		this.requestPlayerName = function(event) {
			castMessageBus.playername.send(event.senderId, event.message);
		};

		//reqest ready from player
		this.requestReady = function(event) {
			castMessageBus.ready.send(event.senderId, event.message);
		};

		//request prompt from player
		this.requestPrompt = function(event) {
			castMessageBus.prompt.send(event.senderId, event.message);
		};

		//send standby to player
		this.sendStandby = function(event) {
			castMessageBus.standby.send(event.senderId, event.message);
		}

		//request thing from player
		this.requestThing = function(event) {
			castMessageBus.thing.send(event.senderId, event.message);
		};

		//request guess from player
		this.requestGuess = function(event) {
			castMessageBus.guess.send(event.senderId, event.message);
		};

		//send result to player
		this.sendResult = function(event) {
			castMessageBus.result.send(event.senderId, event.message);
		};

		//send end to player
		this.sendEnd = function(event) {
			castMessageBus.end.send(event.senderId, event.message);
		};

		//send quit confirmation to player
		this.sendQuit = function(event) {
			castMessageBus.quit.send(event.senderId, event.message);
		};
	})
	.service('messageReceiver', function(castMessageBus, eventService, $log){
		//test message handler
		castMessageBus.test.onMessage = function(event){
			eventService.publish("test", {senderId: event.senderId, message: event.data})
		};
		//gamename received
		castMessageBus.gamename.onMessage = function(event){
			eventService.publish("gamenameReceived", {senderId: event.senderId, message: event.data});
		};
		//playername received
		castMessageBus.playername.onMessage = function(event){
			eventService.publish("playernameReceived", {senderId: event.senderId, message: event.data});
		};
		//ready response received
		castMessageBus.ready.onMessage = function(event){
			eventService.publish("readyReceived", {senderId: event.senderId, message: event.data});
		};
		//prompt received
		castMessageBus.prompt.onMessage = function(event){
			eventService.publish("promptReceived", {senderId: event.senderId, message: event.data});
		};
		//thing received
		castMessageBus.thing.onMessage = function(event){
			eventService.publish("thingReceived", {senderId: event.senderId, message: event.data});
		};
		//guess received
		castMessageBus.guess.onMessage = function(event){
			eventService.publish("guessReceived", {senderId: event.senderId, message: event.data});
		};
		//end received
		castMessageBus.end.onMessage = function(event){
			eventService.publish("endReceived", {senderId: event.senderId, message: event.data});
		};
		//quit received
		castMessageBus.quit.onMessage = function(event){
			eventService.publish("quitReceived", {senderId: event.senderId, message: event.data});
		};
	})
	.constant('messagetypes', ['gamename','playername','ready','prompt','standby','thing','guess','result',end', 'quit']);