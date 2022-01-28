import React from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import RoutePaths from '@/enums/RoutePaths';
import BasicLayout from '@/components/BasicLayout';

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <BasicLayout appBarProps={{ hasBackButton: false, title: 'Home' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
        spacing={5}
      >
        <Grid item>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(RoutePaths.scanPage)}
          >
            Check-in
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            fullWidth
            onClick={() => navigate(RoutePaths.listPage)}
          >
            Convidados
          </Button>
        </Grid>
      </Grid>
    </BasicLayout>
  );
};

export default HomePage;
