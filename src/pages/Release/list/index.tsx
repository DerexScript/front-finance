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

type TRelease = {
  id: number;
  action: string;
  resolved: boolean;
  element: JSX.Element;
};

const Releases = (): JSX.Element => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [releases, setReleases] = useState<IRelease[]>([]);
  const [releasesE, setReleasesE] = useState<JSX.Element[]>([]);
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
        setReleases(newReleases);

        const newReleasesJSX = newReleases.map((release: IRelease) => {
          return {
            id: release.id,
            action: 'update',
            resolved: true,
            element: (
              <Release
                categories={[categoryDefault, ...(categoryResponse?.data as ICategory[])]}
                release={release}
                action={'update'}
                key={release.id}
              />
            ),
          };
        });
        setReleasesJSX(newReleasesJSX);

        // const tt = newReleases.map((release: IRelease) => (
        //   <Release
        //     categories={[categoryDefault, ...(categoryResponse?.data as ICategory[])]}
        //     release={release}
        //     action={'update'}
        //     key={release.id}
        //   />
        // ));

        // const newID = new Date().getTime() + Math.floor(Math.random() * (999999 - 111111)) + 111111;
        // setReleasesJSX([{ id: newID, action: 'update', resolved: true, element: [...releasesJSX, ...tt] }]);
      } else {
        if (releasesGroupsError != null && releasesGroupsError?.data === 'Unauthorized.') {
          auth.logout();
        }
      }
    })();
  }, []);

  const handleAddRelease = (): void => {
    if (category.length) {
      const keyID = new Date().getTime();
      setReleasesJSX([
        {
          id: keyID,
          action: 'insert',
          resolved: true,
          element: <Release categories={category} action={'insert'} key={keyID} />,
        },
        ...releasesJSX,
      ]);
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
          {releasesE}
          {releasesJSX.length > 0 && releasesJSX.map(releaseJSX => releaseJSX.element)}
        </Box>
      </Grid>
    </>
  );
};

export default Releases;
