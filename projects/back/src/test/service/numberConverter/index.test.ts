import numberConverterService from '@services/numberConverter';
import fixtures from './fixtures';

describe('[SERVICE] NumberConverterService - toArabic', () => {
    fixtures.forEach(({ arabicNumber, romanNumber }) => {
        test(`it should return ${arabicNumber} when roman = "${romanNumber}"`, () => {
            expect(numberConverterService.toArabic(romanNumber)).toEqual(arabicNumber);
        });
    });
});

describe('[SERVICE] NumberConverterService - toRoman', () => {
    fixtures.forEach(({ arabicNumber, romanNumber }) => {
        test(`it should return ${romanNumber} when roman = "${arabicNumber}"`, () => {
            expect(numberConverterService.toRoman(arabicNumber)).toEqual(romanNumber);
        });
    });
});
