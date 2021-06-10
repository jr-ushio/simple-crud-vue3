import axios from 'axios'

const url = 'http://llega-ya.com/apitest/'
const user = 'usuario'

function login(usuario, password) {
  return axios.post(url + 'login', {usuario, password})
    .then(resp => {
      if (resp.data.codigo === 200) {
        localStorage.setItem(user, JSON.parse(resp.data.data))
      }
      return resp
    })
}

export const authService = {
  login
}
