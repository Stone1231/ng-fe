import { UserActions, UserActionTypes } from "./user.actions";
import { User, Dept, Proj, Item } from "@app/models";

export interface UserState {
  row: User;
  rows: Array<User>;
  depts: Array<Dept>;
  projs: Array<Proj>;
  keyWord: string;
  vType: number;
}

export const initialUserState: UserState = {
  row: undefined,
  rows: new Array<User>(),
  depts: new Array<Dept>(),
  projs: new Array<Proj>(),
  keyWord: "",
  vType: 0,
};

export function userReducer(
  state = initialUserState,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.LoadListSuccess: {
      return {
        ...state,
        rows: action.payload.users,
        vType: 0,
      };
    }
    case UserActionTypes.LoadSuccess: {
      return {
        ...state,
        row: action.payload.user,
        vType: 1,
      };
    }
    case UserActionTypes.QueryKeyWord: {
      return {
        ...state,
        keyWord: action.payload.keyWord,
      };
    }
    case UserActionTypes.BackList: {
      return {
        ...state,
        vType: 0,
      };
    }
    case UserActionTypes.CreateSuccess:
    case UserActionTypes.UpdateSuccess:
    case UserActionTypes.RemoveSuccess: {
      return {
        ...state,
        vType: 0,
      };
    }
    default:
      return state;
  }
}
