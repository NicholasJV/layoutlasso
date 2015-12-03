app.factory('PageFactory', function($rootScope, $http){
    var PageFactory = {};

    PageFactory.createPage = function(pageToSave){
        return $http.post('/api/pages', pageToSave)
        .then(function(page){
            return page.data
        })
    }


    PageFactory.savePage = function(updatedPage){
        return $http.put('/api/pages/' + updatedPage._id, updatedPage)
        .then(function(page){
            return page.data
        })
    }

    PageFactory.getPage = function(id){
        return $http.get('/api/pages/' + id)
        .then(function(page){
            return page.data
        })
    }

    PageFactory.deletePage = function(id){
        return $http.delete('/api/pages/' + id)
        .then(function(page){
            return page.data
        })
    }

    return PageFactory;
});