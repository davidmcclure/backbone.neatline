
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.View unit tests.
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline.View', function() {
  beforeEach(_t.beforeEach);

  describe('getTemplate', function() {

    it('should select, compile, and append the template', function() {

      // ------------------------------------------------------------------
      // When the view defines a `template` selector, the template should
      // be selected, compiled, and injected into `$el`.
      // ------------------------------------------------------------------

      var view = Backbone.Neatline.View.extend({
        template: '#template'
      });

      var inst = new view();
      inst.getTemplate();

      expect(inst.$el).toContain('#el4');
      expect(inst.$el).toContain('#el5');
      expect(inst.$el).toContain('#el6');

    });

  });

  describe('getUi', function() {

    it('should select elements in the `ui` hash', function() {

      // ------------------------------------------------------------------
      // If the view defines a `ui` object, each of the values in the hash
      // should be replaced with a DOM selection derived from the original
      // string value.
      // ------------------------------------------------------------------

      var view = Backbone.Neatline.View.extend({
        ui: {
          el1: '#el1',
          g1: {
            el2: '#el2',
            g2: {
              el3: '#el3'
            }
          }
        }
      });

      var inst = new view({ el: '#static' });
      inst.getUi();

      expect(inst.__ui.el1.attr('id')).       toEqual('el1');
      expect(inst.__ui.g1.el2.attr('id')).    toEqual('el2');
      expect(inst.__ui.g1.g2.el3.attr('id')). toEqual('el3');

    });

  });

});
