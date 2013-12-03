window.SeamanListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },
//{"id":"1","name":"egor","suname":"petrov","secondname":"vitalievich","birthday":"2013-11-06",
//"last_vessel":"1","ready":"2013-11-30","salary":"300","visa":"2",
//"english":"1","phone":"2147483647","email":"dawfeafa@gmail.com","company":"tehass","coments":"????????????? "}    
    render: function () {
        var seamans = this.model;
        var columns = [{
          name: "id",
          label: "ID",
          editable: false,
          cell: Backgrid.IntegerCell.extend({
            orderSeparator: ''
          })
        }, {
          name: "name",
          label: "Name",
          cell: "uri" 
        },{
          name: "birthday",
          label: "birthday",
          cell: "date" 
        },{
          name: "ready",
          label: "ready",
          cell: "date" 
        },{
          name: "last_vessel",
          label: "last_vessel",
          cell: "string" 
        },{
          name: "english",
          label: "english",
          cell: "integer" 
        },{
          name: "company",
          label: "company",
          cell: "string" 
        },{
          name: "phone",
          label: "phone",
          cell: "string" 
        },{
          name: "email",
          label: "email",
          cell: "email" 
        },{
          name: "salary",
          label: "salary",
          cell: "integer" 
        },{
          name: "coments",
          label: "coments",
          cell: "text" 
        }];
        var pageableGrid = new Backgrid.Grid({
          columns: columns,
          collection: seamans
        });
        // Render the grid
        var $example2 = $(this.el);
        $example2.html(pageableGrid.render().$el)
        // Initialize the paginator
        var paginator = new Backgrid.Extension.Paginator({
          collection: seamans
        });
        // Render the paginator
        $example2.append(paginator.render().$el);
        // mode pageable collection's cache.
    
        return this;
    }
});

window.SeamanListItemView = Backbone.View.extend({

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