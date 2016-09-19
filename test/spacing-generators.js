import path from 'path';
import assert from 'assert';
import Sassaby from 'sassaby';

describe('spacing/_generators.scss', () => {
  const file = path.resolve(__dirname, '../elegant-sass-things/spacing/_generators.scss');

  describe('generate-elegant-spacing-margin|padding-classes', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'elegant-spacing': `(
          unit: 1rem,
          multiples: (1 2)
        )`
      },
      dependencies: [
        path.resolve(__dirname, '../elegant-sass-things/spacing/_abstracts.scss')
      ]
    });

    ['margin', 'padding'].forEach((rule) => {
      [1, 2].forEach((multiple) => {
        it(`should generate ${rule} selector for multiple ${multiple}`, () => {
          sassaby.standaloneMixin(`generate-elegant-spacing-${rule}-classes`).calledWithArgs().createsSelector(`.u-${rule}--${multiple}`);
          sassaby.standaloneMixin(`generate-elegant-spacing-${rule}-classes`).calledWithArgs().calls(`${rule}(${multiple})`);
        });

        ['top', 'right', 'bottom', 'left', 'vertical', 'horizontal'].forEach((direction) => {
          it(`should generate ${rule} ${direction} selector for multiple $multiple`, () => {
            // Capitalize direction to build utilityName... e.g. marginTop
            let utilityName = rule + direction.charAt(0).toUpperCase() + direction.slice(1);
            sassaby.standaloneMixin(`generate-elegant-spacing-${rule}-classes`).calledWithArgs().createsSelector(`.u-${utilityName}--${multiple}`);
            sassaby.standaloneMixin(`generate-elegant-spacing-${rule}-classes`).calledWithArgs().calls(`${rule}-${direction}(${multiple})`);
          })
        });
      });
    });
  });

});
