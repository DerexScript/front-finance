import React, { useContext, useEffect, useState } from 'react';
import CustomMenu from 'components/Menu';
import { Box, Card, Grid } from '@mui/material';
import { Api } from 'services/api';
import { AuthContext } from 'context/AuthProvider';

interface ICompany {
  id: number;
  name: string;
}

const Home = (): JSX.Element => {
  const [companies, setCompanies] = useState([]);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    void (async (token) => {
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
              <Grid item sm={6} md={3} key={company.id}>
                <Card sx={{ padding: '20px' }}>{company.name}</Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Home;
