
/* vim: set expandtab tabstop=2 shiftwidth=2 softtabstop=2 cc=76; */

/**
 * Neatline.View
 *
 * @package     backbone.neatline
 * @copyright   2012 Rector and Board of Visitors, University of Virginia
 * @license     http://www.apache.org/licenses/LICENSE-2.0.html
 */


_t = {};


/**
 * Load fixtures.
 */
_t.loadFixtures = function() {
  _t.setFixturesPath();
  appendLoadFixtures('template.html');
  appendLoadFixtures('static.html');
};


/**
 * Set the fixtures path.
 */
_t.setFixturesPath = function() {
  jasmine.getFixtures().fixturesPath = 'spec/fixtures';
};
