
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.View unit tests.
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline.View', function() {

  beforeEach(function() {
    _t.loadFixtures();
  });

  describe('getUi', function() {

    it('should select elements in the `ui` hash', function() {

      // ------------------------------------------------------------------
      // When the view defines a `ui` object, on startup each of the keys
      // in the hash should be pointed to a DOM selection derived from the
      // key's original string value.
      // ------------------------------------------------------------------

      var view = Backbone.Neatline.View.extend({
        ui: {
          el1: '#el1',
          group: {
            el2: '#el2',
            subgroup: {
              el3: '#el3'
            }
          }
        }
      });

      var inst = new view({ el: '#test' });
      expect(inst.ui.el1.attr('id')).toEqual('el1');
      expect(inst.ui.group.el2.attr('id')).toEqual('el2');
      expect(inst.ui.group.subgroup.el3.attr('id')).toEqual('el3');

    });

  });

});
