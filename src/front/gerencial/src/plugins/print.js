import VueHtmlToPaper from 'vue-html-to-paper'

const options = {
    name: '_black',
    specs: [
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        "https://cdn.jsdelivr.net/npm/quasar-framework@0.17.8/dist/umd/quasar.mat.min.css",
        "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
    ]
}

export default ({Vue}) => Vue.use(VueHtmlToPaper, options)