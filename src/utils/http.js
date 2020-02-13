import axios from 'axios'
import * as constants from '../config/constants'
import auth from '../utils/auth'

const requestHandler = (request) => {

  const accessToken = auth.getAccessToken();
  const client = auth.getClientHash();
  const expiry = auth.getExpiry();
  const tokenType = auth.getTokenType();
  const uid = auth.getUid();

  if (accessToken && client && expiry && tokenType && uid) {
    const ACCESS_HEADERS = constants.ACCESS_HEADERS;
    request.headers.common[ACCESS_HEADERS.accessToken] = accessToken;
    request.headers.common[ACCESS_HEADERS.client] = client;
    request.headers.common[ACCESS_HEADERS.expiry] = expiry;
    request.headers.common[ACCESS_HEADERS.tokenType] = tokenType;
    request.headers.common[ACCESS_HEADERS.uid] = uid;
  }

  return request
}

const errorHandler = (error) => {
  return Promise.reject({ ...error })
}

const successHandler = (response) => {

  const ACCESS_HEADERS = constants.ACCESS_HEADERS;
  const accessToken = response.headers[ACCESS_HEADERS.accessToken];
  const client = response.headers[ACCESS_HEADERS.client];
  const expiry = response.headers[ACCESS_HEADERS.expiry];
  const tokenType = response.headers[ACCESS_HEADERS.tokenType];
  const uid = response.headers[ACCESS_HEADERS.uid];

  if (accessToken && client && expiry && tokenType && uid) {
    const rememberStatus = auth.getRemember();
    auth.setAccessToken(accessToken, rememberStatus);
    auth.setClientHash(client, rememberStatus);
    auth.setExpiry(expiry, rememberStatus);
    auth.setTokenType(tokenType, rememberStatus);
    auth.setUid(uid, rememberStatus);
  }
  return response
}

export let http = {};

export const createIntance = () => {
  const instance = axios.create({
    baseURL: `${constants.API_URL}`,
  });
  // Add interceptors
  instance.interceptors.request.use(
    request => requestHandler(request)
  )

  instance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
  )
  http = instance;
}

