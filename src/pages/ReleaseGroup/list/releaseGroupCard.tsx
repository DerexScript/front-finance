import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type TReleaseGroup = {
  id: number;
  name: string;
  description: string;
  status: number;
  expiration: string;
  company_id: number;
  image: string;
};

const ReleaseGroupCard = ({ ...releaseGroup }: TReleaseGroup): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component='img' height='140' image={releaseGroup.image} alt='imagem da empresa' />
      <CardContent style={{ height: 200 }}>
        <Typography gutterBottom variant='h5' component='div'>
          {releaseGroup.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {releaseGroup.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={(): void => {
            navigate(`/Company/${releaseGroup.company_id}/ReleasesGroups/${releaseGroup.id}`);
          }}
        >
          Lançamentos
        </Button>
      </CardActions>
    </Card>
  );
};
export default ReleaseGroupCard;
