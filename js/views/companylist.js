window.CompanyListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var sompany = this.model.models;
        var len = sompany.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);
        var model_name = 'sompany';
  //      var table_head = sompany[0].attributes
//console.log(sompany[0].attributes);
        var tabel_html = '<table class="table"><thead><tr><td> id </td><td> Name </td><td> country_id </td><td> vessels </td><td> email </td><td> phone </td><td> pic </td><td> coments </td></tr></thead><tbody class = "table_list"></tbody></table>';


        $(this.el).html(tabel_html);

        for (var i = startPos; i < endPos; i++) {
            $('.table_list', this.el).append(new CompanyListItemView({model: sompany[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page, model_name:model_name}).render().el);

        return this;
    }
});

window.CompanyListItemView = Backbone.View.extend({

    tagName: "tr",

    className: "",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});