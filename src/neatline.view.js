
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
   * Call automatic startup routines:
   *  - `getUi`
   */
  constructor: function() {
    var args = Array.prototype.slice.apply(arguments);
    Backbone.View.prototype.constructor.apply(this, args);
    this.getUi();
  },


  /**
   * Select the elements defined in the `ui` hash, replacing the original
   * selector strings with the jQuery-wrapped DOM selections.
   */
  getUi: function() {

    // Walk this.ui:
    _.bind(function select(o) {
      _.each(o, _.bind(function(v,k) {

        // If string, select.
        if (typeof v == 'string') {
          o[k] = this.$(v);
        }

        // If object, recurse.
        else if (typeof v == 'object') {
          select(v);
        }

      }, this));
    }, this)(this.ui);

  }


});
