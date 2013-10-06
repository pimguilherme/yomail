/**
 * Views
 */
// TODO Recycle event handlers
var ListView = function (options) {

    Utils.extend(this, options || {})
    this.perPage = parseInt(this.perPage)

    var self = this
    // We'll store the complete collection in a variable so we can restore it
    // after filtering
    this.completeCollection = this.collection

    this.$header = this.$(".header")
    this.$header.find('th').each(function () {

        $(this).on('click', function (ev) {
            var $el = $(this)
            self.setSortBy($el.attr('data-attr'))
        })

        $(this)
            .append("<i class=icon-chevron-down></i>")
            .append("<i class=icon-chevron-up></i>")

    })

    this.render()

}

ListView.prototype = {

    /**
     * DOM Element
     */
    $el:null,
    $:function () {
        return this.$el.find.apply(this.$el, arguments)
    },

    /**
     * Filtering
     */
    filters:null,
    setFilters:function (filters) {
        this.filters = filters

        // No filters!
        if (!this.hasFilters()) {
            this.collection = this.completeCollection
            this.render()
            return
        }

        // We'll store the complete collection in a variable so we can restore it later
        this.collection = this.completeCollection.filter(function (item) {
            return ~item.name.indexOf(filters.name)
                && ~item.email.indexOf(filters.email)
                && ~item.subject.indexOf(filters.subject)
                && (!filters.today || item.date.isToday())
        })
        this.setPage(0)
        this.render()

    },

    hasFilters:function () {
        if (!this.filters) return false
        for (var key in this.filters) {
            if (this.filters[key]) return true
        }
        return false
    },

    clearFilters:function () {
        this.setFilters(null)
    },

    getTotalFilteredItems:function () {
        return this.collection.length
    },

    /**
     * Sorting
     */
    setSortBy:function (field, order) {

        // Forcing ASC order for first ordering of field
        if (this.sortByField != field) {
            order = 1
        }

        this.sortByField = field
        this.sortByOrder = order == undefined ? -this.sortByOrder : order
        this.sort()
        this.render()
    },

    sortByField:null,
    sortByOrder:1,
    sort:function () {
        if (!this.sortByField) return

        var field = this.sortByField
            , order = this.sortByOrder

        this.collection = this.collection.sort(function (a, b) {
            return (a[field] < b[field] ? -1 : 1 ) * order
        })
    },


    /**
     * Pagination
     */
    page:0,
    perPage:null,
    setPage:function (number) {
        // Let's limit the page
        number = Math.max(0, Math.min(parseInt(number), this.getTotalPages() - 1))
        // Nothing to change!
        if (this.page == number) return
        this.page = number
        this.render()
    },

    setPerPage:function (perPage) {
        this.perPage = parseInt(perPage)
        this.render()
    },

    next:function () {
        this.setPage(this.page + 1)
    },

    prev:function () {
        this.setPage(this.page - 1)
    },

    getTotalPages:function () {
        return Math.ceil(this.collection.length / this.perPage)
    },

    getTotalItems:function () {
        return this.completeCollection.length
    },

    /**
     * Cleanup
     */

    // Clears the list
    clear:function () {
        this.$el.find('tr.email').remove()
    },

    /**
     * Rendering
     */

    // Renders current email items
    // TODO avoid multiple renders in sequence
    render:function () {

        var self = this

        /**
         * Columns header rendering
         */
        this.$header.find('th').each(function (node) {
            var $node = $(node)
            $node.removeClass('sort-up sort-down')
            if ($node.attr('data-attr') == self.sortByField) {
                $node.addClass('sort-' + (self.sortByOrder > 0 ? 'up' : 'down'))
            }
        })

        /**
         * Items rendering
         */
        var items = this.collection

        this.clear()

        // If we have a page limit, we should filter our items
        if (this.perPage) {
            items = items.slice(this.page * this.perPage, this.page * this.perPage + this.perPage)
        }


        // Rendering each item
        items.each(function (model, i) {
            // Lazzy odd/even approach
            // TODO we shouldn't mess up data
            model._trClass = i % 2 ? 'odd' : 'even'
            self.$el.append(self.getItemHTML(model))
        })

    },

    // Basic template rendering
    getItemHTML:function (item) {

        item._formattedDate =
            // Today = dd/mm/yyyy
            !item.date.isToday()
                ?
                item.date.getDate().toString().padLeft("0", 2) + "/"
                    + item.date.getMonth().toString().padLeft("0", 2) + "/"
                    + item.date.getFullYear().toString().padLeft("0", 4)
                :
                item.date.getHours().toString().padLeft("0", 2)
                    + ":" + item.date.getMinutes().toString().padLeft("0", 2)

        return $.template(
            "<tr class='email {{_trClass}}'>" +
                "<td class=email-name>{{name}}</td>" +
                "<td class=email-email>{{email}}</td>" +
                "<td class=email-subject>{{subject}}</td>" +
                "<td class=email-date>{{_formattedDate}}</td>" +
                "</tr>",
            item
        )
    }

}
