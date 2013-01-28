
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
   * Update the data for a model with the passed id.
   *
   * @param {Object} data: The new data.
   */
  updateModel: function(data) {
    var model = this.get(data.id);
    if (model) model.set(data, { silent: true });
  }


});
