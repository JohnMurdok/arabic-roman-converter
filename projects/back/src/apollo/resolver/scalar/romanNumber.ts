import { UserInputError, SyntaxError } from 'apollo-server-core';
import { GraphQLScalarType } from 'graphql';
import { ROMAN_REG_EXP } from '@constants/roman';

const romanNumberScalar = new GraphQLScalarType({
    name: 'RomanNumber',
    description: 'Roman number custom scalar type',
    serialize: (value) => {
        // prevent server sending whatever string to client
        if (!value.match(ROMAN_REG_EXP)) {
            throw new SyntaxError(`Expected RegExp from server ${ROMAN_REG_EXP}`);
        }
        return value;
    },
    parseValue: (value) => {
        // prevent server receiving whatever string from client
        if (!value.match(ROMAN_REG_EXP)) {
            throw new UserInputError(`Expected RegExp ${ROMAN_REG_EXP}`);
        }
        return value;
    },
    parseLiteral: (ast) => ast,
});

export default romanNumberScalar;
