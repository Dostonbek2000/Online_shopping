const initialState = {
    token: '',
    id: null,
    title: null,
    role: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            const { token, id, title, role } = action.payload;
            return { ...state, token, id, title, role }
        case 'LOGOUT_SUCCESS':
            return initialState;
        default:
            return state;
    }
}

export default authReducer;
