import axios from 'axios'

export default class UsuarioService{
    url = 'http://llega-ya.com/apitest/'
    user = 'usuario'

    getListar(page, limit){
        const response = axios.get(this.url+'usuarios?limit='+limit+'page='+page);
        return response;

    }

}