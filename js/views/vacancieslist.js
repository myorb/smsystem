window.VacanciesListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var vacancies = this.model.models;
        var len = vacancies.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);
        var model_name = 'vacancies';
        var tabel_html = '<table class="table"><thead><tr><td> id </td><td> Name </td><td> imo </td><td> dwt </td><td> bhp </td><td> MMSI </td><td> Built </td><td> Gross </td><td> Operator </td><td> Status </td><td> coment </td></tr></thead><tbody class = "table_list"></tbody></table>';

        $(this.el).html(tabel_html);

        for (var i = startPos; i < endPos; i++) {
            $('.table_list', this.el).append(new SeamanListItemView({model: vacancies[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page, model_name:model_name}).render().el);

        return this;
    }
});

window.VacanciesListItemView = Backbone.View.extend({

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