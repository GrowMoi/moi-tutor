export const PRODUCTS_URL = process.env.REACT_APP_PRODUCTS_URL || '/#'
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export const ACCESS_TOKEN_KEY = 'moiTutorAccessToken';
export const CLIENT_KEY = 'moiTutorClient';
export const EXPIRY_KEY = 'moiTutorExpiry';
export const TOKEN_TYPE_KEY = 'moiTutorTokenType';
export const UID_KEY = 'moiTutorUid';
export const USER_INFO = 'userInfo';
export const REMEMBER_KEY = 'moiTutorRemember'
export const ACCESS_HEADERS = {
  accessToken: 'access-token',
  client: 'client',
  expiry: 'expiry',
  tokenType: 'token-type',
  uid: 'uid'
}
export const user = {
  role: {
    ADMIN: 'admin',
    TUTOR: 'tutor'
  }
}
