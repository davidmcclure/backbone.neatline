
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
   * Select and compile the template.
   */
  constructor: function() {
    var args = Array.prototype.slice.apply(arguments);
    Neatline.View.prototype.constructor.apply(this, args);
    this.getTemplate();
  },


  /**
   * Select, compile, and inject the underscore template into $el.
   */
  getTemplate: function() {
    if (!this.template) return;
    this.$el.append(_.template($(this.template).html()));
    this.getUi();
  }


});
