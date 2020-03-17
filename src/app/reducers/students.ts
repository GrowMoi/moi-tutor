import { MoiAction } from '../store';
import { GET_STUDENTS, LOAD_STUDENTS, LOAD_STUDENTS_SUCCESS, LOAD_STUDENTS_ERROR } from '../actions';

interface Student {
  id: number;
  email: string;
  name: string;
  status: string;
  username: string;
}
export interface StudentsState {
  data: Array<Student>;
  loading: boolean;
}

export default function studentsReducer(state: StudentsState = {} as any, action: MoiAction): StudentsState {
  switch (action.type) {
    case GET_STUDENTS: {
      const newState = {
        ...state,
        data: {
          ...state.data,
          ...action.payload
        }
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
    default: {
      return state;
    }
  }
}
