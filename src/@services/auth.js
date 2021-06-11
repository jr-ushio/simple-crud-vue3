import axios from 'axios'
import { BehaviorSubject } from 'rxjs';

const url = 'http://llega-ya.com/apitest/'
const user = 'usuario'
const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem(user)));

function login(usuario, password) {
  return axios.post(url + 'login', {usuario, password})
    .then(resp => {
      if (resp.data.codigo === 200) {
        localStorage.setItem(user, JSON.stringify(resp.data.data))
        currentUserSubject.next(user);
      }
      return resp
    })
}

function register(nombres, apellidos, usuario, password) {
  return axios.post(url + 'usuarios', {nombres, apellidos, usuario, password})
    .then(resp => {
      if (resp.data.codigo === 200) {
        localStorage.setItem(user, JSON.stringify(resp.data.data))
        currentUserSubject.next(user);
      }
      return resp
    })
}

export const authService = {
  login,
  register,
  get currentUserValue () { return currentUserSubject.value }
}
