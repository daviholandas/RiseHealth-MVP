<template>
   <q-layout v-show="false" id="printRecibo">
       <q-card>
               <div style="border: solid 1px;">
               <div class="row justify-center">
               <div class="columns">
                 <img class="q-mt-lg" src="~assets/img/folder1.jpg" alt="">
                <h3 class="q-mb-xs q-mx-xl" >Recibo</h3>
               </div>
               </div>
           
               <div>
                    <p  class="q-px-lg" style="font-size:20px;">
                            Eu, <strong>{{profissional._id}}</strong>, recebi do Nucleo Integrado de Fonoaudiologia a importancia de <strong>{{profissional.Comissao | moeda}}  ( {{profissional.Comissao | extenso  }})</strong> 
                            referente aos atendimentos realizados no dia <strong>{{ date | formatDate}}</strong>.
                    </p>
                    <div class="row justify-center">
                            <div class="columns q-mt-xl">
                                    ____________________________________________________
                                        <p style="font-size:10px; margin-left:130px;">{{profissional._id}}</p>
                            </div>
                    </div>
                    <p>1º primeira via</p>
               </div>
               </div>
               <div class="q-mt-xl" style="border: solid 1px;">

                <div class="row justify-center">
                        <div class="columns">
                        <img class="q-mt-lg" src="~assets/img/folder1.jpg" alt="">
                        <h3 class="q-mb-xs q-mx-xl">Recibo</h3>
                        </div>
               </div>
               <div>
                    <p class="q-px-lg" style="font-size:20px;">
                            Eu, <strong>{{profissional._id}}</strong>, recebi do Nucleo Integrado de Fonoaudiologia a importancia de <strong>{{profissional.Comissao | moeda}}  ( {{profissional.Comissao | extenso  }})</strong> 
                            referente aos atendimentos realizados no dia <strong>{{ date | formatDate}}</strong>.
                    </p>
                    <div class="row justify-center">
                            <div class="columns q-mt-xl">
                                     ____________________________________________________
                                        <p style="font-size:10px; margin-left:130px;">{{profissional._id}}</p> 
                           </div>
                    </div>
                    <p>2º primeira via</p>
               </div>
               </div>
           
       </q-card>
   </q-layout>
</template>

<script>
export default {
    props:['profissional', 'date']

}
</script>

<style>
        .teste{
                border: solid 1px;
        }
</style>
