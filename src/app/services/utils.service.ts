import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getErrorMessage(error) {
    const response = (error && error.response) || {};
    const data = (response && response.data) || {};
    const errorData = (data && data.errors) ? data.errors : data;
    if (_.isArray(errorData)) {
      return errorData[0];
    }
    if (errorData.error) {
      return errorData.error;
    }
    return error;
  }
}
