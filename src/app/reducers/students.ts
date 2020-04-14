import { MoiAction } from '../store';
import {
  GET_STUDENTS,
  LOAD_STUDENTS,
  LOAD_STUDENTS_SUCCESS,
  LOAD_STUDENTS_ERROR,
  START_CANCEL_TUTOR_REQUEST,
  CANCEL_TUTOR_REQUEST_SUCCESS,
  CANCEL_TUTOR_REQUEST_ERROR
} from '../actions';
import _ from 'lodash';

export interface Student {
  id: number;
  email: string;
  name: string;
  status: string;
  username: string;
}
export interface StudentsState {
  data: Array<Student>;
  loading: boolean;
  sending: boolean;
}

export default function studentsReducer(state: StudentsState = {} as any, action: MoiAction): StudentsState {
  switch (action.type) {
    case GET_STUDENTS: {
      const newState = {
        ...state,
        data: [
          ...state.data,
          ...action.payload
        ]
      };
      return newState;
    }
    case LOAD_STUDENTS: {
      const newState = {
        ...state,
        loading: true
      };
      return newState;
    }
    case LOAD_STUDENTS_SUCCESS: {
      const newState = {
        ...state,
        loading: false
      };
      return newState;
    }
    case LOAD_STUDENTS_ERROR: {
      const newState = {
        ...state,
        loading: false
      };
      return newState;
    }
    case START_CANCEL_TUTOR_REQUEST: {
      const newState = {
        ...state,
        sending: true
      };
      return newState;
    }
    case CANCEL_TUTOR_REQUEST_ERROR: {
      const newState = {
        ...state,
        sending: false
      };
      return newState;
    }
    case CANCEL_TUTOR_REQUEST_SUCCESS: {
      const students = state.data;
      _.remove(students, (item) => item.id === action.payload.id);
      const newState = {
        ...state,
        data: students,
        sending: false
      };
      return newState;
    }

    default: {
      return state;
    }
  }
}
