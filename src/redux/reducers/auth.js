/* eslint-disable import/no-anonymous-default-export */

const authState = {
    isLogin: null,
    token: '',
    isLoading: false,
    isError: false,
    alertMsg: '',
    level: 0,
    isRoute: false,
    isRegister: null,
    dataBracket: [],
    allBracket: [],
    isWin: null,
    isDelall: null,
    isGenerate: null,
    isGet: null,
    isDelid: null
};

export default (state=authState, action) => {
        switch(action.type){
            case 'AUTH_USER_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Login in ....'
                };
            }
            case 'AUTH_USER_FULFILLED': {
                localStorage.setItem('token', action.payload.data.Token)
                localStorage.setItem('level', action.payload.data.user.level)
                localStorage.setItem('name', action.payload.data.user.username)
                localStorage.setItem('fullname', action.payload.data.user.fullname)
                localStorage.setItem('email', action.payload.data.user.email)
                localStorage.setItem('kode', action.payload.data.user.kode_plant)
                localStorage.setItem('id', action.payload.data.user.id)
                localStorage.setItem('role', action.payload.data.user.role)
                return {
                    ...state,
                    level: action.payload.data.user.level,
                    isLogin: true,
                    isError: false,
                    isLoading: false,
                    token: action.payload.data.Token,
                    alertMsg: 'Login Succesfully'
                };
            }
            case 'AUTH_USER_REJECTED': {
                return {
                    ...state,
                    isLoading: false,
                    isLogin: false,
                    alertMsg: 'Login Failed'
                };
            }
            case 'REGISTER_USER_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Login in ....'
                };
            }
            case 'REGISTER_USER_FULFILLED': {
                return {
                    ...state,
                    isRegister: true,
                    isLoading: false,
                    alertMsg: 'Login Succesfully'
                };
            }
            case 'REGISTER_USER_REJECTED': {
                return {
                    ...state,
                    isLoading: false,
                    isRegister: false,
                    alertMsg: 'Login Failed'
                };
            }
            case 'GEN_BRACKET_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Login in ....'
                };
            }
            case 'GEN_BRACKET_FULFILLED': {
                return {
                    ...state,
                    isGenerate: true,
                    isLoading: false,
                    alertMsg: 'Login Succesfully'
                };
            }
            case 'GEN_BRACKET_REJECTED': {
                return {
                    ...state,
                    isLoading: false,
                    isGenerate: false,
                    alertMsg: 'Login Failed'
                };
            }
            case 'GET_BRACKET_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Login in ....'
                };
            }
            case 'GET_BRACKET_FULFILLED': {
                return {
                    ...state,
                    isGet: true,
                    dataBracket: action.payload.data.result,
                    allBracket: action.payload.data.resultAll,
                    isLoading: false,
                    alertMsg: 'Login Succesfully'
                };
            }
            case 'GET_BRACKET_REJECTED': {
                return {
                    ...state,
                    isLoading: false,
                    isGet: false,
                    alertMsg: 'Login Failed'
                };
            }
            case 'WIN_BRACKET_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Login in ....'
                };
            }
            case 'WIN_BRACKET_FULFILLED': {
                return {
                    ...state,
                    isWin: true,
                    isLoading: false,
                    alertMsg: 'Login Succesfully'
                };
            }
            case 'WIN_BRACKET_REJECTED': {
                return {
                    ...state,
                    isLoading: false,
                    isWin: false,
                    alertMsg: 'Login Failed'
                };
            }
            case 'DELETE_BRACKET_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Login in ....'
                };
            }
            case 'DELETE_BRACKET_FULFILLED': {
                return {
                    ...state,
                    isDelall: true,
                    isLoading: false,
                    alertMsg: 'Login Succesfully'
                };
            }
            case 'DELETE_BRACKET_REJECTED': {
                return {
                    ...state,
                    isLoading: false,
                    isDelall: false,
                    alertMsg: 'Login Failed'
                };
            }
            case 'DELETE_ID_PENDING': {
                return {
                    ...state,
                    isLoading: true,
                    alertMsg: 'Login in ....'
                };
            }
            case 'DELETE_ID_FULFILLED': {
                return {
                    ...state,
                    isDelid: true,
                    isLoading: false,
                    alertMsg: 'Login Succesfully'
                };
            }
            case 'DELETE_ID_REJECTED': {
                return {
                    ...state,
                    isLoading: false,
                    isDelid: false,
                    alertMsg: 'Login Failed'
                };
            }
            case 'SET_TOKEN': {
                return {
                  ...state,
                  token: action.payload.token,
                  isLogin: true,
                }
              }
            case 'LOGOUT': {
                localStorage.removeItem('token')
                localStorage.removeItem('level')
                return {
                    state: undefined
                }
            }
            case 'RESET': {
                return {
                    ...state,
                    isLogin: null,
                    isRoute: false,
                    isWin: null,
                    isDelall: null,
                    isGenerate: null,
                    isGet: null,
                    isRegister: null,
                    isDelid: null
                }
            }
            case 'ROUTE' : {
                return {
                    ...state,
                    isRoute: true
                }
            }
            default: {
                return state;
            }
        }
    }