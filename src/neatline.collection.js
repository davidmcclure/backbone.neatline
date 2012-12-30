
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
