import Vue from 'vue'
import moment from 'moment'

Vue.filter('idade', (value)=>{
    if(!value) return ''
    let mes_atual = new Date().getMonth() + 1
    let dia_atual = new Date().getDate()
    let valoresDate = value.split('/')
    let idade = new Date().getFullYear() - valoresDate[2]
    if(mes_atual < valoresDate[1] || mes_atual == valoresDate[1] && dia_atual < valoresDate[0]){
      idade--
    }
    return idade < 0 ? 0 : idade
  })
  
  Vue.filter('capitalize', (value)=>{
    if (!value) return ''
    value = value.toString()
    let nomes = value.split(' ')
    let Nomes = nomes.map(nome => nome.charAt(0).toUpperCase() + nome.slice(1))
    return Nomes.join(' ')
  })
  
  Vue.filter('data',(value)=>{
    if (!value) return ''
    const [ano, mes, dia] = value.split('-')
    return `${dia}/${mes}/${ano}`
  })
  
  Vue.filter('moeda',(value)=>{
    if(!value) return 0
    let duasCasas = value.toFixed(2)
    return duasCasas.replace('.',',')
  })

  Vue.filter('documento',(value)=>{
    if(!value) return ''
    let documentos = {}
    value.map(documento => documentos = Object.assign(documento))
    return documentos.cpf
  })

  Vue.filter('nomeComposto',(value) => {
    if(!value) return ''
    let nomes = value.split(' ')
    return nomes[0] + " "  + nomes[1]
  })
  

  Vue.filter('dataFormated', (value)=>{
    if(!value) return ''
    return  moment(value).locale('pt-br').format('L')
  })

  Vue.filter('upperCase',(value)=>{
    if(!value) return ''
    return value.toString().toUpperCase()
  })