({
    // appDir: "./js",
    baseUrl: "./js",
    // dir: "./js-build",
    paths: {
        'backbone': 'lib/backbone',
        'backbone.ext': 'lib/backbone.ext',
        'backbone.paginator': 'lib/backbone.paginator',
        'backbone.subset': 'lib/backbone.subset',
        'fileuploader': 'lib/fileuploader',
        'jquery': 'lib/jquery',
        'jquery-ui': 'lib/jquery-ui',
        'jquery.event.drag': 'lib/jquery.event.drag',
        'jquery.inview': 'lib/jquery.inview',
        'slick.core': 'lib/slick.core',
        'slick.dataview': 'lib/slick.dataview',
        'slick.formatters': 'lib/slick.formatters',
        'slick.grid': 'lib/slick.grid',
        'jquery.ui.touch-punch': 'lib/jquery.ui.touch-punch',
        'jquery.unveil': 'lib/jquery.unveil',
        'underscore': 'lib/underscore'
    },
    optimizeAllPluginResources: true,
    // modules: [{
    //     // create: true,
    //     name: "app",
    //     // include: ['a']
    // }],
    shim: {
        'backbone': {
            //These script dependencies should be loaded before loading
            //backbone.js
            deps: ['lib/underscore', 'lib/jquery'],
            //Once loaded, use the global 'Backbone' as the
            //module value.
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
    },
    name: 'app',
    findNestedDependencies: true,
    out: "out.js"
});