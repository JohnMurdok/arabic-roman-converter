import { render, screen } from '@testing-library/react';
import ArabicInputComponent from '../../../component/input/ArabicInputComponent';
jest.mock('../../../service/sse', () => ({
    clientUuid: 'uuid',
    registerEvent: jest.fn((event, cb) => cb({
        arabicNumber: 1,
    })),
}));

describe('[COMPONENT] ArabicInputComponent', () => {
    test('matches snapshot', async () => {
        render(<ArabicInputComponent />);
        const textField = await screen.findByTestId('arabic-input');
        expect(textField).toMatchSnapshot();
    });
});
