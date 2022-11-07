import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICompany } from './ICompany';

const CompanyCard = ({ ...props }: ICompany): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' height='140' image={props.image_name} alt='imagem da empresa' />
      <CardContent style={{ height: 200 }}>
        <Typography gutterBottom variant='h5' component='div'>
          {props.name}
        </Typography>
        <Typography variant='body2' color='text.secondary' style={{ maxWidth: '200px' }}>
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={(): void => {
            navigate(`/Company/${props.id}/ReleasesGroups/`);
          }}
        >
          Grupos De Lançamentos
        </Button>
      </CardActions>
    </Card>
  );
};
export default CompanyCard;
