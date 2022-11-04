import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useAxios } from 'utils/useAxios';
import CompanyCard from './companyCard';
import { ICompany } from './ICompany';
import SiteMenu from 'components/siteMenu';

const Home = (): JSX.Element => {
  const [companies, setCompanies] = useState<ICompany[]>([]);

  useEffect(() => {
    void (async (): Promise<void> => {
      const { response } = await useAxios({ method: 'get', url: 'company' });
      if (response) {
        setCompanies(response.data);
      }
    })();
  }, []);

  return (
    <>
      <SiteMenu />
      <Grid container direction='row' sx={{ width: '100%' }} marginTop={1}>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            p: 1,
            m: 1,
            maxWidth: '100%',
            borderRadius: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {companies.length > 0 &&
            companies.map(company => (
              <Grid
                key={company.id}
                item
                xs={12}
                sm={5}
                md={2}
                lg={2}
                sx={{ marginTop: '10px', marginRight: '10px', minWidth: 200 }}
              >
                <CompanyCard {...company} />
              </Grid>
            ))}
        </Box>
      </Grid>
    </>
  );
};
export default Home;
