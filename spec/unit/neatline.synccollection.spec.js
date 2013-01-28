
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
