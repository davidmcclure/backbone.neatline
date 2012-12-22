
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.PermanentView
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

Neatline.PermanentView = Neatline.View.extend({


  /**
   * Populate template on startup.
   */
  constructor: function() {
    this.getTemplate();
    var args = Array.prototype.slice.apply(arguments);
    Neatline.View.prototype.constructor.apply(this, args);
  },


  /**
   * Compile the template and inject it into $el.
   */
  getTemplate: function() {
    if (this.template) {
      this.$el.html(_.template($(this.template).html()));
    }
  }

});
