/**
 * Native extension
 */
;
(function () {

    /**
     * Array forEach polyfill
     */
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback) {
            for (var i = 0; i < this.length; i++) {
                if (callback(this[i], i) === false) {
                    break
                }
            }
        }
    }
    Array.prototype.each = Array.prototype.forEach


    /**
     * Date
     */
    Date.prototype.isToday = function () {
        var today = new Date()
        return this.getDate() == today.getDate()
            && this.getMonth() == today.getMonth()
            && this.getFullYear() == today.getFullYear()
    }


    /**
     * String
     */
    String.prototype.padLeft = function (chr, total) {
        var s = this.toString()
        while (s.length < total) {
            s = chr + s
        }
        return s
    }

})(window)
