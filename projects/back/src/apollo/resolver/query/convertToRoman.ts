import numberConverterService from '@services/numberConverter';

export interface IArgs {
    arabicNumber: number;
}

/**
 * convert to roman number
 * @param {null} _
 * @param {null} input
 * @returns {number}
 */
export default (_: null, { arabicNumber } : IArgs): string => numberConverterService.toRoman(arabicNumber);
