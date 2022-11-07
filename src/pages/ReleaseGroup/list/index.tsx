import { Grid, Typography } from '@mui/material';
import SiteMenu from 'components/siteMenu';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from 'utils/useAxios';
import ReleaseGroupCard from './releaseGroupCard';

type TReleaseGroup = {
  id: number;
  name: string;
  description: string;
  status: number;
  expiration: string;
  company_id: number;
  image: string;
};

type TCompany = {
  description: string;
  id: number;
  image_name: string;
  name: string;
  private: number;
};

const ReleaseGroup = (): JSX.Element => {
  const [releasesGroups, setReleasesGroups] = useState<TReleaseGroup[]>([]);
  const [company, setCompany] = useState<TCompany>();
  const params = useParams();
  const { companyID } = params;
  useEffect(() => {
    (async (): Promise<void> => {
      const { response: companyResponse } = await useAxios({ url: `company/${companyID}` });
      if (companyResponse) {
        setCompany(companyResponse.data);
        setReleasesGroups(
          companyResponse.data.releases_groups.map((releaseGroup: TReleaseGroup) => {
            releaseGroup.image = companyResponse.data.image_name;
            return releaseGroup;
          }),
        );
      }
    })();
  }, []);
  return (
    <>
      <SiteMenu />

      {releasesGroups.length > 0 && company && (
        <>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center', marginTop: 5 }}>
            Grupo de Lançamento para empresa {company?.name}
          </Typography>

          {releasesGroups.map(releaseGroup => (
            <Grid
              key={releaseGroup.id}
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
              <ReleaseGroupCard {...releaseGroup} />
            </Grid>
          ))}
        </>
      )}
    </>
  );
};

export default ReleaseGroup;
