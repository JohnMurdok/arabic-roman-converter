import apiService from '../../../service/api';
import numberConverterService from '../../../service/numberConverter';

jest.mock('../../../service/api');

const STRING_COMPARE_REG_EXP = /\s+/g;

const doGqlRequestMock = apiService.doGqlRequest as unknown as jest.Mock<Promise<any>>;

describe('[SERVICE] NumberConverterService', () => {
    test('convertToArabic()', async () => {
        doGqlRequestMock.mockResolvedValueOnce({
            data: {
                data: {
                    arabicNumber: 1,
                },
            },
        });

        const arabicNumber = await numberConverterService.convertToArabic('I');
        expect(arabicNumber).toEqual(1);
        expect(doGqlRequestMock.mock.calls[0][0].replace(STRING_COMPARE_REG_EXP, '')).toEqual(
            `query convert($romanNumber: RomanNumber!) {
                arabicNumber: convertToArabic(romanNumber: $romanNumber)
              }
            `.replace(STRING_COMPARE_REG_EXP, ''),
        );
        expect(doGqlRequestMock.mock.calls[0][1]).toMatchObject(
            { romanNumber: 'I' },
        );
    });

    test('convertToRoman()', async () => {
        doGqlRequestMock.mockResolvedValueOnce({
            data: {
                data: {
                    romanNumber: 'I',
                },
            },
        });

        const romanNumber = await numberConverterService.convertToRoman(1);
        expect(romanNumber).toEqual('I');
        expect(doGqlRequestMock.mock.calls[0][0].replace(STRING_COMPARE_REG_EXP, '')).toEqual(
            `query convert($arabicNumber: NonNegativeInt!) {
                romanNumber: convertToRoman(arabicNumber: $arabicNumber)
              }
            `.replace(STRING_COMPARE_REG_EXP, ''),
        );
        expect(doGqlRequestMock.mock.calls[0][1]).toMatchObject(
            { arabicNumber: 1 },
        );
    });
});
