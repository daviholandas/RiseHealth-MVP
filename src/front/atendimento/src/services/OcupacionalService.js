import { http } from './configAxios';

export default {
    async saveFichaAtendimento(ficha){
        return await http.post(`/ocupacional/ficha`, ficha)
    },

    async getFichasOcupacionais(date, colaborador, empresa){
        return await http.get(`/ocupacional/fichas/?date=${date}&nome=${colaborador}&empresa=${empresa}`)
    },

    async chageStatus(fichaID, body){
        return await http.put(`/ocupacional/ficha/${fichaID}`, body)
    },
}