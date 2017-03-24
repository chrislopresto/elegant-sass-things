import path from 'path';
import assert from 'assert';
import Sassaby from 'sassaby';

describe('spacing/_generators.scss', () => {
  const file = path.resolve(__dirname, '../elegant-sass-things/spacing/_generators.scss');

  describe('generate-est-spacing-margin|padding-classes', () => {
    const sassaby = new Sassaby(file, {
      variables: {
        'est-spacing': `(
          prefix: 'foo',
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
          let selector = `.foo-${ruleAbbreviation}--${spacer}`;

          sassaby.standaloneMixin(`generate-est-spacing-${rule}-classes`).calledWithArgs().createsSelector(selector);
        });

        ['top', 'right', 'bottom', 'left', 'vertical', 'horizontal'].forEach((direction) => {
          let directionAbbreviation = direction.charAt(0);
          let selector = `.foo-${ruleAbbreviation}-${directionAbbreviation}--${spacer}`;

          it(`should generate ${rule} ${direction} selector for spacer ${spacer}`, () => {
            sassaby.standaloneMixin(`generate-est-spacing-${rule}-classes`).calledWithArgs().createsSelector(selector);
          })
        });
      });
    });
  });

});
