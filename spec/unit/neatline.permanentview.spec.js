
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.PermanentView unit tests.
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline.PermanentView', function() {

  beforeEach(function() {
    _t.loadFixtures();
  });

  describe('getTemplate', function() {

    it('should compile the template and inject into $el', function() {

      // ------------------------------------------------------------------
      // When the view defines a `template` selector value, on startup the
      // template should be selected, compiled, and injected into $el.
      // ------------------------------------------------------------------

      var view = Backbone.Neatline.PermanentView.extend({
        template: '#template'
      });

      // var inst = new view();
      // expect(view.$el).toContain('#el4');
      // expect(view.$el).toContain('#el5');
      // expect(view.$el).toContain('#el6');

    });

  });

});
