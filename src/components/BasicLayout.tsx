/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import AppBar, { AppBarProps } from '@/components/AppBar';

const Container = styled(Grid)`
  height: 100vh;
`;

interface BasicLayoutProps {
  hasBackButton?: boolean;
  appBarProps: AppBarProps;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({
  children,
  appBarProps,
  ...props
}) => {
  return (
    <Container container direction="column" {...props}>
      <AppBar {...appBarProps} />
      <Grid item xs container>
        {children}
      </Grid>
    </Container>
  );
};

export default BasicLayout;
