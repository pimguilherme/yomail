/**
 * General Utilities
 */
;
(function (global) {

    var Utils = {

        // Generic object extension
        extend:function (a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key]
                }
            }
            return a
        },

        // Plain object cloning
        clone:function (a) {
            return Utils.extend({}, a)
        },

        /**
         * Nodes
         */
        getClassNames:function (node) {
            return this.parseClassNames(node.className || "")
        },

        parseClassNames: function (cls){
            return cls.split(/\s+/g)
        }


    }

    global.Utils = Utils

})(window)

