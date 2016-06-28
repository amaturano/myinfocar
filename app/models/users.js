exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "email": "text",
		    "password": "text",
		    "nombre":"text",
		    "apellido_p":"text",
		    "apellido_m":"text",
		    "nickname":"text",
		    "licencia":"text",
		    "tipo_licencia":"text",
		    "licencia_photo":"text",
		    "telefono":"text"
		},
		adapter: {
			type: "sql",
			collection_name: "users",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here

			// For Backbone v1.1.2, uncomment the following to override the
			// fetch method to account for a breaking change in Backbone.
			/*
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				options.reset = true;
				return Backbone.Collection.prototype.fetch.call(this, options);
			}
			*/
		});

		return Collection;
	}
};