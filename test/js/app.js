requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        app: '../app',
        // html: '../../html',
        // templates: '../../html/templates',
        // marketing: '../../marketing',
        // jqueryi18n: 'jquery.i18n.properties-min-1.0.9',
        // momentjs: 'moment.min',
        // jscolor: 'jscolor/jscolor'
    },
    //Remember: only use shim config for non-AMD scripts,
    //scripts that do not already call define(). The shim
    //config will not work correctly if used on AMD scripts,
    //in particular, the exports and init config will not
    //be triggered, and the deps config will be confusing
    //for those cases.
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['underscore', 'jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'backbone.ext': ['backbone'],
        'backbone.subset': ['backbone'],
        'backbone.paginator': {
            deps: ['backbone'],
            exports: 'Backbone.Paginator'
        },
        'jquery.inview': ['jquery'],
        // 'jquery.unveil': ['jquery'],
        'jqueryi18n': ['jquery'],
        'jquery.ui.touch-punch': ['lib/jquery', 'lib/jquery-ui'],
        'fileuploader': { exports: 'qq' },
        'slick.grid': ['jquery', 'jquery.event.drag', 'slick.core', 'slick.formatters', 'slick.dataview'],
        'slick.core': ['jquery'],
        'slick.dataview': ['jquery'],
        'slick.formatters': ['jquery'],
        'jquery.event.drag': ['jquery'],
        'jquery.qtip': ['jquery-ui']
    },
    waitSeconds: 0
});

requirejs(['backbone', 'app/views/view'], function (Backbone, View) {
    var view = new View();
})
