
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
   * Get the template and ui, call subclass-defined `init`.
   */
  initialize: function() {
    this.getTemplate();
    this.getUi();
    this.init();
  },


  /**
   * Initializer for application views.
   * @abstract
   */
  init: function() {
    // NO-OP
  },


  /**
   * Compile and inject the underscore template into the view element.
   */
  getTemplate: function() {
    if (!this.template) return;
    this.$el.append(_.template($(this.template).html()));
  },


  /**
   * Copy the canonical `ui` hash to a instance-specific `__ui` hash and
   * re-point the keys at DOM selections derived from the string values.
   */
  getUi: function() {

    this.__ui = $.extend(true, {}, this.ui);

    // Walk this.ui:
    _.bind(function select(o) {
      _.each(o, _.bind(function(v,k) {

        // If string, select.
        if (typeof v == 'string') {
          o[k] = this.$el.find(v);
        }

        // If object, recurse.
        else if (typeof v == 'object') {
          _.bind(select, this)(v);
        }

      }, this));
    }, this)(this.__ui);

  },


  /**
   * Append the view to a container element.
   *
   * @param {Object} container: The container.
   */
  showIn: function(container) {
    this.$el.appendTo(container);
  }


});
