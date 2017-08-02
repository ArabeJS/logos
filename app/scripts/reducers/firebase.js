import { REHYDRATE } from 'redux-persist/constants';
import { createReducer } from 'utils/helpers';

import { ActionTypes } from 'constants/index';

export const firebaseState = {
  logos: {
    data: [],
    isReady: false,
    running: false,
    updated: '',
  },
  tags: {
    data: [],
    isReady: false,
    running: false,
    updated: '',
  },
  categories: {
    data: [],
    isReady: false,
    running: false,
    updated: '',
  },
  isReady: false,
  rehydrated: false,
  running: false,
  updating: false,
};

export default {
  firebase: createReducer(firebaseState, {
    [REHYDRATE](state, action) {
      return Object.assign({}, state, action.payload.firebase, {
        rehydrated: true,
      });
    },
    [ActionTypes.CONNECT_LOGOS_REQUEST](state) {
      const logos = { ...state.logos, running: true };

      return { ...state, logos };
    },
    [ActionTypes.CONNECT_LOGOS_UPDATE](state, action) {
      const logos = { ...state.logos, ...action.payload, isReady: true };

      return { ...state, logos };
    },
    [ActionTypes.CONNECT_LOGOS_FAILURE](state, action) {
      const logos = { ...state.logos, ...action.payload, isReady: false, running: false };

      return { ...state, logos, isReady: false };
    },
    [ActionTypes.CONNECT_TAGS_REQUEST](state) {
      const tags = { ...state.tags, running: true };

      return { ...state, tags };
    },
    [ActionTypes.CONNECT_TAGS_UPDATE](state, action) {
      const tags = { ...state.tags, ...action.payload, isReady: true };

      return { ...state, tags };
    },
    [ActionTypes.CONNECT_TAGS_FAILURE](state, action) {
      const tags = { ...state.tags, ...action.payload, isReady: false, running: false };

      return { ...state, tags, isReady: false };
    },
    [ActionTypes.CONNECT_CATEGORIES_REQUEST](state) {
      const categories = { ...state.categories, running: true };

      return { ...state, categories };
    },
    [ActionTypes.CONNECT_CATEGORIES_UPDATE](state, action) {
      const categories = { ...state.categories, ...action.payload, isReady: true };

      return { ...state, categories };
    },
    [ActionTypes.CONNECT_CATEGORIES_FAILURE](state, action) {
      const categories = { ...state.categories, ...action.payload, isReady: false, running: false };

      return { ...state, categories, isReady: false };
    },
    [ActionTypes.CONNECT_FIREBASE_REQUEST](state) {
      return { ...state, running: true };
    },
    [ActionTypes.CONNECT_FIREBASE_SUCCESS](state) {
      return { ...state, isReady: true, running: false };
    },
    [ActionTypes.CONNECT_FIREBASE_FAILURE](state) {
      return { ...state, isReady: false, running: false };
    },
    [ActionTypes.UPDATE_TAXONOMIES_REQUEST](state) {
      return { ...state, running: true, updating: true };
    },
    [ActionTypes.UPDATE_TAXONOMIES_SUCCESS](state, action) {
      return {
        ...state,
        running: false,
        updating: false,
        logos: {
          ...state.logos,
          updated: action.meta.updated,
        },
      };
    },
    [ActionTypes.UPDATE_TAXONOMIES_FAILURE](state) {
      return { ...state, running: false, updating: false };
    },
    [ActionTypes.UPDATE_LOGOS_REQUEST](state) {
      return { ...state, running: true, updating: true };
    },
    [ActionTypes.UPDATE_LOGOS_SUCCESS](state, action) {
      return {
        ...state,
        running: false,
        updating: false,
        logos: {
          ...state.logos,
          updated: action.meta.updated,
        },
      };
    },
    [ActionTypes.UPDATE_LOGOS_FAILURE](state) {
      return { ...state, running: false, updating: false };
    },
  }),
};

