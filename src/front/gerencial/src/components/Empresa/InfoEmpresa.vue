<template>
    <div>
        <q-card>
            <q-card-main>
                <h4 class="q-ma-none">Exames Ocupacionais:</h4>
                <q-card-separator />
                <q-list separator dense class="q-mt-lg">
                    <q-list-header class="row justify-between">
                    <span>Exames</span> <span class="q-mr-md">Valor</span>
                    </q-list-header>
                    <q-item-separator />
                    <q-item  v-for="(exame, index) in empresa.examesOcupacionais" :key="index">
                        <q-item-main >
                            {{exame.nome}}
                        </q-item-main>
                        <q-item-side >
                            {{exame.valor | moeda}}
                        </q-item-side>
                        <q-item-separator />
                    </q-item>
                </q-list>
                <h4 class="q-mb-none">Contatos:</h4>
                <q-card-separator />
                 <q-list separator dense class="q-mt-lg">
                    <q-list-header class="row justify-between">
                    <span>Nome</span> <span class="q-mr-xl">Cargo</span> <span>E-mail</span> <span class="q-mr-xl">Telefone</span>
                    </q-list-header>
                    <q-item-separator />
                    <q-item  v-for="(contato, index) in empresa.responsaveis" :key="index" class="info">
                        <q-item-side style="font-size:0.7rem;">
                           {{contato.nome}}
                        </q-item-side>
                        <q-item-side style="margin-left:280px; position:absolute;">
                            {{contato.cargo}}
                        </q-item-side>
                        <q-item-side style="margin-left:600px; position:absolute">
                            {{contato.email}}
                        </q-item-side>
                        <q-item-side style="margin-left:900px; position:absolute;" >
                            {{contato.telefone}}
                        </q-item-side>
                        <q-item-separator />
                    </q-item>
                </q-list>

            </q-card-main>
        </q-card>

    </div>
</template>

<script>
export default {
    props:['empresa']

}
</script>

<style>
.info {
    font-size: 0.7rem;
}

</style>
