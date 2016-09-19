import path from 'path';
import assert from 'assert';
import Sassaby from 'sassaby';

describe('_spacing.scss', () => {
  const file = path.resolve(__dirname, '../elegant-sass-things/_spacing.scss');
  const sassaby = new Sassaby(file);

  describe('contains', () => {
    it('should return true when item is in list', () => {
      sassaby.func('contains').calledWithArgs('(0 (1:2) 1 2 3 4 5 6)', '1').isTrue();
      sassaby.func('contains').calledWithArgs('(0 (1:2) 1 2 3 4 5 6)', '(1:2)').isTrue();
    });

    it('should return false when item is not in list', () => {
      sassaby.func('contains').calledWithArgs('(0 (1:2) 1 2 3 4 5 6)', '10').isFalse();
      sassaby.func('contains').calledWithArgs('(0 (1:2) 1 2 3 4 5 6)', '(1:3)').isFalse();
    });
  });
});
