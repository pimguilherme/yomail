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
     * Looks weakly for an element
     */
    Array.prototype.find = function (a) {
        for (var i = 0; i < this.length; i++) {
            if (a == this[i]) {
                return true
            }
        }
        return false
    }

    /**
     * Returns an array with unique elements
     * TODO enhance
     */
    Array.prototype.unique = function () {
        var res = []
        this.each(function (item) {
            if (!res.find(item)) {
                res.push(item)
            }
        })
        return res
    }

    Array.prototype.filter = function (fn) {
        var res = []
        this.each(function (item) {
            if (fn(item)) {
                res.push(item)
            }
        })
        return res
    }


    if (!Array.prototype.sort) {
        console.log("Expected Array.sort implementation!")
    }


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

    /**
     * Function
     */
    Function.prototype.debounce = function (delay) {
        var fn = this
            , timeout = null
        var wrapper = function () {
            if (timeout) {
                window.clearTimeout(timeout)
            }
            timeout = window.setTimeout(fn, delay)
        }
        return wrapper
    }


    /**
     * Random (shared)
     */
    String.prototype.random = Array.prototype.random = function () {
        return this[Math.min(Math.round(this.length * Math.random()), this.length - 1)]
    }

})(window)
