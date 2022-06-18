import IAxiosGqlRequest from '../../type/request/IAxiosRequest';
import apiService from '../api';

interface IArabicResponse {
  arabicNumber: number
}

interface IRomanResponse {
  romanNumber: string
}


class NumberConverterService {
  /**
   * Convert to arabic from romanNumber
   * @param romanNumber 
   */
  async convertToArabic(romanNumber: string): Promise<number | null> {
    try {
      const query = `
        query convert($romanNumber: RomanNumber!) {
          arabicNumber: convertToArabic(romanNumber: $romanNumber)
        }
      `;
      const variables = {
        romanNumber,
      };

      const { data } = await apiService.doGqlRequest(query, variables) as IAxiosGqlRequest<IArabicResponse>;
      return data.data.arabicNumber;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  /**
   * Convert to roman number from arabic number
   * @param arabicNumber
   */
  async convertToRoman(arabicNumber: number): Promise<string | null> {
    try {
      const query = `
      query convert($arabicNumber: NonNegativeInt!) {
        romanNumber: convertToRoman(arabicNumber: $arabicNumber)
      }
    `;

      const variables = {
        arabicNumber,
      };

      const { data } = await apiService.doGqlRequest(query, variables) as IAxiosGqlRequest<IRomanResponse>;
      return data.data.romanNumber;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

export default new NumberConverterService();
