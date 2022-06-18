import { Container } from '@mui/material';
import CardComponent from '../../component/card/CardComponent';
import ArabicInputComponent from '../../component/input/ArabicInputComponent';
import RomanInputComponent from '../../component/input/RomanInputComponent';

const CARD_TITLE = 'Arabic number to roman number converter';

const MainPage = () => (
    <Container data-testid={'main-page'} maxWidth={'sm'} >
        <CardComponent data-testid={'main-page-card'} title={CARD_TITLE}>
            <ArabicInputComponent data-testid={'main-page-arabic-input'} />
            <RomanInputComponent data-testid={'main-page-roman-input'} />
        </CardComponent>
    </Container>
);

export default MainPage;
