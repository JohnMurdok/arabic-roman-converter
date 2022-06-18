import numberConverterService from '@services/numberConverter';

export interface IArgs {
    romanNumber: string;
}

/**
 * convert to arabic number
 * @param {null} _
 * @param {null} input
 * @returns {number}
 */
export default (_: null, { romanNumber } : IArgs): number => numberConverterService.toArabic(romanNumber);
