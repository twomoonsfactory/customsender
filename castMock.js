castMock = {
	testCore: {},

	receiver: {
		logger: {
			setLevelValue: function(levelValue){
				testCore.levelValue = levelValue;
			}
		}
	},
}