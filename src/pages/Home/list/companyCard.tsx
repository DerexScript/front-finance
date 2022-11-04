import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { ICompany } from './ICompany';

const CompanyCard = ({ ...props }: ICompany): JSX.Element => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' height='140' image={props.image_name} alt='imagem da empresa' />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {props.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Lançamentos</Button>
      </CardActions>
    </Card>
  );
};
export default CompanyCard;
