app.controller('ProjectModalCtrl', function($scope, UserFactory, ProjectFactory, ModalFactory, $uibModalInstance, AuthService) {

     $scope.projects = null;
     $scope.hasProjects = false;

     AuthService.getLoggedInUser()
     .then (function (user){
        console.log("user", user)
        $scope.user = user;
        if (user)
            return UserFactory.getUser(user._id) // to get user with populated projects
        else
            return null
     })
     .then (function (updatedUser){
        console.log("updated user", updatedUser)
        $scope.user = updatedUser;
        if ($scope.user) {
            $scope.projects = updatedUser.projects;
            $scope.hasProjects = $scope.projects.length;
        }
     })
     

    $scope.createProj = ModalFactory.getCreateProjBool(); // flag for determining if this is a 'new' or 'load' request. If undefined, then we're in the 'save' flow
    $scope.inSave = false; // flag for determining if this was called by hitting the save button. 

    if ($scope.createProj === undefined) {
        $scope.inSave = true; // Modal will show both load and create options as we're in the 'save' flow
    }

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel')
    }

    $scope.createProject = function(project) {

        ProjectFactory.createProject(project.name, $scope.user)
            .then (function (theUpdates){
                $scope.project = theUpdates.project;
                $scope.user = theUpdates.user;
                $scope.inSave = false;
                $uibModalInstance.close({
                    project: $scope.project,
                    user: $scope.user
                })
            })

    }

    $scope.loadProject = function(project) {

        ProjectFactory.getProject(project._id)
            .then(function(theProject) {
                $scope.project = theProject;
                $scope.inSave = false;
                $uibModalInstance.close({
                    project: $scope.project,
                    user: $scope.user
                })
            })

    }

})