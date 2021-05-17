define(['backbone', /*'backbone.ext', 'backbone.paginator', 'backbone.subset', */'fileuploader',
    'jquery.event.drag', 'jquery.inview', 'slick.core', 'slick.dataview', 'slick.formatters' ], function (Backbone)  {
        console.log('Model.js loaded');
        return Backbone.Model.extend({
            initialize: function () {
                // var view = new View();
                console.log('model initialized');
            },
        })
    })