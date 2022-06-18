import { render, screen } from '@testing-library/react';
import MainPage from '../../../page/main/MainPage';
jest.mock('../../../component/card/CardComponent', () => 'card-component');
jest.mock('../../../component/input/ArabicInputComponent', () => 'arabic-input-component');
jest.mock('../../../component/input/RomanInputComponent', () => 'roman-input-component');

describe('[PAGE] MainPage', () => {
    test('matches snapshot', async () => {
        render(<MainPage />);
        const mainPageComponent = await screen.findByTestId('main-page');
        expect(mainPageComponent).toMatchSnapshot()
    });

    test('CardComponent should have a title property', async () => {
        render(<MainPage />);
        const cardComponent = await screen.findByTestId('main-page-card');
        expect(cardComponent).toHaveAttribute('title', 'Arabic number to roman number converter');
    });
});
