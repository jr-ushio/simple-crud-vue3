import axios from 'axios'
import path from "../@helpers/environment";

const url = path.url_servidor +'/apitest/'

function listar(page, limit, search = '') {
  return axios.get(url + 'usuarios' + `?page=${page}&limit=${limit}&search=${search}`)
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
