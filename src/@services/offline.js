import axios from 'axios'
import path from "../@helpers/environment";

const url = path.url_offline +'/apitest/'

function listarOperacionesSincronizar() {
    return axios.get(url + 'offline/operaciones')
}

function sincronizarManual() {
    return axios.get(url + 'offline/sincronizar/manual')
}

export const offlineService = {
    listarOperacionesSincronizar,
    sincronizarManual
}
