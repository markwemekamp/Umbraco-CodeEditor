angular.module("umbraco")
	.controller("CodeEditorController",
	function ($scope,assetsService) {
	
	assetsService
		.load([
			"/umbraco_client/CodeMirror/Js/Mode/" + $scope.model.config.language + "/" + $scope.model.config.language + ".js"
		]).then(function() {

		    $scope.language = $scope.model.config.language;
	});
});