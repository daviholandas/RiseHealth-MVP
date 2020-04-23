import { date } from 'quasar'

let dateBr = date.formatDate(new Date(), `dddd, DD  MMMM YYYY`,{
    dayNames:['Domingo','Segunda','Terça','Quarta', 'Quinta','Sexta','Sabado'],
    monthNames:['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembor','Dezembro']
 })

export default ({ Vue }) => Vue.prototype.$date = dateBr

export { dateBr }