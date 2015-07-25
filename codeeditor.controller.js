angular.module("umbraco")
    .controller("CodeEditor",
	function ($scope,assetsService) {

    assetsService.loadCss("/umbraco_client/CodeMirror/Js/Lib/codemirror.css");
    assetsService
        .load([
            "/umbraco_client/CodeMirror/Js/Lib/codemirror.js",
			"/umbraco_client/CodeArea/javascript.js",
			"/umbraco_client/CodeMirror/Js/Mode/" + $scope.model.config.language + "/" + $scope.model.config.language + ".js"
        ])
        .then(function () {
			setTimeout(function(){ initializeEditor() }, 500);
        });
		
	function initializeEditor(){
		$scope.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
			mode: $scope.model.config.language,
			lineNumbers: true,
			tabMode: "shift",
			matchBrackets: true,
			indentUnit: 4,
			indentWithTabs: true,
			enterMode: "keep",
			onCursorActivity: updateLineInfo,
			lineWrapping: false,
			viewportMargin: Infinity,
			value: $scope.model.value
		});
		
		updateLineInfo($scope.editor);
	}
		
	$scope.$on("formSubmitting", function (ev, args) {
		$scope.model.value = $scope.editor.getValue();
	});
});