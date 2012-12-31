
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Backbone.Neatline ~ Backbone.js extensions written for Neatline.
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Backbone.Neatline = (function(Backbone, _, $) {
  var Neatline = {};


/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.Collection
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.Collection = Backbone.Collection.extend({


  /**
   * Fetch a subset of the collection from the server.
   *
   * @param {Object} params: Query parameters.
   * @param {Function} cb: Called when `fetch` completes.
   */
  update: function(params, cb) {
    params = params || {};
    this.fetch({ data: $.param(params), success: cb });
  },


  /**
   * Get a model by id.
   *
   * - If the model is already present in the collection, pass it to the
   *   callback immediately.
   *
   * - If the model is absent, create a new model on the fly, fetch data
   *   from the server, and pass the populated model to the callback.
   *
   * @param {Number} id: The model id.
   * @param {Function} cb: Callback, called with the model.
   */
  getOrFetch: function(id, cb) {

    // Get existing model.
    var model = this.get(id);
    if (model) cb(model);

    else {

      // Create new model, populate.
      model = new this.model({ id: id });
      model.fetch({ success: function() {
        cb(model);
      }});

    }

  }


});


/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.SyncCollection
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.SyncCollection = Neatline.Collection.extend({


  /**
   * When any instance of the collection's model changes, check to see if
   * a model with the same id is in the collection and, if so, update it.
   */
  constructor: function() {

    var args = Array.prototype.slice.apply(arguments);
    Backbone.Collection.prototype.constructor.apply(this, args);

    // Listen for model change.
    this.model.prototype.bind('change', _.bind(function(model) {
      this.updateModel(model.toJSON());
    }, this));

  },


  /**
   * Update the data for a model with the passed id.
   *
   * @param {Object} data: The new data.
   */
  updateModel: function(data) {
    var model = this.get(data.id);
    if (model) model.set(data, { silent: true });
  }


});


/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.View
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.View = Backbone.View.extend({


  /**
   * Select, compile, and inject the underscore template into $el.
   */
  getTemplate: function() {
    if (!this.template) return;
    this.$el.append(_.template($(this.template).html()));
  },


  /**
   * Copy the canonical `ui` hash to a instance-endemic `__ui` hash and
   * replace the values with DOM selections derived from the strings.
   */
  getUi: function() {

    this.__ui = _.clone(this.ui);

    // Walk this.ui:
    _.bind(function select(o) {
      _.each(o, _.bind(function(v,k) {

        // If string, select.
        if (typeof v == 'string') {
          o[k] = this.$(v);
        }

        // If object, recurse.
        else if (typeof v == 'object') {
          _.bind(select, this)(v);
        }

      }, this));
    }, this)(this.__ui);

  }


});


  return Neatline;
})(Backbone, _, $ || window.jQuery || window.Zepto || window.ender);