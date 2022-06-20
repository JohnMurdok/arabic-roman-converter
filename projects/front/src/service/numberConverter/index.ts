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
  async convertToArabic(romanNumber: string, clientUuid: string): Promise<void> {
    try {
      const query = `
        query convert($romanNumber: RomanNumber!, $clientUuid: UUID!) {
          convertToArabic(romanNumber: $romanNumber, clientUuid: $clientUuid)
        }
      `;
      const variables = {
        romanNumber,
        clientUuid: clientUuid
      };

      await apiService.doGqlRequest(query, variables) as IAxiosGqlRequest<IArabicResponse>;
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Convert to roman number from arabic number
   * @param arabicNumber
   */
  async convertToRoman(arabicNumber: number, clientUuid: string): Promise<void> {
    try {
      const query = `
      query convert($arabicNumber: NonNegativeInt!, $clientUuid: UUID!) {
        convertToRoman(arabicNumber: $arabicNumber, clientUuid: $clientUuid)
      }
    `;

      const variables = {
        arabicNumber,
        clientUuid,
      };

      await apiService.doGqlRequest(query, variables) as IAxiosGqlRequest<IRomanResponse>;
    } catch (e) {
      console.error(e);
    }
  }
}

export default new NumberConverterService();
