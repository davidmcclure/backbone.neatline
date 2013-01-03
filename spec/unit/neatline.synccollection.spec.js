
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.SyncCollection unit tests.
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline.SyncCollection', function() {


  var model, collection, inst;


  beforeEach(function() {

    _t.beforeEach();

    // Mock model.
    model = Backbone.Model.extend({
      url: 'api/1'
    });

    // Mock collection.
    collection = Backbone.Neatline.SyncCollection.extend({
      model: model,
      url: 'api'
    });

  });


  describe('initialize', function() {

    it('should propagate model changes to all collections', function() {

      // ------------------------------------------------------------------
      // When a model instance is changed by way of a call to `set`, all
      // instances of Neatline.SyncCollection that contain models of that
      // type should check to see if a model with the id of the originally
      // changed model exists in the collection, and, if so, update the
      // local copy.
      // ------------------------------------------------------------------

      // Create two collections.
      var coll1 = new collection();
      var coll2 = new collection();

      // Populate with the same model.
      var model1 = coll1.create({ id: 1 });
      var model2 = coll2.create({ id: 1 });

      // Change model1.
      model1.set({ newAttr: 'val' });

      // Check for change on model2.
      expect(model2.get('newAttr')).toEqual('val');

    });

  });


  describe('updateModel', function() {

    it('should update a local model when one is present', function() {

      // ------------------------------------------------------------------
      // When a collection contains a model with the same `id` as the one
      // in the object passed to `updateModel`, the local model should be
      // updated with the passed object.
      // ------------------------------------------------------------------

      // Create collection.
      coll = new collection();
      coll.create({ id: 1 });

      // Update.
      coll.updateModel({ id: 1, key: 'val' });
      expect(coll.get(1).get('key')).toEqual('val');

    });

  });


});
