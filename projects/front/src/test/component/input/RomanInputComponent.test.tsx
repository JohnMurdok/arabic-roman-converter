import { render, screen } from '@testing-library/react';
import RomanInputComponent from '../../../component/input/RomanInputComponent';

describe('[COMPONENT] RomanInputComponent', () => {
    test('matches snapshot', async () => {
        render(<RomanInputComponent />);
        const textField = await screen.findByTestId('roman-input');
        expect(textField).toMatchSnapshot();
    });
});
