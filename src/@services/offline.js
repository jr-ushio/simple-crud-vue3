import axios from 'axios'

const url = 'https://miniback.llega-ya.com/apitest/offline/'

function listarOperacionesSincronizar() {
    return axios.get(url + 'operaciones')
}

function sincronizarManual() {
    return axios.get(url + 'sincronizar/manual')
}

export const offlineService = {
    listarOperacionesSincronizar,
    sincronizarManual
}
