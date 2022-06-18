import ROMAN_CONSTANT from '@constants/roman';

const PARSE_ROMAN_REG_EXP = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g;

class NumberConverterService {
    toArabic(romanNumber: string): number {
        let arabicNumber = 0;
        return romanNumber.match(PARSE_ROMAN_REG_EXP)?.reduce((acc: number, currentValue: string) => {
            const romanValue = ROMAN_CONSTANT[currentValue];
            return acc + romanValue;
        }, arabicNumber) || 0;
    }

    toRoman(arabicNumber: number): string {
        let reduceNumber = arabicNumber;
        const romanNumber = Object.keys(ROMAN_CONSTANT).reduce((acc: string, romanSymbol: string) => {
            const romanValue = ROMAN_CONSTANT[romanSymbol];
            while (reduceNumber >= romanValue) {
                reduceNumber -= romanValue;
                acc += romanSymbol;
            }
            return acc;
        }, '');
        return romanNumber;
    }
}

export default new NumberConverterService();
