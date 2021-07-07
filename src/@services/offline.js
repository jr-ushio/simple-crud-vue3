import axios from 'axios'

const url = 'https://localhost/apitest/offline/'

function listarOperacionesTotales(page, limit, search = '') {
  return axios.get(url + 'operaciones' + `?page=${page}&limit=${limit}&search=${search}`)
}

function listarOperacionesSincronizar() {
    return axios.get(url + 'operaciones')
}

function sincronizarManual(operaciones) {
    return axios.post(url + 'sincronizar/manual', operaciones)
      .then(resp => {
        return resp
      })
}

export const offlineService = {
    listarOperacionesTotales,
    listarOperacionesSincronizar,
    sincronizarManual
}