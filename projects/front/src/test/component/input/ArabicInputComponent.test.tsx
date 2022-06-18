import { render, screen } from '@testing-library/react';
import ArabicInputComponent from '../../../component/input/ArabicInputComponent';

describe('[COMPONENT] ArabicInputComponent', () => {
    test('matches snapshot', async () => {
        render(<ArabicInputComponent />);
        const textField = await screen.findByTestId('arabic-input');
        expect(textField).toMatchSnapshot();
    });
});
