const LOGIN = 'LOGIN'

const initialState = {
    username: null,
    password: null
}

const AuthReducer = (state = initialState, action)=> {
    switch (action.type) {
        case LOGIN:
            return {...state, ...action.data}

        default:
            return state
    }
}

export const LoginAC = (username, password) => ({type:LOGIN, data:{username,password}})