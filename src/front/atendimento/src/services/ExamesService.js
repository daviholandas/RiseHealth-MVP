import { http } from './configAxios';

export default {
    async getCategoryExames(categoria){
        return await http.get(`common/exames/${categoria}`)  
    }
}