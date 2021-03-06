'use strict';

const tap = require('tap');

const addPattern = require('../core/lib/addPattern');
var Pattern = require('../core/lib/object_factory').Pattern;
const util = require('./util/test_utils.js');

const patterns_dir = './test/files/_patterns';

tap.test(
  'addPattern - adds pattern extended template to patternlab partial object',
  function(test) {
    //arrange
    const patternlab = util.fakePatternLab(patterns_dir);

    var pattern = new Pattern('00-test/01-bar.mustache');
    pattern.extendedTemplate = 'barExtended';
    pattern.template = 'bar';

    //act
    addPattern(pattern, patternlab);

    //assert
    test.equals(patternlab.patterns.length, 1);
    test.equals(patternlab.partials['test-bar'] !== undefined, true);
    test.equals(patternlab.partials['test-bar'], 'barExtended');
    test.end();
  }
);

tap.test(
  'addPattern - adds pattern template to patternlab partial object if extendedtemplate does not exist yet',
  function(test) {
    //arrange
    const patternlab = util.fakePatternLab(patterns_dir);

    var pattern = new Pattern('00-test/01-bar.mustache');
    pattern.extendedTemplate = undefined;
    pattern.template = 'bar';

    //act
    addPattern(pattern, patternlab);

    //assert
    test.equals(patternlab.patterns.length, 1);
    test.equals(patternlab.partials['test-bar'] !== undefined, true);
    test.equals(patternlab.partials['test-bar'], 'bar');
    test.end();
  }
);
