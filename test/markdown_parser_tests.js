'use strict';

var tap = require('tap');

var path = require('path');
var fs = require('fs-extra');
var mp = require('../core/lib/markdown_parser');
var markdown_parser = new mp();

tap.test(
  'parses pattern description block correctly when frontmatter not present',
  function(test) {
    //arrange
    var markdownFileName = path.resolve(
      './test/files/_patterns/00-test/02-baz.md'
    );
    var markdownFileContents = fs.readFileSync(markdownFileName, 'utf8');

    //act
    var returnObject = markdown_parser.parse(markdownFileContents);

    //assert
    test.equals(returnObject.markdown, '<h3>Only baz</h3>\n');
    test.end();
  }
);

tap.test(
  'parses pattern description block correctly when frontmatter present',
  function(test) {
    //arrange
    var markdownFileName = path.resolve(
      './test/files/_patterns/00-test/01-bar.md'
    );
    var markdownFileContents = fs.readFileSync(markdownFileName, 'utf8');

    //act
    var returnObject = markdown_parser.parse(markdownFileContents);

    //assert
    test.equals(
      returnObject.markdown,
      '<h2>A Simple Bit of Markup</h2>\n<p>Foo cannot get simpler than bar, amiright?</p>\n'
    );
    test.equals(returnObject.state, 'complete');
    test.end();
  }
);

tap.test('parses frontmatter only when no markdown present', function(test) {
  //arrange
  var markdownFileName = path.resolve(
    './test/files/_patterns/00-test/03-styled-atom.md'
  );
  var markdownFileContents = fs.readFileSync(markdownFileName, 'utf8');

  //act
  var returnObject = markdown_parser.parse(markdownFileContents);

  //assert
  test.equals(returnObject.markdown, '');
  test.equals(returnObject.state, 'inprogress');
  test.end();
});
