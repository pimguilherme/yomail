/**
 * Views
 */
var ListView = function (options) {
    Utils.extend(this, options || {})
    this.render()
}

ListView.prototype = {

    $el:null,

    /**
     * Pagination
     */
    page:0,
    perPage:null,
    setPage:function (number) {
        this.page = number
        this.render()
    },

    /**
     * Collection
     */
    sort:function () {

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
    render:function () {

        var self = this
            , items = this.collection

        this.clear()

        // If we have a page limit, we should filter our items
        if (this.perPage) {
            items = items.slice(this.page * this.perPage, this.perPage)
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
