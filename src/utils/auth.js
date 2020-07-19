/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'js-cookie'

const TokenKey = 'XXBI-Admin-Token'

export function getToken () {
    return Cookies.get(TokenKey)
}

export function setToken (token) {
    return Cookies.set(TokenKey, token, { expires: 30, path: '' })
}

export function removeToken () {
    return Cookies.remove(TokenKey)
}
