// @flow

/**
 * @module Sagas/Firebase
 * @desc Firebase
 */

import { all, call, put, takeEvery } from 'redux-saga/effects';

import { ActionTypes } from 'constants/index';
import {
  connectLogos,
  connectTags,
  connectCategories,
  connectRoles,
  updateItems,
  updateTaxonomies,
} from 'utils/firebaseClient';

/**
 * Init Logos
 */
export function* initLogos() {
  try {
    yield call(connectLogos);
    yield put({ type: ActionTypes.CONNECT_LOGOS_SUCCESS });
  } catch (error) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CONNECT_LOGOS_FAILURE,
      payload: { error },
    });
  }
}

/**
 * Init Tags
 */
export function* initTags() {
  try {
    yield call(connectTags);
    yield put({ type: ActionTypes.CONNECT_TAGS_SUCCESS });
  } catch (error) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CONNECT_TAGS_FAILURE,
      payload: { error },
    });
  }
}

/**
 * Init Categories
 */
export function* initCategories() {
  try {
    yield call(connectCategories);
    yield put({ type: ActionTypes.CONNECT_CATEGORIES_SUCCESS });
  } catch (error) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CONNECT_CATEGORIES_FAILURE,
      payload: { error },
    });
  }
}

/**
 * Init Firebase
 */
export function* initFirebase() {
  try {
    yield all([
      call(initLogos),
      call(initTags),
      call(initCategories),
      call(connectRoles),
    ]);
    yield put({
      type: ActionTypes.CONNECT_FIREBASE_SUCCESS,
    });
  } catch (error) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.CONNECT_FIREBASE_FAILURE,
      payload: { error },
    });
  }
}

/**
 * Update Logo
 * @param {Object} action
 */
export function* updateLogos(action) {
  try {
    yield call(updateItems, action.payload);
    yield put({
      type: ActionTypes.UPDATE_LOGOS_SUCCESS,
      meta: {
        updated: action.meta.updated,
      },
    });
    yield call(action.meta.callback);
  } catch (error) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.UPDATE_LOGOS_FAILURE,
      payload: { error },
    });
  }
}

/**
 * Update Logo
 * @param {Object} action
 */
export function* updateTaxonomiesSaga(action) {
  try {
    yield call(updateTaxonomies, action.payload);
    yield put({
      type: ActionTypes.UPDATE_TAXONOMIES_SUCCESS,
      meta: {
        updated: action.meta.updated,
      },
    });
    if (typeof action.meta.callback === 'function') {
      yield call(action.meta.callback);
    }
  } catch (error) {
    /* istanbul ignore next */
    yield put({
      type: ActionTypes.UPDATE_TAXONOMIES_FAILURE,
      payload: { error },
    });
  }
}

function* watchInitLogos() {
  yield takeEvery(ActionTypes.CONNECT_LOGOS_REQUEST, initLogos);
}

function* watchInitTags() {
  yield takeEvery(ActionTypes.CONNECT_TAGS_REQUEST, initTags);
}

function* watchInitCategories() {
  yield takeEvery(ActionTypes.CONNECT_CATEGORIES_REQUEST, initCategories);
}

function* watchUpdateLogo() {
  yield takeEvery(ActionTypes.UPDATE_LOGOS_REQUEST, updateLogos);
}

function* watchUpdateTaxonomies() {
  yield takeEvery(ActionTypes.UPDATE_TAXONOMIES_REQUEST, updateTaxonomiesSaga);
}

function* watchInitFirebase() {
  yield takeEvery(ActionTypes.CONNECT_FIREBASE_REQUEST, initFirebase);
}

/**
 * Firebase Sagas
 */
export default function* firebase() {
  yield all([
    watchInitFirebase(),
    watchInitLogos(),
    watchInitTags(),
    watchInitCategories(),
    watchUpdateLogo(),
    watchUpdateTaxonomies(),
  ]);
}
