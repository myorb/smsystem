var AppRouter = Backbone.Router.extend({

    routes: {
        ""                      : "test",
        "wines/page/:page"	    : "list",
        "wines/add"             : "addWine",
        "wines/:id"             : "wineDetails",
        
        "seamans"               : "seamansList",
        "seamans/page/:page"    : "seamansList",
        "seamans/:id"           : "seamansDetails",
        "seamans/add"           : "addSeamans",
        
        "vessels"               : "vesselsList",
        "vessels/page/:page"    : "vesselsList",
        "vessel/:id"           : "vesselDetails",
        "vessels/add"           : "addVessel",

        "companies"             : "companiesList",
        "companies/page/:page"  : "companiesList",

        "my"                    : "mydash",
        "about"                 : "about",
        "test"                  : "test"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    mydash: function() {
        console.log('dash bord ');
        // var vesselList = new VesselCollection();
        // vesselList.fetch({success: function(){
        //     $("#content").html(new VesselView({model: vesselList, page:p}).el);
        // }});
        this.headerView.selectMenuItem('my-menu');
    },
    
    companiesList: function(page) {
        var p = page ? parseInt(page,10):1;
        var companyList = new CompanyCollection();
        companyList.fetch({success: function(){
            $("#content").html(new CompanyListView({model: companyList, page:p}).el);
        }});
        this.headerView.selectMenuItem('companies-menu');
    },
/////////////////// vessels /////////////////////////////////////////////    
    vesselsList: function(page) {
        var p = page ? parseInt(page,10):1;
        var vesselList = new VesselCollection();
        vesselList.fetch({success: function(){
            $("#content").html(new VesselListView({model: vesselList, page:p}).el);
        }});
        this.headerView.selectMenuItem('vessels-menu');
    },

    vesselDetails: function (id) {
        var vessel = new Vessel({id: id});
        vessel.fetch({success: function(){
            $("#content").html(new VesselView({model: vessel}).el);
        }});
        this.headerView.selectMenuItem();
    },

    addVessel: function() {
        // var wine = new Wine();
        // $('#content').html(new WineView({model: wine}).el);
        // this.headerView.selectMenuItem('add-menu');
    },

/////////////////// vessels end /////////////////////////////////////////////    
/////////////////// Seamans  /////////////////////////////////////////////    
    seamansList: function(page) {
        /*var p = page ? parseInt(page,10):1;
        console.log('seamansList   '+p);
        var seamansList = new SeamanCollection();
        var vacansyList = new VacanciesCollection();
        seamansList.fetch({success: function(){
            $("#content").html(new SeamanListView({model: seamansList, page:p}).el);
        }});
        vacansyList.fetch({success:function(){
            $("#content").append(new VacanciesListView({model: vacansyList, page:p}).el);
        }});*/
        var seamansList = new SeamanPageable();
        var seamanListView = new SeamanListView({model:seamansList});
        var filter = new Backgrid.Extension.ClientSideFilter({
          collection: seamansList.fullCollection,
          placeholder: "Entr Seaman Name",
          fields: ['name']
        });
        filter.$el.css({'float': 'none','margin': '6px 10px 1px'});
        // console.log(filter.$el.find('input').text('aaaaa'));
        //filter.$el.find('input').text('aaaaa')
        $('.search-form-top').html(filter.render().$el);

        seamansList.fetch({success:function(){
            $('#content').html(seamanListView.$el);
        }, reset: true});

        this.headerView.selectMenuItem('seamans-menu');
    },

    seamansDetails: function (id) {
        // var vessel = new Vessel({id: id});
        // vessel.fetch({success: function(){
        //     $("#content").html(new VesselView({model: vessel}).el);
        // }});
        this.headerView.selectMenuItem();
    },

    addSeamans: function() {
        // var wine = new Wine();
        // $('#content').html(new WineView({model: wine}).el);
        // this.headerView.selectMenuItem('add-menu');
    },

//////////////////////////////////////////////////////////////////////////////////////////

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },

    test: function () {

        var pageableTerritories = new PageableTerritories();
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
          cell: "string" 
        }];
        var pageableGrid = new Backgrid.Grid({
          columns: columns,
          collection: pageableTerritories
        });
        // Render the grid
        var $example2 = $("#home-bord-left");
        $example2.html(pageableGrid.render().$el)
        // Initialize the paginator
        var paginator = new Backgrid.Extension.Paginator({
          collection: pageableTerritories
        });
        // Render the paginator
        $example2.append(paginator.render().$el);
        // mode pageable collection's cache.
       
        pageableTerritories.fetch({reset: true});
    }

});

utils.loadTemplate(['CompanyListItemView','VacanciesListItemView','HeaderView', 'WineView', 'SeamanListItemView', 'VesselView', 'WineListItemView','VesselListItemView' , 'AboutView', 'TestView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});