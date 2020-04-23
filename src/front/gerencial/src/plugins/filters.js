import { date } from 'quasar'
import extenso from 'extenso'

export default ({Vue}) =>{
    Vue.filter('moeda', value =>{
        if(!value) return 0
        /* let duasCasas = value.toFixed(2)
        return duasCasas.replace('.',',') */
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    })

    Vue.filter('formatDate', value =>{
        return date.formatDate(value, "DD/MM/YYYY")
    })

    Vue.filter('extenso',value =>{
        return extenso(`${value}`,{ mode: 'currency' })
    })
}