/**
 * jQuery-like DOM wrapper
 */
;
(function (global) {

    var $ = function (arg, context) {

        // On load
        if (typeof arg == 'function') {
            return window.addEventListener('load', arg)
        }

        // DOM selector
        return new DOMWrapper(arg, context)

    }

    $.template = function (code, data) {
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                // TODO escape keys
                code = code.replace(new RegExp("\{\{" + key + "\}\}", "g"), data[key])
            }
        }
        return code
    }

    /**
     * Wraps DOM for easy manipulation
     */
    var DOMWrapper = function (selector, context) {
        context = context || document
        this.nodes = Array.prototype.slice.call(document.querySelectorAll(selector), 0)
        this.selector = selector
    }

    DOMWrapper.prototype = {

        first:function () {
            return this.nodes[0]
        },

        each:function (fn) {
            return this.nodes.each(fn)
        },

        /**
         * Traversing
         */
        find:function (selector) {
            return this.first() && $(selector, this.first())
        },

        /**
         * DOM Manipulation
         */

        append:function (html) {
            this.each(function (node) {
                node.innerHTML += html
            })
        },

        remove:function () {
            this.each(function (node) {
                node.parentNode && node.parentNode.removeChild(node)
            })
        },

        empty:function () {
            this.html("")
        },


        /**
         * Attributes
         */

        html:function (code) {
            if (typeof code == 'undefined') {
                return this.nodes.length && this.nodes[0].innerHTML
            }
            this.each(function (node) {
                node.innerHTML = code
            })
        }

    }


    global.$ = $


})(window)
