<template>
<div id="print" v-show="true">
    <q-layout>
        <table border="1">
            <thead>
                <th><h1>RELATORIO</h1></th>
            </thead>

        </table>
    </q-layout>
</div>
</template>
<script>
export default {

}
</script>

<style scoped>
    .v-table thead {
        font-size: 1.5rem;
    }
    .v-table tbody tr td {
        font-size: 1.5rem;
    }

    #procedimentos{
        height: 200px;
    }

    #procedimentos h3 {
       margin-top: -92px;
    }
</style>