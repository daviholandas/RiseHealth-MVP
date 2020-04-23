const Loading = () => import('../templates/Loading.vue')
export default {
     components: {
         Loading
     },
    data(){
        return{
            componenteGlobal:Loading,
            fichaDialog:false
        }
    },
    methods:{
        $print(elementID,printableID,template){
            this.componenteGlobal = Loading
            this.loadingDialog = true
            this.fichaDialog = true
            this.$store.dispatch('getAtedimentoFicha', elementID)
            setTimeout(() => {
            this.loadingDialog = false
            this.componenteGlobal = template
            }, 3000)
            setTimeout(() => {
                this.$htmlToPaper(printableID)
            }, 4000)
        }
    }
}