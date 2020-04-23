import Swal from 'sweetalert2'

export default Swal.install = (Vue) =>{
    Vue.prototype.$swal = Swal
}

