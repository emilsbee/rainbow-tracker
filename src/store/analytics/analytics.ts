import * as i from 'types';
import { action, thunk } from 'easy-peasy';

import { history } from '../../routers/AppRouter';

const analyticsModel: i.AnalyticsModel = {
  totalPerWeek: { activityTypes: [], categoryTypes: [] },
  setTotalPerWeek: action((state, payload) => {
    state.totalPerWeek = payload.totalPerWeek;
  }),
  fetchTotalPerWeek: thunk(async (actions, payload) => {
    const res = await fetch(`/api/user/${payload.userid}/analytics/total-per-week?week_number=${payload.weekNr}&week_year=${payload.year}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (res.ok) {
      const totalPerWeek: i.TotalPerWeek = await res.json();
      actions.setTotalPerWeek({ totalPerWeek });
    } else if (res.status === 401) {
      history.push('/login');
    } else if (res.status === 404) {
      throw new Error('This week has no analytics.');
    } else {
      throw new Error('Error occurred while fetching analytics for this week.');
    }
  }),

  totalPerDay: [],
  setTotalPerDay: action((state, payload) => {
    state.totalPerDay = payload.totalPerDay;
  }),
  fetchTotalPerDay: thunk(async (actions, payload) => {
    const res = await fetch(`/api/user/${payload.userid}/analytics/total-per-day?week_number=${payload.weekNr}&week_year=${payload.year}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (res.ok) {
      const totalPerDay: i.TotalPerDay[] = await res.json();
      actions.setTotalPerDay({ totalPerDay });
    } else if (res.status === 401) {
      history.push('/login');
    } else if (res.status === 404) {
      throw new Error('This week has no analytics.');
    } else {
      throw new Error('Error occurred while fetching analytics for this week.');
    }
  }),

  availableDates: [],
  setAvailableDates: action((state, payload) => {
    state.availableDates = payload.availableDates;
  }),
  fetchAvailableDates: thunk(async (actions, payload) => {
    const res = await fetch(`/api/user/${payload.userid}/analytics/available-dates`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (res.ok) {
      const availableDates: i.AvailableDate[] = await res.json();
      actions.setAvailableDates({ availableDates });
    } else if (res.status === 401) {
      history.push('/login');
    } else {
      throw new Error(`Could not fetch available dates for user ${payload.userid}.`);
    }
  }),

  availableMonths: [],
  setAvailableMonths: action((state, payload) => {
    state.availableMonths = payload.availableMonths;
  }),
  fetchAvailableMonths: thunk(async (actions, payload) => {
    const res = await fetch(`/api/user/${payload.userid}/analytics/available-months`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (res.ok) {
      const availableMonths: i.AvailableMonth[] = await res.json();
      actions.setAvailableMonths({ availableMonths });
    } else if (res.status === 401) {
      history.push('/login');
    } else {
      throw new Error(`Could not fetch available months for user ${payload.userid}.`);
    }
  }),

  totalPerMonth: {
    categoryTypes: [],
    activityTypes: [],
  },
  setTotalPerMonth: action((state, payload) => {
    state.totalPerMonth = payload.totalPerMonth;
  }),
  fetchTotalPerMonth: thunk(async (actions, payload) => {
    const res = await fetch(`/api/user/${payload.userid}/analytics/total-per-month?month=${payload.month}&year=${payload.year}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });

    if (res.ok) {
      const totalPerMonth: i.TotalPerMonth = await res.json();
      actions.setTotalPerMonth({ totalPerMonth });
    } else if (res.status === 401) {
      history.push('/login');
    } else if (res.status === 404) {
      throw new Error('This week has no analytics.');
    } else {
      throw new Error('Error occurred while fetching analytics for this month.');
    }
  }),
};

export default analyticsModel;
