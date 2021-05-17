Backbone.View.prototype.close = function () {
    if (this.clear) { 
        this.clear();
    }
    this.remove();
    this.unbind();
    if (this.model && this.model.off) {
        this.model.off(null, null, this);
    }
    if (this.collection && this.collection.off) {
        this.collection.off(null, null, this);
    }
};
//baseView
Backbone.CollectionView = Backbone.View.extend({
    itemView: null, //will be provided by the subclass
    _views: [], //inner controls
    baseSelector: "", //for standardizing event handlers and item selections
    batchSelectMode: false,
    batchDeleteMode: false,
    categories: [],

    getViewAt: function (idx) {
        try {
            return this._views[idx];
        } catch (ex) {
            return null;
        }
    },
    setDeleteMode: function (bFlag) {
        this.batchDeleteMode = bFlag;
    },
    setSelectMode: function (bFlag) {
        this.batchSelectMode = bFlag;
    },
    clear: function () { //call this to "suspend" the view, call close() to dispose off completely
        $.each(this._views, function (idx, view) {
            view.close();
        });
        this._views = [];
    },
    baseinitialize: function () {
        //this.collection.bind('sort', this.render, this);
        this.collection.bind('reset', this.render, this);
        this.collection.bind('remove', this.render, this);
        this.collection.bind('add', this.render, this);
    },
    initialize: function () { //stub
        this.baseinitialize();
    },
    baserender: function (mode, headerEl) {
        var self = this;
        //clear internal list
        self.clear();
        var frag = document.createDocumentFragment();
        if (headerEl) {
            frag.appendChild(headerEl);
        }
        if (!mode) {
            mode = 0;
        }
        if (self.itemView != null) {
            this.collection.each(function (model) {
                var view = new self.itemView({ model: model, mode: mode });
                self._views.push(view);
                frag.appendChild(view.render().el);
            });
        }
        this.$el.html(frag);
        return this;
    },
    render: function () { //stub
        return this.baserender();
    }
});

Backbone.InfiniteScrollView = Backbone.CollectionView.extend({

    pageSize: 100,
    currentIndex: 0,
    itemsContainer: null,
    mode: 0,

    baseinitialize: function () {
        this.collection.bind('sort', this.render, this);
        this.collection.bind('reset', this.render, this);
        this.collection.bind('remove', this.render, this);
        this.collection.bind('add', this.render, this);
        this.listenTo(app.Dispatcher, "scroll:bottom", this.loadMore);
    },

    baserender: function (headerEl) {
        //clear internal list
        this.clear();
        //reset currentIndex
        this.currentIndex = 0;
        var frag = document.createDocumentFragment();
        if (headerEl) {
            frag.appendChild(headerEl);
        }
        this.pagerender(frag);
        this.$el.html(frag);
        return this;
    },

    // default implementation that can be overriden
    pagerender: function (frag) {
        return this.basepagerender(frag);
    },

    basepagerender: function (frag) {
        if (!frag) {
            frag = document.createDocumentFragment();
        }
        if (this.itemView != null) {
            var end = this.currentIndex + this.pageSize;
            if (end > this.collection.length) {
                end = this.collection.length;
            }
            for (var i = this.currentIndex; i < end; i++) {
                var model = this.collection.at(i);
                var view = new this.itemView({ model: model });
                //pass few params to child view
                view.mode = this.mode;
                view.salt = this.salt;
                this._views.push(view);
                if (frag.appendChild)
                    frag.appendChild(view.render().el);
                else
                    frag.append(view.render().el);
                this.currentIndex = i;
            }
        }
        return frag;
    },

    loadMore: function () {
        if (!this.$el.is(":visible") || this.currentIndex == this.collection.length - 1) {
            return;
        }
        Util.debug("Load more called");
        var frag = this.pagerender();
        var $container = this.itemsContainer || this.$el;
        $container.append(frag);
        //unveil more
        this.$el.find("img").unveil();
        Util.scrollTop(this.$el);
    }
});