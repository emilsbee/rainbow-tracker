import * as React from 'react';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MainDashboardWrapper from '../components/MainDashboard/MainDashboardWrapper';
import LoginPage from '../components/LoginPage/LoginPage';
import NotFound from '../components/NotFoundPage/NotFound';
import SettingsDashboardWrapper from '../components/Settings/SettingsDashboardWrapper/SettingsDashboardWrapper';
import BackendError from '../components/BackendErrorPage/BackendError';
import AnalyticsDashboardWrapper from '../components/Analytics/AnalyticsDashboardWrapper/AnalyticsDashboardWrapper';
import EditActivityForm from '../components/Settings/EditActivityForm/EditActivityForm';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

export const history = createBrowserHistory();

const AppRouter = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<LoginPage />} />
        </Route>
        <Route path="/internal-error" element={<PublicRoute />}>
          <Route path="/internal-error" element={<BackendError />} />
        </Route>
        <Route path="/analytics/*" element={<PrivateRoute />}>
          <Route path="/analytics/*" element={<AnalyticsDashboardWrapper />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<MainDashboardWrapper />} />
        </Route>
        <Route path="/settings/category/:categoryid/edit-activity/:activityid" element={<PrivateRoute />}>
          <Route path="/settings/category/:categoryid/edit-activity/:activityid" element={<EditActivityForm />} />
        </Route>
        <Route path="/settings" element={<PrivateRoute />}>
          <Route path="/settings" element={<SettingsDashboardWrapper />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
