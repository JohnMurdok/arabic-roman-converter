import { useSetState } from 'react-use';
import { Container } from '@mui/material';
import AppContext from '../../context';
import CardComponent from '../../component/card/CardComponent';
import ArabicInputComponent from '../../component/input/ArabicInputComponent';
import RomanInputComponent from '../../component/input/RomanInputComponent';

const CARD_TITLE = 'Arabic number to roman number converter';

const MainPage = () => {
    const [state, setState] = useSetState({
        arabicNumber: 1,
        romanNumber: 'I',
    })

    return (
        <AppContext.Provider value={{
            ...state,
            setArabicNumber: (value: number) => setState({ arabicNumber: value }),
            setRomanNumber: (value: string) => setState({ romanNumber: value }),
        }}>
            <Container data-testid={'main-page'} maxWidth={'sm'} >
                <CardComponent data-testid={'main-page-card'} title={CARD_TITLE}>
                    <ArabicInputComponent data-testid={'main-page-arabic-input'} />
                    <RomanInputComponent data-testid={'main-page-roman-input'} />
                </CardComponent>
            </Container>
        </AppContext.Provider>
    );
}

export default MainPage;
