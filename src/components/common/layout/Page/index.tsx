import * as React from 'react';

import { Loader, NavBar } from 'common';

import { HelmetComponent } from './components';
import { PageWrapper } from './styled';

export const Page: React.FC<PageProps> = ({
  hideNavBar, loading, children, tabTitle,
}) => {
  if (loading) {
    return (
      <>
        <HelmetComponent tabTitle={tabTitle} />
        <Loader />
      </>
    );
  }

  return (
    <>
      <HelmetComponent tabTitle={tabTitle} />
      <PageWrapper>
        {!hideNavBar && <NavBar />}
        {children}
      </PageWrapper>
    </>
  );
};

type PageProps = {
  hideNavBar?: boolean;
  loading?: boolean;
  tabTitle: string;
}
