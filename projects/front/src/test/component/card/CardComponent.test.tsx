import { render, screen } from '@testing-library/react';
import CardComponent from '../../../component/card/CardComponent';
import fixtures from './fixtures';

describe('[PAGE] CardComponent', () => {
    test('matches snapshot', async () => {
        render(<CardComponent {...fixtures} />);
        const cardComponent = await screen.findByTestId('card-component');
        expect(cardComponent).toMatchSnapshot()
    });
});
