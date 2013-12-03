window.TestView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    },

     events: {
        "click .span12"   : "wtf",
        "change  input:[type=text]"   : "login",
        "change  input:[type=password]"   : "pass",
    },

    wtf: function (event) {
    	console.log(event);
    },
    login: function (event) {
    	//onsole.log(event.target);
    	console.log(this.$el.find(event.target).val());
    },
    pass: function (event) {
    	console.log($(event.currentTarget).val());
    },

});