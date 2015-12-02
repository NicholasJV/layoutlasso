app.controller("CreateLayoutCtrl", function($scope, $compile, theUser, GridCompFactory, GridFactory, StylingFactory) {

    $scope.user = theUser;
    $scope.main_grid = GridFactory.getMainGrid();
    $scope.nestedGrids = GridFactory.getNestedGrids();

    $scope.addNewGridElement = function (grid, content){
      GridFactory.addNewGridElement($scope, grid, content);
    }

    $scope.addNestedGrid = function(id) {
       GridFactory.addNestedGrid($scope, id);
    }

    $scope.removeWidget = GridFactory.removeWidget;

    $scope.saveGrid = function (){
      GridFactory.saveGrid($scope.user);
    }

    $scope.clearGrid = GridFactory.clearGrid;

    $scope.loadGrid = function(){
        GridFactory.loadGrid($scope);
        $scope.nestedGrids = GridFactory.getNestedGrids();
    }

    //===== Components ===== //
    //add Nav Bar function
    $scope.addNavBar = function (){
      GridCompFactory.addNavBar($scope, GridFactory.main_grid, GridFactory.counter++);
    }


    // CSS Setting and Getting on elements

    // This is to keep a tally on what elements are currently being styled.
    $scope.styleGroup = {};

    // Accesses StylingFactory stylsheet object showing current classes.

    $scope.pageStyleSheet = StylingFactory.getStylesForScope;

})
