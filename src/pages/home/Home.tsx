import { Box, Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import CustomMenu from 'components/Menu';
import { AuthContext } from 'context/AuthProvider';
import React, { useContext, useEffect, useState } from 'react';
import { Api } from 'services/api';

interface ICompany {
  id: number;
  name: string;
}

const Home = (): JSX.Element => {
  const [companies, setCompanies] = useState([]);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    void (async token => {
      try {
        const response = await Api.get('company', {
          headers: { Authorization: `Bearer ${token as string}` },
        });
        setCompanies(response.data.data);
      } catch (err) {
        console.log(err);
      }
    })(token);
  }, [token]);

  return (
    <>
      <CustomMenu />
      <Box sx={{ fontWeight: 'bold', fontFamily: 'Helvetica' }}>
        {companies && (
          <Grid container spacing={2} sx={{ padding: '40px' }}>
            {companies.map((company: ICompany) => (
              <Grid item xs={12} md={6} lg={3} key={company.id}>
                <Card
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    variant: 'outlined',
                  }}
                >
                  <CardActionArea sx={{ padding: '40px' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <img src={require('./twitter.png')} height='100' />
                      <Typography sx={{ fontSize: '1.5rem', pt: '30px' }}>{company.name}</Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Home;
