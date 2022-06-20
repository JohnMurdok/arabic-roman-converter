import apiService from '../../../service/api';
import numberConverterService from '../../../service/numberConverter';

jest.mock('../../../service/api');
const STRING_COMPARE_REG_EXP = /\s+/g;
const doGqlRequestMock = apiService.doGqlRequest as unknown as jest.Mock<Promise<any>>;

describe('[SERVICE] NumberConverterService', () => {
    test('convertToArabic() - return void', async () => {
        doGqlRequestMock.mockResolvedValueOnce({
            data: {
                data: {},
            },
        });

        await numberConverterService.convertToArabic('I', 'uuid');
        expect(doGqlRequestMock.mock.calls[0][0].replace(STRING_COMPARE_REG_EXP, '')).toEqual(
            `query convert($romanNumber: RomanNumber!, $clientUuid: UUID!) {
                convertToArabic(romanNumber: $romanNumber, clientUuid:$clientUuid)
              }
            `.replace(STRING_COMPARE_REG_EXP, ''),
        );
        expect(doGqlRequestMock.mock.calls[0][1]).toMatchObject(
            { romanNumber: 'I', clientUuid: 'uuid' },
        );
    });

    test('convertToRoman() - return void', async () => {
        doGqlRequestMock.mockResolvedValueOnce({
            data: {
                data: {},
            },
        });

        await numberConverterService.convertToRoman(1, 'uuid');
        expect(doGqlRequestMock.mock.calls[0][0].replace(STRING_COMPARE_REG_EXP, '')).toEqual(
            `query convert($arabicNumber: NonNegativeInt!, $clientUuid: UUID!) {
                convertToRoman(arabicNumber: $arabicNumber, clientUuid:$clientUuid)
              }
            `.replace(STRING_COMPARE_REG_EXP, ''),
        );
        expect(doGqlRequestMock.mock.calls[0][1]).toMatchObject(
            { arabicNumber: 1, clientUuid: 'uuid' },
        );
    });
});
