window.Paginator = Backbone.View.extend({

    className: "pagination pagination-centered",

    initialize:function () {
        this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {

        var items = this.model.models;
        //var model_name = this.model_name;
        //console.log(this.options.model_name)
        var url;
        if(this.options.model_name){
            this.url = "<a href='#"+this.options.model_name+"/page/";
        }else{
            this.url = "<a href='#wines/page/"; 
        }


        var len = items.length;
        var pageCount = Math.ceil(len / 8);

        $(this.el).html('<ul />');
//console.log(this.model.models.constructor.name);
        for (var i=0; i < pageCount; i++) {
            $('ul', this.el).append("<li" + ((i + 1) === this.options.page ? " class='active'" : "") + ">"+this.url+(i+1)+"'>" + (i+1) + "</a></li>");
        }

        return this;
    }
});