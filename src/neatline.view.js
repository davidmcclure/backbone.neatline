
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
   * @param {Obeject} container: The container.
   */
  show: function(container) {
    this.$el.appendTo(container);
    this.delegateEvents();
  }


});
