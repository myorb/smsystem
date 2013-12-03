window.VesselListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var vessels = this.model.models;
        var len = vessels.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);
        var model_name = 'vessels';
  //      var table_head = vessels[0].attributes
//console.log(vessels[0].attributes);
        var tabel_html = '<table class="table"><thead><tr><td> id </td><td> Name </td><td> imo </td><td> dwt </td><td> bhp </td><td> MMSI </td><td> Built </td><td> Gross </td><td> Operator </td><td> Status </td><td> coment </td></tr></thead><tbody class = "vessels_list"></tbody></table>';

        $(this.el).html(tabel_html);

        for (var i = startPos; i < endPos; i++) {
            $('.vessels_list', this.el).append(new VesselListItemView({model: vessels[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page, model_name:model_name}).render().el);

        return this;
    }
});

window.VesselListItemView = Backbone.View.extend({

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