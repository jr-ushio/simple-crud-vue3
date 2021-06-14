import axios from 'axios'

const url = 'http://llega-ya.com/apitest/'

function listar(page, limit) {
  return axios.get(url + 'usuarios' + `?page=${page}&limit=${limit}`)
}

function show(id) {
  return axios.get(url + 'usuarios' + `/${id}`)
}
function update(id, nombres, apellidos, usuario, password) {
  return axios.put(url + 'usuarios' + `/${id}`, {nombres, apellidos, usuario, password})
}

function eliminar(id) {
  return axios.delete(url+'usuarios'+`/${id}`);
}

export const usuarioService = {
  listar,
  update,
  show,
  eliminar
}
