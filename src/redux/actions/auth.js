/* eslint-disable import/no-anonymous-default-export */
import http from '../../helpers/http'
import qs from 'qs'

export default {
    login: (data) => ({
        type: 'AUTH_USER',
        payload: http().post(`/bracket/login`, qs.stringify(data)),
    }),
    register: (data) => ({
        type: 'REGISTER_USER',
        payload: http().post(`/bracket/register`, qs.stringify(data)),
    }),
    generateBracket: (token, data) => ({
        type: 'GEN_BRACKET',
        payload: http(token).patch(`/bracket/generate`, qs.stringify(data)),
    }),
    getBracket: (token) => ({
        type: 'GET_BRACKET',
        payload: http(token).get(`/bracket/get`),
    }),
    deleteBracket: (token) => ({
        type: 'DELETE_BRACKET',
        payload: http(token).delete(`/bracket/delall`),
    }),
    deleteId: (token, data) => ({
        type: 'DELETE_ID',
        payload: http(token).delete(`/bracket/delpar`, qs.stringify(data)),
    }),
    winBracket: (token, data) => ({
        type: 'WIN_BRACKET',
        payload: http(token).patch(`/bracket/win`, qs.stringify(data)),
    }),
    setToken: (token) => ({
        type: 'SET_TOKEN',
        payload: { token }
    }),
    logout: () => ({
        type: 'LOGOUT',
    }),
    resetError: () => ({
        type: 'RESET'
    }),
    goRoute: () => ({
        type: 'ROUTE'
    })
}
