
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.Collection unit tests.
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */

describe('Neatline.Collection', function() {

  var model, collection, coll;

  beforeEach(function() {

    _t.beforeEach();

    // Mock model.
    model = Backbone.Model.extend({
      url: 'api/1'
    });

    // Mock collection.
    collection = Backbone.Neatline.Collection.extend({
      model: model,
      url: 'api'
    });

    // Test instance.
    coll = new collection();

  });

  describe('getOrFetch', function() {

    it('should return a model when one is present', function() {

      // ------------------------------------------------------------------
      // When `getOrFetch` is passed an id for which there is already a
      // model in the collection, the model should be immediately passed
      // to the provided callback without any interaction with the server.
      // ------------------------------------------------------------------

      // Add model to collection
      var model = coll.create({ id: 1, key: 'val' });

      // Fetch success callback.
      var callback = function(model) {
        expect(model.get('id')).toEqual(1);
        expect(model.get('key')).toEqual('val');
      };

      // Get existing model.
      var c1 = _t.server.requests.length;
      coll.getOrFetch(1, callback);
      var c2 = _t.server.requests.length;

      // No new request.
      expect(c2).toEqual(c1);

    });

    it('should fetch a new model when one is not present', function() {

      // ------------------------------------------------------------------
      // When `getOrFetch` is called with the id for which no model exists
      // in the collection (for example, when an editor form is opened for
      // a record that is not currently visible on the map), a new model
      // should be created from the supplied id, fetched from the server,
      // and then passed to the supplied callback when it has data.
      // ------------------------------------------------------------------

      var done = false;

      // Fetch success callback.
      var callback = function(model) {
        expect(model.get('key')).toEqual('val');
        done = true;
      };

      // Get absent model.
      coll.getOrFetch(1, callback);

      // Capture outoing GET request.
      var request = _t.getLastRequest();
      _t.respondLast200(_t.json.record);
      waitsFor(function() { return done; });

      // Check method and route.
      expect(request.method).toEqual('GET');
      expect(request.url).toEqual('api/1');

    });

  });

});
