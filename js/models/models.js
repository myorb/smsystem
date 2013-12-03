////////////////////////////////////////////vessels /////////////////////////////
window.Vessel = Backbone.Model.extend({

    urlRoot: "api/vessels"

});

window.VesselCollection = Backbone.Collection.extend({

    model: Vessel,

    url: "api/vessels"

});
window.VesselPageable = Backbone.PageableCollection.extend({
  model: Vessel,
  url: "api/vessels",
  state: {
    pageSize: 15
  },
  mode: "client" // page entirely on the client side
});
///////////////////////////////////////////// seamans //////////////////////////
window.Seaman = Backbone.Model.extend({
    urlRoot: "api/seamans"
});

window.SeamanCollection = Backbone.Collection.extend({
    model: Seaman,
    url: "api/seamans"
});

window.SeamanPageable = Backbone.PageableCollection.extend({
  model: Seaman,
  url: "api/seamans",
  state: {
    pageSize: 15
  },
  mode: "client" // page entirely on the client side
});

/////////////////////////////////////////////////Vacancies///////////////////////////////////////////
window.Vacancies = Backbone.Model.extend({

    urlRoot: "api/vacancies"

});

window.VacanciesCollection = Backbone.Collection.extend({

    model: Vacancies,

    url: "api/vacancies"

});
window.VacanciesPageable = Backbone.PageableCollection.extend({
  model: Vacancies,
  url: "api/vacancies",
  state: {
    pageSize: 15
  },
  mode: "client" // page entirely on the client side
});
/////////////////////////////////////////////////Companies///////////////////////////////////////////

window.Company = Backbone.Model.extend({

    urlRoot: "api/companies"

});

window.CompanyCollection = Backbone.Collection.extend({

    model: Company,

    url: "api/companies"

});
window.CompanyPageable = Backbone.PageableCollection.extend({
  model: Company,
  url: "api/companies",
  state: {
    pageSize: 15
  },
  mode: "client" // page entirely on the client side
});
/////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
////////////////////////////////// test ///////////////////////////
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
window.Territory = Backbone.Model.extend({});

window.TerritoryCollection = Backbone.Collection.extend({

    model: Territory,

    url: "api/companies"

});

window.PageableTerritories = Backbone.PageableCollection.extend({
  model: Territory,
  url: "api/companies",
  state: {
    pageSize: 15
  },
  mode: "client" // page entirely on the client side
});



window.Wine = Backbone.Model.extend({

    urlRoot: "api/wines",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.grapes = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a grape variety"};
        };

        this.validators.country = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a country"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        id: null,
        name: "",
        grapes: "",
        country: "USA",
        region: "California",
        year: "",
        description: "",
        picture: null
    }
});

window.WineCollection = Backbone.Collection.extend({

    model: Wine,

    url: "api/wines"

});
