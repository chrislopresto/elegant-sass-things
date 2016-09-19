import path from 'path';
import assert from 'assert';
import Sassaby from 'sassaby';

describe('spacing/_abstracts.scss', () => {
  const file = path.resolve(__dirname, '../elegant-sass-things/spacing/_abstracts.scss');

  describe('contains', () => {
    const sassaby = new Sassaby(file);

    it('should return true when item is in list', () => {
      sassaby.func('contains').calledWithArgs('(0 (1:2) 1 2 3 4 5 6)', '1').isTrue();
      sassaby.func('contains').calledWithArgs('(0 (1:2) 1 2 3 4 5 6)', '(1:2)').isTrue();
    });

    it('should return false when item is not in list', () => {
      sassaby.func('contains').calledWithArgs('(0 (1:2) 1 2 3 4 5 6)', '10').isFalse();
      sassaby.func('contains').calledWithArgs('(0 (1:2) 1 2 3 4 5 6)', '(1:3)').isFalse();
    });
  });

  describe('elegant-valid-multiple', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'elegant-spacing': `(
          multiples: ((1:2) 1 2 3)
        )`
      }
    });

    it('should return true for number in config', () => {
      sassaby.func('elegant-valid-multiple').calledWithArgs(1).isTrue();
    });

    it('should return true for fraction map in config', () => {
      sassaby.func('elegant-valid-multiple').calledWithArgs('(1:2)').isTrue();
    });

    it('should return true for fraction value in config', () => {
      sassaby.func('elegant-valid-multiple').calledWithArgs('.5').isTrue();
    });

    it('should return false for number not in config', () => {
      sassaby.func('elegant-valid-multiple').calledWithArgs(4).isFalse();
    });

    it('should return false for fraction map not in config', () => {
      sassaby.func('elegant-valid-multiple').calledWithArgs('(1:4)').isFalse();
    });

    it('should return false for fraction value not in config', () => {
      sassaby.func('elegant-valid-multiple').calledWithArgs('.25').isFalse();
    });
  });

  describe('elegant-multiple-is-fraction', () => {
    const sassaby = new Sassaby(file);

    it('should return true when item is a map)', () => {
      sassaby.func('elegant-multiple-is-fraction').calledWithArgs('(1:2)').isTrue();
    });

    it('should return false when item is not a map', () => {
      sassaby.func('elegant-multiple-is-fraction').calledWithArgs('1').isFalse();
    });
  });

  describe('elegant-fraction-modifier', () => {
    const sassaby = new Sassaby(file);

    it('should return modifier with escaped slash)', () => {
      sassaby.func('elegant-fraction-modifier').calledWithArgs('(1:2)').equals('"1\\\\/2"');
    });
  });

  describe('elegant-fraction-value', () => {
    const sassaby = new Sassaby(file);

    it('should return numeric value)', () => {
      sassaby.func('elegant-fraction-value').calledWithArgs('(1:2)').equals('.5');
    });
  });

  describe('elegant-multiple-modifier', () => {
    const sassaby = new Sassaby(file);

    it('should return modifier for a number)', () => {
      sassaby.func('elegant-multiple-modifier').calledWithArgs('1').equals('1');
    });

    it('should return modifier for a fraction map)', () => {
      sassaby.func('elegant-multiple-modifier').calledWithArgs('(1:2)').equals('"1\\\\/2"');
    });
  });

  describe('elegant-multiple-value', () => {
    const sassaby = new Sassaby(file);

    it('should return value for a number)', () => {
      sassaby.func('elegant-multiple-value').calledWithArgs('1').equals('1');
    });

    it('should return value for a fraction map)', () => {
      sassaby.func('elegant-multiple-value').calledWithArgs('(1:2)').equals('.5');
    });
  });

  describe('elegant-multiple', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'elegant-spacing': `(
          unit: 10px,
          multiples: ((1:2) 1 2 3)
        )`
      }
    });

    it('should return value for a number', () => {
      sassaby.func('elegant-multiple').calledWithArgs('2').equals('20px');
    });

    it('should return value for a fraction map', () => {
      sassaby.func('elegant-multiple').calledWithArgs('.5').equals('5px');
    });
  });

  describe('elegant-v-h', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'elegant-spacing': `(
          unit: 1rem,
          multiples: (1 2)
        )`
      }
    });

    it('should accept shorthand for all sides', () => {
      sassaby.includedMixin('elegant-v-h').calledWithArgs('margin', '2').declares('margin', '2rem');
    });

    it('should accept shorthand for vertical and horizontal', () => {
      sassaby.includedMixin('elegant-v-h').calledWithArgs('margin', '2', '1').declares('margin', '2rem 1rem');
    });
  });

  describe('margin|padding-top|right|bottom|left|vertical|horizontal', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'elegant-spacing': `(
          unit: 1rem,
          multiples: (0 1 2)
        )`
      }
    });

    ['margin', 'padding'].forEach((rule) => {
      it(`${rule} should apply default shorthand for all sides`, () => {
        sassaby.includedMixin(rule).calledWithArgs().declares(rule, '1rem');
      });

      it(`${rule} should accept shorthand for all sides`, () => {
        sassaby.includedMixin(rule).calledWithArgs('2').declares(rule, '2rem');
      });

      it(`${rule} should accept shorthand for vertical and horizontal`, () => {
        sassaby.includedMixin(rule).calledWithArgs('2', '1').declares(rule, '2rem 1rem');
      });

      ['top', 'right', 'bottom', 'left'].forEach((direction) => {
        it(`${rule}-${direction} should declare multiple`, () => {
          sassaby.includedMixin(`${rule}-${direction}`).calledWithArgs('2').declares(`${rule}-${direction}`, '2rem');
        });
      });

      it(`${rule}-vertical should declare multiples for top and bottom`, () => {
        sassaby.includedMixin(`${rule}-vertical`).calledWithArgs('2').declares(`${rule}-top`, '2rem');
        sassaby.includedMixin(`${rule}-vertical`).calledWithArgs('2').declares(`${rule}-bottom`, '2rem');
      });

      it(`${rule}-horizontal should declare multiples for left and right`, () => {
        sassaby.includedMixin(`${rule}-horizontal`).calledWithArgs('2').declares(`${rule}-left`, '2rem');
        sassaby.includedMixin(`${rule}-horizontal`).calledWithArgs('2').declares(`${rule}-right`, '2rem');
      });
    });
  });

});