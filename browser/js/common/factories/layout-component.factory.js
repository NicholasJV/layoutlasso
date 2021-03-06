app.factory("LayoutComponentFactory",  function($compile){

  return {
    addNavBar: function(){
      return '<nav class="navbar navbar-default">\
        <div class="container-fluid">\
          <div class="navbar-header">\
            <a class="navbar-brand" href="#">\
              <p>Navbar</p>\
            </a>\
          </div>\
        </div>\
      </nav>'
    },

    addButton: function(type) {
      return '<button ng-click="click()" class="btn btn-'+ type +'"> Click Me </button>';
    },

    addImage: function(url) {
      return ('<img src=' + url + '>')
    },

    addVideo: function (url) {
      // may not actually need this function: just have user enter embed code
      return '<iframe width="420" height="315" src="' + url + '" frameborder="0" allowfullscreen></iframe>'
    },

    addInputForm: function() {
      return '<form><div class="input-group">\
        <span class="input-group-addon" id="basic-addon1">Input:</span>\
        <input type="text" class="form-control" placeholder="Username" aria-describedby="basic-addon1">\
      </div></form>'
    },
    addList: function() {
      return '<div class="list-group" width="100%">\
        <a href="#" class="list-group-item active">List Group</a>\
        <a href="#" class="list-group-item">Item One</a>\
        <a href="#" class="list-group-item">Item Two</a>\
        <a href="#" class="list-group-item">Item Three</a>\
      </div>'
    },
    addJumbotron: function() {
      return '<div class="jumbotron">\
        <h1>Hello, world!</h1>\
        <p>Your text here. Put anything you want here. So cool.</p>\
        <p><a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a></p>\
      </div>'
    },
    addPanel: function(type) {
      return '<div class="panel panel-'+ type +'">\
              <div class="panel-heading">Panel heading</div>\
               <div class="panel-body">\
                 <p>Panel body.</p>\
               </div>\
            </div>'
    }

  }

})
