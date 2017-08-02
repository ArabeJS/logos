/**
 * @module Reducers/App
 * @desc App Reducer
 */
import immutable from 'immutability-helper';
import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';

import { ActionTypes } from 'constants/index';

export const appState = {
  isMobile: false,
  alerts: [],
  filter: {
    category: '',
    columns: 3,
    search: '',
    showTags: false,
    tag: '',
    view: 'latest',
    viewBefore: '',
  },
  rehydrated: false,
};

export default {
  app: createReducer(appState, {
    [REHYDRATE](state, action) {
      const filter = action.payload.app ? action.payload.app.filter : appState.filter;

      return {
        ...state,
        filter: { ...filter, showTags: false },
        notifications: appState.notifications,
        rehydrated: true,
      };
    },
    [ActionTypes.SHOW_ALERT](state, action) {
      return immutable(state, {
        alerts: { $push: [action.payload] },
      });
    },
    [ActionTypes.HIDE_ALERT](state, action) {
      return immutable(state, {
        alerts: { $set: state.alerts.filter(d => d.id !== action.payload.id) },
      });
    },
    [ActionTypes.DETECT_MOBILE](state, action) {
      const { payload } = action;
      return { ...state, ...payload };
    },
    [ActionTypes.FILTER_ITEMS](state, action) {
      const { payload } = action;
      const view = payload.tag || payload.category || payload.search ? 'all' : (state.filter.viewBefore || state.filter.view);
      const viewBefore = (payload.tag || payload.category || payload.search) && state.filter.view !== 'all' ? state.filter.view : '';
      let filter;

      if (typeof payload.showTags !== 'undefined' || payload.columns) {
        filter = { ...state.filter, ...payload };
      } else {
        filter = {
          ...appState.filter,
          columns: state.filter.columns,
          view,
          viewBefore,
          ...payload,
        };
      }

      return { ...state, filter };
    },
  }),
};
