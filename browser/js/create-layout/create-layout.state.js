app.config(function($stateProvider){
  $stateProvider.state('create', {
    url: "/create",
    templateUrl: "/js/create-layout/create-layout.template.html",
    controller: "CreateLayoutCtrl",
    resolve: {
    	theUser: function (AuthService){
    		return AuthService.getLoggedInUser();

    	}
    }
  })
});