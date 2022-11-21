import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useAxios } from 'utils/useAxios';
import CompanyCard from './companyCard';
import { ICompany } from './ICompany';
import SiteMenu from 'components/siteMenu';
import { ControlPoint } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CompanyList = (): JSX.Element => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const navigate = useNavigate();
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          m: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h6' component='div'>
          Empresas
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          m: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={(): void => {
            navigate('/Company/Create');
          }}
          startIcon={<ControlPoint />}
          variant='text'
        >
          Criar nova empresa
        </Button>
      </Box>

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
            margin: '0 auto',
            height: '100%',
            backgroundColor: 'rgb(24, 26, 27)',
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
                sx={{
                  minWidth: 200,
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: '5px',
                  marginRight: '10px',
                }}
              >
                <CompanyCard {...company} />
              </Grid>
            ))}
        </Box>
      </Grid>
    </>
  );
};
export default CompanyList;
