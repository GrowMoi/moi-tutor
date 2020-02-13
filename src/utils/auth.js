import * as constants from '../config/constants'
import _ from 'lodash';

const parse = JSON.parse;
const stringify = JSON.stringify;

const auth = {

  userIsLoguedIn() {
    const accessToken = auth.getAccessToken();
    const client = auth.getClientHash();
    const expiry = auth.getExpiry();
    const tokenType = auth.getTokenType();
    const uid = auth.getUid();
    const userInfo = auth.getUserInfo();
    const isLoguedIn = (!!accessToken && !!client && !!expiry && !!tokenType && !!uid && !_.isEmpty(userInfo));
    return isLoguedIn;
  },

  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  clearToken() {
    return auth.clear(constants.ACCESS_TOKEN_KEY);
  },

  clearUserInfo() {
    return auth.clear(constants.USER_INFO);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },

  getAccessToken() {
    return auth.get(constants.ACCESS_TOKEN_KEY);
  },

  getClientHash() {
    return auth.get(constants.CLIENT_KEY);
  },

  getExpiry() {
    return auth.get(constants.EXPIRY_KEY);
  },

  getTokenType() {
    return auth.get(constants.TOKEN_TYPE_KEY);
  },

  getUid() {
    return auth.get(constants.UID_KEY);
  },

  getUserInfo() {
    return auth.get(constants.USER_INFO);
  },

  getRemember() {
    return auth.get(constants.REMEMBER_KEY) || false;
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value, key, isLocalStorage) {

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },

  setAccessToken(value = '', isLocalStorage = false) {
    return auth.set(value, constants.ACCESS_TOKEN_KEY, isLocalStorage);
  },

  setClientHash(value = '', isLocalStorage = false) {
    return auth.set(value, constants.CLIENT_KEY, isLocalStorage);
  },

  setExpiry(value = '', isLocalStorage = false) {
    return auth.set(value, constants.EXPIRY_KEY, isLocalStorage);
  },

  setTokenType(value = '', isLocalStorage = false) {
    return auth.set(value, constants.TOKEN_TYPE_KEY, isLocalStorage);
  },

  setUid(value = '', isLocalStorage = false) {
    return auth.set(value, constants.UID_KEY, isLocalStorage);
  },

  setUserInfo(value = '', isLocalStorage = false) {
    return auth.set(value, constants.USER_INFO, isLocalStorage);
  },

  setRemember(value = false) {
    return auth.set(value, constants.REMEMBER_KEY, true);
  }
};

export default auth;
