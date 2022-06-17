import { resolvers } from 'graphql-scalars';
import romanNumberScalar from './scalar/romanNumber';
import convertToArabic from './query/convertToArabic';
import convertToRoman from './query/convertToRoman';

export default {
    ...resolvers,
    RomanNumber: romanNumberScalar,
    Query: {
        convertToArabic,
        convertToRoman,
    },
};
