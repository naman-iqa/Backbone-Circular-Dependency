define(['app/collections/collection'], function (CollectionModel) {
    console.log('View.js loaded');
    return Backbone.View.extend({
        initialize: function () {
            var col = new CollectionModel();
            console.log('View initialized');
        }
    })
})
