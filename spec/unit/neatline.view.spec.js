
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

      // Define subclass with `template`.
      var view = Backbone.Neatline.View.extend({
        template: '#template'
      });

      var inst = new view();
      inst.getTemplate();

      // $el should contain template.
      expect(inst.$el).toContain('#el4');
      expect(inst.$el).toContain('#el5');
      expect(inst.$el).toContain('#el6');

    });

  });


  describe('getUi', function() {

    it('should select elements in the `ui` hash', function() {

      // ------------------------------------------------------------------
      // If the view defines a `ui` object, `getUi` should copy the object
      // to a second, instance-specific object called `__ui` and walk the
      // keys recursively, point them to DOM selections derived from the
      // original string values.
      // ------------------------------------------------------------------

      // Define subclass with `ui`.
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

      // `__ui` should point to DOM.
      expect(inst.__ui.el1.attr('id')).       toEqual('el1');
      expect(inst.__ui.g1.el2.attr('id')).    toEqual('el2');
      expect(inst.__ui.g1.g2.el3.attr('id')). toEqual('el3');

    });

  });


  describe('show', function() {

    var container;

    beforeEach(function() {
      container = $('<div></div>"');
    });

    it('should append $el to the container', function() {

      // ------------------------------------------------------------------
      // `show` should append the view's element to the passed container.
      // ------------------------------------------------------------------

      var inst = new Backbone.Neatline.View();

      inst.show(container);
      expect(container).toContain(inst.$el);

    });

    it('should redelegate events', function() {

      // ------------------------------------------------------------------
      // When the view is displayed in a container, `delegateEvents` needs
      // to be (re-)called in order to guarantee that bindings declared in
      // the `events` hash are live after the call to `show`. These events
      // can get unbound when the view element is clobbered out of the DOM
      // without first being manually detached.
      // ------------------------------------------------------------------

      // Define subclass with `events` hash.
      var view = Backbone.Neatline.View.extend({
        template: '#template',
        events: { 'click div': 'clicked' },
        clicked: function() {
          console.log('test');
        }
      });

      // Spy on `clicked`.
      var inst = new view();
      spyOn(inst, 'clicked');
      inst.getTemplate();
      inst.show(container);

      // Overwrite without detaching.
      container.html($('<div></div>"'));
      inst.show(container);

      // Trigger event callback.
      inst.$('#el4').trigger('click');
      expect(inst.clicked).toHaveBeenCalled();

    });

  });


});
