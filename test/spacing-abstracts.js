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

  describe('est-spacers', () => {
    it('should respect default spacer map', () => {
      const sassaby = new Sassaby(file);

      sassaby.func('est-spacing').calledWithArgs('3').equals('3rem');
    });
  });

  describe('est-spacing', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'est-spacing': `(
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
      sassaby.func('est-spacing').calledWithArgs('b').equals('1rem');
    });

    it('should raise error if passed invalid key', () => {
      let usageWithInvalidSpacer = () => {
        sassaby.func('est-spacing').calledWithArgs('torpedo');
      };

      assert.throws(usageWithInvalidSpacer, /torpedo is an invalid spacer/);
    });
  });

});
