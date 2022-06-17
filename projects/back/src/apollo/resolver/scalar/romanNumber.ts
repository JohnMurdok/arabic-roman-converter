import { GraphQLScalarType } from 'graphql';

const romanNumberScalar = new GraphQLScalarType({
    name: 'RomanNumber',
    description: 'Roman number custom scalar type',
    parseValue: (value) => {
        console.log(value);
        return value;
    },
    parseLiteral: (ast) => ast,
});

export default romanNumberScalar;
