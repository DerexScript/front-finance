import React, { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useAxios } from 'utils/useAxios';
import SiteMenu from 'components/siteMenu';
import { IRelease } from './IRelease';

const Release = (): JSX.Element => {
  const [releases, setReleases] = useState<IRelease[]>([]);

  useEffect(() => {
    void (async (): Promise<void> => {
      const { response } = await useAxios({ method: 'get', url: 'entry' });
      if (response) {
        setReleases(response.data);
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
          {releases.length > 0 &&
            releases.map(release => (
              <Grid
                key={release.id}
                item
                xs={12}
                sm={5}
                md={2}
                lg={2}
                sx={{ marginTop: '10px', marginRight: '10px', minWidth: 200 }}
              ></Grid>
            ))}
        </Box>
      </Grid>
    </>
  );
};
export default Release;
