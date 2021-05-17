define(['app/models/model'], function (Model) {
    console.log('Collection.js loaded');
    return Backbone.Collection.extend({
        initialize: function() {
            var model = new Model();
            console.log('Collection initialized');
        },
    })
})
