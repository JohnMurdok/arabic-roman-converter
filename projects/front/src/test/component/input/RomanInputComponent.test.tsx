import { render, screen } from '@testing-library/react';
import RomanInputComponent from '../../../component/input/RomanInputComponent';
jest.mock('../../../service/sse', () => ({
    clientUuid: 'uuid',
    registerEvent: jest.fn((event, cb) => cb({
        arabicNumber: 1,
    })),
}));

describe('[COMPONENT] RomanInputComponent', () => {
    test('matches snapshot', async () => {
        render(<RomanInputComponent />);
        const textField = await screen.findByTestId('roman-input');
        expect(textField).toMatchSnapshot();
    });
});
