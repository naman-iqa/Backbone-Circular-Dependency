/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

; (function ($) {

    var events = "scroll.unveil resize.unveil lookup.unveil";

    $.fn.unveil = function (container, threshold, callback) {

        var $w = $(container),
            relative = true,
            th = threshold || 120,
            retina = window.devicePixelRatio > 1,
            attrib = retina ? "data-src-retina" : "data-src",
            images = this,
            loaded;

        if ($w.length === 0) {
            $w = $(window);
            relative = false;
        }

        this.off("unveil").one("unveil", function () {
            var source = this.getAttribute(attrib) || this.getAttribute("data-src");
            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
            }
        });

        var timeout = null;
        function unveil() {
            var inview = images.filter(function () {
                var $e = $(this);
                if ($e.is(":hidden"))
                    return;
                var wt = relative ? $w.offset().top : $w.scrollTop(),
                    wb = $w.height(),
                    et = $e.offset().top - wt,
                    eb = et + $e.height();

                return eb >= -th && et <= wb + th;
            });

            loaded = inview.trigger("unveil");
            images = images.not(loaded);
        }

        $w.off(events).on(events, function () {
            if (images.length == 0)
                return;
            clearTimeout(timeout);
            timeout = setTimeout(unveil, 250);
        });

        if (!relative || $w.is(":visible")) {
            unveil();
        }

        return this;

    };

})(window.jQuery || window.Zepto);