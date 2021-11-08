import { LOGIN_USER, LOGOUT_USER, ADD_USER } from "./userActions";

const userReducer = (state, action)=> {
    switch (action.type) {
        case ADD_USER:
            return;
        default:
            return state;
    }
};

export default userReducer;
