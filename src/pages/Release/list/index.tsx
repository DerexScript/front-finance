import { Add } from '@mui/icons-material';
import { Box, Button, Container, Grid } from '@mui/material';
import SiteMenu from 'components/siteMenu';
import { useAuth } from 'context/AuthProvider/useAuth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAxios } from 'utils/useAxios';
import { ICategory } from './ICategory';
import { IRelease } from './IRelease';
import Release from './release';

type TRelease = {
  id: number;
  action: string;
  resolved: boolean;
  removed: boolean;
  element: JSX.Element;
};

const Releases = (): JSX.Element => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [releasesJSX, setReleasesJSX] = useState<TRelease[]>([]);
  const auth = useAuth();
  const { releaseGroupID } = useParams();

  useEffect(() => {
    const getCategory = useAxios({ url: 'category' });
    const getReleases = useAxios({ url: `release-group/${releaseGroupID}` });
    const categoryDefault = {
      id: 0,
      name: 'Escolha uma categoria',
      description: 'Escolha uma categoria',
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
        const newReleases = releasesGroupsResponse.data.releases
          .sort()
          .reverse()
          .map((release: IRelease) => {
            release.state = true;
            return release;
          });

        const newReleasesJSX = newReleases.map((release: IRelease) => {
          return {
            id: release.id,
            action: 'update',
            resolved: true,
            removed: false,
            element: (
              <Release
                setReleasesJSX={setReleasesJSX}
                categories={[categoryDefault, ...(categoryResponse?.data as ICategory[])]}
                release={release}
                action={'update'}
                key={release.id}
                myKey={release.id}
              />
            ),
          };
        });
        setReleasesJSX(newReleasesJSX);
      } else {
        if (releasesGroupsError != null && releasesGroupsError?.data === 'Unauthorized.') {
          auth.logout();
        }
      }
    })();
  }, []);

  const handleAddRelease = (): void => {
    const isState = releasesJSX.filter(releaseJSX => releaseJSX.resolved === false);

    if (category.length && !isState.length) {
      const keyID = new Date().getTime();
      setReleasesJSX([
        {
          id: keyID,
          action: 'insert',
          resolved: false,
          removed: false,
          element: (
            <Release
              setReleasesJSX={setReleasesJSX}
              categories={category}
              action={'insert'}
              key={keyID}
              myKey={keyID}
            />
          ),
        },
        ...releasesJSX,
      ]);
    } else {
      toast.warning('Você precisa resolver as edições em andamento.');
    }
  };

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
                onClick={handleAddRelease}
              >
                Adicionar
              </Button>
            </Box>
          </Container>
          {releasesJSX.length > 0 &&
            releasesJSX.map(releaseJSX => {
              if (!releaseJSX.removed) {
                return releaseJSX.element;
              }
            })}
        </Box>
      </Grid>
    </>
  );
};

export default Releases;
