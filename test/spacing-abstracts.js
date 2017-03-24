import path from 'path';
import assert from 'assert';
import Sassaby from 'sassaby';

describe('spacing/_abstracts.scss', () => {
  const file = path.resolve(__dirname, '../elegant-sass-things/spacing/_abstracts.scss');

  describe('contains', () => {
    const sassaby = new Sassaby(file);

    it('should return true when item is in list', () => {
      sassaby.func('contains').calledWithArgs(`('a' 'b' 1 '1')`, 'a').isTrue();
      sassaby.func('contains').calledWithArgs(`('a' 'b' 1 '1')`, '1').isTrue();
      sassaby.func('contains').calledWithArgs(`('a' 'b' 1 '1')`, 1).isTrue();
    });

    it('should return false when item is not in list', () => {
      sassaby.func('contains').calledWithArgs(`('a' 'b' 1 '1')`, 'c').isFalse();
      sassaby.func('contains').calledWithArgs(`('a' 'b' 1 '1')`, 2).isFalse();
    });
  });

  describe('elegant-spacers', () => {
    it('should respect spacer map passed in', () => {
      const sassaby = new Sassaby(file, {
        variables: {
          'elegant-spacing': `(
            spacers: (
              'a': 0rem,
              'b': .5rem,
              'c': 1rem,
              'd': 3rem,
              'e': 0,
              'f': .5rem,
              'g': 10rem
            )
          )`
        }
      });
      let expectedSpacerKeys = `"a","b","c","d","e","f","g"`;
      let expectedSpacerValues = `0rem,0.5rem,1rem,3rem,0,0.5rem,10rem`;
      sassaby.func('_elegant-spacer-keys').calledWithArgs('').equals(expectedSpacerKeys);
      sassaby.func('_elegant-spacer-values').calledWithArgs('').equals(expectedSpacerValues);
    });
  });

  describe('elegant-spacer-get', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'elegant-spacing': `(
          spacers: (
            'a': 0.5rem,
            'b': 1rem,
            'c': 2rem,
            'd': 3rem
          )
        )`
      }
    });

    it('should get value from spacer map by key', () => {
      sassaby.func('elegant-spacer-get').calledWithArgs('b').equals('1rem');
    });

    it('should raise error if passed invalid key', () => {
      let usageWithInvalidSpacer = () => {
        sassaby.func('elegant-spacer-get').calledWithArgs('torpedo');
      };

      assert.throws(usageWithInvalidSpacer, /torpedo is an invalid spacer/);
    });
  });

  describe('elegant-v-h', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'elegant-spacing': `(
          spacers: (
            'a': 0.5rem,
            'b': 1rem,
            'c': 2rem,
            'd': 3rem
          )
        )`
      }
    });

    it('should accept shorthand for all sides', () => {
      sassaby.includedMixin('elegant-v-h').calledWithArgs('margin', 'c').declares('margin', '2rem');
    });

    it('should accept shorthand for vertical and horizontal', () => {
      sassaby.includedMixin('elegant-v-h').calledWithArgs('margin', 'c', 'b').declares('margin', '2rem 1rem');
    });
  });

  describe('margin|padding-top|right|bottom|left|vertical|horizontal', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'elegant-spacing': `(
          spacers: (
            'a': 0.5rem,
            'b': 1rem,
            'c': 2rem,
            'd': 3rem
          )
        )`
      }
    });

    ['margin', 'padding'].forEach((rule) => {
      it(`${rule} should accept shorthand for all sides`, () => {
        sassaby.includedMixin(rule).calledWithArgs('c').declares(rule, '2rem');
      });

      it(`${rule} should accept shorthand for vertical and horizontal`, () => {
        sassaby.includedMixin(rule).calledWithArgs('c', 'b').declares(rule, '2rem 1rem');
      });

      ['top', 'right', 'bottom', 'left'].forEach((direction) => {
        it(`${rule}-${direction} should declare spacer`, () => {
          sassaby.includedMixin(`${rule}-${direction}`).calledWithArgs('c').declares(`${rule}-${direction}`, '2rem');
        });
      });

      it(`${rule}-vertical should declare spacers for top and bottom`, () => {
        sassaby.includedMixin(`${rule}-vertical`).calledWithArgs('c').declares(`${rule}-top`, '2rem');
        sassaby.includedMixin(`${rule}-vertical`).calledWithArgs('c').declares(`${rule}-bottom`, '2rem');
      });

      it(`${rule}-horizontal should declare spacers for left and right`, () => {
        sassaby.includedMixin(`${rule}-horizontal`).calledWithArgs('c').declares(`${rule}-left`, '2rem');
        sassaby.includedMixin(`${rule}-horizontal`).calledWithArgs('c').declares(`${rule}-right`, '2rem');
      });
    });
  });

});
