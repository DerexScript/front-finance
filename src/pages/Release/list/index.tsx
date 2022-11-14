import { Add } from '@mui/icons-material';
import { Box, Button, Container, Grid } from '@mui/material';
import SiteMenu from 'components/siteMenu';
import { useAuth } from 'context/AuthProvider/useAuth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from 'utils/useAxios';
import { ICategory } from './ICategory';
import { IRelease } from './IRelease';
import Release from './release';

const Releases = (): JSX.Element => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [releases, setReleases] = useState<IRelease[]>([]);
  const [releasesE, setReleasesE] = useState<JSX.Element[]>([]);
  const [releasesEE, setReleasesEE] = useState<JSX.Element[]>([]);
  const auth = useAuth();
  const { releaseGroupID } = useParams();

  useEffect(() => {
    const getCategory = useAxios({ url: 'category' });
    const getReleases = useAxios({ url: `release-group/${releaseGroupID}` });
    const categoryDefault = {
      id: 0,
      name: 'Escolha uma empresa',
      description: 'Escolha uma empresa',
    };
    (async (): Promise<void> => {
      const [
        { response: categoryResponse, error: categoryError },
        { response: releasesGroupsResponse, error: releasesGroupsError },
      ] = await Promise.all([getCategory, getReleases]);
      if (categoryResponse) {
        setCategory([categoryDefault, ...categoryResponse.data]);
      } else {
        if (categoryError != null && categoryError?.data === 'Unauthorized.') {
          auth.logout();
        }
      }
      if (releasesGroupsResponse) {
        setReleases(releasesGroupsResponse.data.releases);
        const tt = releasesGroupsResponse.data.releases
          .sort()
          .reverse()
          .map((release: IRelease) => {
            return (
              <Release
                categories={[categoryDefault, ...(categoryResponse?.data as ICategory[])]}
                release={release}
                key={release.id}
              />
            );
          });

        setReleasesEE([...releasesEE, ...tt]);
      } else {
        if (releasesGroupsError != null && releasesGroupsError?.data === 'Unauthorized.') {
          auth.logout();
        }
      }
    })();
  }, []);

  return (
    <>
      <SiteMenu />
      <Grid container direction='row' sx={{ width: '100%' }} marginTop={1}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(24, 26, 27)',
          }}
        >
          <Container maxWidth='xl'>
            <Box
              width='100%'
              sx={{
                marginTop: 1,
                marginBottom: 1,
                textAlign: 'center',
              }}
            >
              <Button
                variant='outlined'
                sx={{ marginBottom: 1 }}
                fullWidth
                startIcon={<Add />}
                onClick={(): void => {
                  if (category.length) {
                    const asd = [<Release categories={category} key={new Date().getTime()} />, ...releasesE];
                    setReleasesE(asd);
                  }
                }}
              >
                Adicionar
              </Button>
            </Box>
          </Container>
          {releasesE}
          {releasesEE}
        </Box>
      </Grid>
    </>
  );
};

export default Releases;
