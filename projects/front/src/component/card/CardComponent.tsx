import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

interface ICardComponentProps {
  title: string;
  children: React.ReactNode | React.ReactNode[]
}

const CardComponent = (props: ICardComponentProps) => (
  <Box data-testid={'card-component'} sx={{ minWidth: 275, marginTop: 25 }}>
    <Card variant="outlined">
      <CardContent data-testid={'card-component-content'}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { props.title }
        </Typography>
        { props.children }
      </CardContent>
    </Card>
  </Box>
);

export default CardComponent;
