import React from 'react';

const context = React.createContext({
    arabicNumber: 1,
    romanNumber: 'I',
    setArabicNumber: (value: number) => {},
    setRomanNumber: (value: string) => {},
});

export default context;
