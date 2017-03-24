import path from 'path';
import assert from 'assert';
import Sassaby from 'sassaby';

describe('spacing/_generators.scss', () => {
  const file = path.resolve(__dirname, '../elegant-sass-things/spacing/_generators.scss');

  describe('generate-elegant-spacing-margin|padding-classes', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'elegant-spacing': `(
          spacers: (
            'a': 0.5rem,
            'b': 1rem,
            'c': 2rem
          )
        )`
      },
      dependencies: [
        path.resolve(__dirname, '../elegant-sass-things/spacing/_abstracts.scss')
      ]
    });

    ['margin', 'padding'].forEach((rule) => {
      let ruleAbbreviation = rule.charAt(0);

      ['a', 'b', 'c'].forEach((spacer) => {
        it(`should generate ${rule} selector for spacer ${spacer}`, () => {
          let selector = `.${ruleAbbreviation}-${spacer}`;

          sassaby.standaloneMixin(`generate-elegant-spacing-${rule}-classes`).calledWithArgs().createsSelector(selector);
          sassaby.standaloneMixin(`generate-elegant-spacing-${rule}-classes`).calledWithArgs().calls(`${rule}(${spacer})`);
        });

        ['top', 'right', 'bottom', 'left', 'vertical', 'horizontal'].forEach((direction) => {
          let directionAbbreviation = direction.charAt(0);
          let selector = `.${ruleAbbreviation}${directionAbbreviation}-${spacer}`;

          it(`should generate ${rule} ${direction} selector for spacer ${spacer}`, () => {
            sassaby.standaloneMixin(`generate-elegant-spacing-${rule}-classes`).calledWithArgs().createsSelector(selector);
            sassaby.standaloneMixin(`generate-elegant-spacing-${rule}-classes`).calledWithArgs().calls(`${rule}-${direction}(${spacer})`);
          })
        });
      });
    });
  });

});
