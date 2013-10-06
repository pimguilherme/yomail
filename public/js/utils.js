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

        parseClassNames:function (cls) {
            return cls.split(/\s+/g)
        },

        /**
         * Searching
         */

        // Performs a basic string search
        searchText:function (text, find) {
            text = this.normalizeAccents(text || "").toLowerCase()
            find = this.normalizeAccents(find || "").toLowerCase()
            return ~text.indexOf(find)
        },

        accentMappingRegExps:{
            'a':/[a\u00e0-\u00e5]/ig,
            'e':/[e\u00e8-\u00eb]/ig,
            'i':/[i\u00ec-\u00ef]/ig,
            'o':/[o\u00f2-\u00f6]/ig,
            'u':/[u\u00f9-\u00fd]/ig,
            'c':/[cç]/ig
        },

        // We'll remove accents
        // TODO remove accents and keep casing
        normalizeAccents:function (str) {
            for (var chr in this.accentMappingRegExps) {
                str = str.replace(this.accentMappingRegExps[chr], chr)
            }
            return str
        }


    }

    global.Utils = Utils

})(window)

