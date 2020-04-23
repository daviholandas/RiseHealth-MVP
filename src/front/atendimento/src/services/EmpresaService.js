import { http } from './configAxios';

export default {
    async GetEmpresas(dadoEmpresa){
        return await http.get(`/empresas/ocupacionais/${dadoEmpresa}`)
    }
}