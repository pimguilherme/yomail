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

        // Node ?
        if (typeof selector == 'object') {
            this.nodes = [selector]
        }
        // Query Selector
        else {
            this.nodes = Array.prototype.slice.call(document.querySelectorAll(selector), 0)
            this.selector = selector
        }

    }

    DOMWrapper.prototype = {

        first:function () {
            return this.nodes[0]
        },

        each:function (fn) {
            return this.nodes.each(function (node) {
                fn.apply(node, arguments)
            })
        },

        /**
         * Events
         */

        on:function (name, fn) {
            this.each(function (node) {
                node.addEventListener(name, function () {
                    fn.apply(node, arguments)
                })
            })
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

            // If we are not given a node, we'll create one
            // TODO support more than one element
            if (typeof html != 'object') {
                html = this.createElementFromHTML(html)
            }

            this.each(function (node) {
                var container = node
                if (node.tagName.toLowerCase() == 'table') {
                    container = node.querySelector("tbody")
                }
                container.appendChild(html)
            })
        },

        createElementFromHTML:function (html) {
            var node = this._createElementFromHTML('div', html)
            if (!node || node.nodeType == 3) {
                node = this._createElementFromHTML('table', html)
                node = node.firstChild
            }
            return node
        },

        _createElementFromHTML:function (parentTag, html) {
            var div = document.createElement(parentTag)
            div.innerHTML = html
            return div.firstChild
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
                return this.first() && this.first().innerHTML
            }
            this.each(function (node) {
                node.innerHTML = code
            })
        },

        /**
         * Classes
         */
        addClass:function (name) {
            var names = Utils.parseClassNames(name)
            this.each(function (node) {
                node.className = Utils.getClassNames(node).concat(names).unique().join(' ')
            })
        },

        removeClass:function (name) {
            var names = Utils.parseClassNames(name)
            this.each(function (node) {
                node.className =
                    Utils.getClassNames(node)
                        .filter(function (name) {
                            return !~names.indexOf(name)
                        })
                        .unique()
                        .join(' ')
            })
        },

        hasClass:function (name) {
            return this.first() && ~Utils.parseClassNames(this.first().className).indexOf(name)
        },

        toggleClass:function (name, bool) {
            if (typeof bool == 'undefined'){
                bool = !this.hasClass(name)
            }
            this[bool ? 'addClass' : 'removeClass'](name)
        },

        attr:function (name, val) {
            if (typeof val == 'undefined') {
                return this.first() && this.first().getAttribute(name)
            }
            this.each(function (node) {
                $(node).setAttribute(name, val)
            })
            return this
        },

        val:function (val) {
            if (typeof val == 'undefined') {
                var node = this.first()
                // Select input, we'll return its selected option
                if (node.tagName.toLowerCase() == 'select'){
                    return node.options[node.selectedIndex].value
                }
                // Checkbox input, we'll return true/false
                else if (node.tagName.toLowerCase() == 'input' && $(node).attr('type') == 'checkbox'){
                    return !!node.checked
                }
                // Let's just try to return the default value
                return node.value
            }
            this.each(function (node){
                node.value = val
            })
        }


    }

    /**
     * Chainnable wrappers
     * -- Wraps methods to return "this" and hence be chainable
     */
    ;
    ['addClass', 'removeClass', 'toggleClass', 'append'].each(function (name) {
        var fn = DOMWrapper.prototype[name]
        DOMWrapper.prototype[name] = function () {
            fn.apply(this, arguments)
            return this
        }
    })


    global.$ = $


})(window)
