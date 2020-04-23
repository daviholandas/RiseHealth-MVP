<template>
<v-container fuild>
    <div class="body">
        <header class="el-header noprint">
            <div class="icon-btns">
                <v-btn @click="backToAtendimentos">
                    <v-icon right dark>arrow_back</v-icon>
                    Voltar
                </v-btn>
                <v-btn @click="print">
                    Imprimir
                    <v-icon right dark>print</v-icon>
                </v-btn>
            </div>
        </header>
        <div class="main scrollbar noprint"  v-bind:style="{ height: mainHeight + 'px' }" v-bind:class="{ 'mainLeftM': ifMenuShow, 'aleft': textAlign === 'left','acenter': textAlign === 'center','aright': textAlign === 'right'}">
            <div class="conent" id="aso">
                <div style="position:absolute;top:0.000000px;left:0.000000px">
                <nobr><img height="1123.000000" width="794.000000" :src = "require('@/assets/img/bg000012.jpg')"/></nobr>
                </div>
                <p>
                    <span style="background:#EBEBEB;font-family:Arial;font-size:12.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:94.491943px;left:251.210724px">
                            <nobr>ASO - Atestado de Saúde Ocupacional </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:8.000000px;font-style:normal;font-weight:normal;color:#000000;">
                        <span style="position:absolute;top:116.312172px;left:54.045338px">
                            <nobr>Em cumprimento a NR7 (Portaria 3214/78 do Mtb e Portaria 24/94 da SSST), que regulamenta o art. 168 da consolidação das Leis Trabalhistas, </nobr>
                        </span>
                        <span style="position:absolute;top:132.307373px;left:59.049534px">
                            <nobr>atesto que o trabalhador abaixo identificado foi examinado e submetido aos procedimentos e exames complementares abaixo mencionados. </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:153.094559px;left:65.054581px">
                            <nobr>ADMISSIONAL </nobr>
                        </span>
                    </span>
                </p>
                <p v-if="ficha.periodicidade == 'Admissional'">
                    <span style="font-family:Arial;font-size:14px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:151.5px;left:45.5px">
                            <nobr>X</nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:173.088623px;left:67.056252px">
                            <nobr>MUDANÇA DE FUNÇÃO </nobr>
                        </span>
                    </span>
                </p>
                <p v-if="ficha.periodicidade == 'Mudança de Função'">
                    <span style="font-family:Arial;font-size:14px;font-weight:bold;color:#000000;">
                        <span style="position:relative;top:154.5px;left:45.054581px">
                            <nobr>X</nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:153.094559px;left:417.350098px">
                            <nobr>PERIÓDICO </nobr>
                        </span>
                    </span>
                </p>
                <p v-if="ficha.periodicidade == 'Periódico'">
                    <span style="font-family:Arial;font-size:14px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:151.5px;left:395.5px">
                            <nobr>X</nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:173.088623px;left:417.350098px">
                            <nobr>DEMISSIONAL </nobr>
                        </span>
                    </span>
                </p>
                <p v-if="ficha.periodicidade == 'Demissional'">
                    <span style="font-family:Arial;font-size:14px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:171.5px;left:395.5px">
                            <nobr>X</nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:153.094559px;left:596.500427px">
                            <nobr>RETORNO AO TRABALHO </nobr>
                        </span>
                    </span>
                </p>
                <p v-if="ficha.periodicidade == 'Retorno ao Trabalho'">
                    <span style="font-family:Arial;font-size:14px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:151.5px;left:574.5px">
                            <nobr>X</nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:200px;left:41.034424px">
                            <nobr>Empresa: </nobr>{{ficha.empresa.nome}}
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:200px;left:541.034424px">
                            <nobr>CNPJ: </nobr>{{ficha.empresa.cnpj}}
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:230px;left:41.034424px">
                            <nobr>Funcionário: </nobr> {{ficha.colaborador.nome}}
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:257px;left:41.034424px">
                            <nobr>Setor: </nobr>{{ficha.funcao.nomeSetor}}
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:257px;left:341.034424px">
                            <nobr>Função:  </nobr>{{ficha.funcao.funcoes}}
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:257px;left:541.034424px">
                            <nobr>Tempo de serviço:  </nobr>{{ficha.tempoServico}}
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:284px;left:41.034424px">
                            <nobr>RG:</nobr> {{ficha.colaborador.documentos.rg}}
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:284px;left:241.034424px">
                            <nobr>CPF:</nobr> {{ficha.colaborador.documentos.cpf | toCPF}} 
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:284px;left:460.034424px">
                            <nobr>Dt.Nascimento:</nobr> {{ficha.colaborador.nascimento}}
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:284px;left:660.034424px">
                            <nobr>Idade:</nobr> {{ficha.colaborador.nascimento | idade}}
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:13.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:310.049713px;left:41.034424px">
                            <nobr>Riscos ocupacionais específicos: </nobr>
                        </span>
                    </span>
                </p>
                <div style="position:fixed;left:45.00px;top:284.50px;" >
                    <div style="min-height: 150px;" v-if="!ficha.funcao.riscos.length" >
                     
                    </div>
                    <div v-else>
                        <div  style="position:relative;left:5.00px;top:50.50px;max-width:700px;font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;" v-for="(risco, index) in ficha.funcao.riscos" :key="index">
                            <span style="font-family:Arial;font-size:11px;font-weight:bold;color:#000000;">{{risco.codigo}} - {{risco.agente}} : {{risco.fator}}</span>
                        </div>
                    </div>
                    <div style="position:relative;top:60px; left:-5px;">
                            <span style="font-size:11.9px;font-family:Arial;">
                                ____________________________________________________________________________________________________________
                            </span>
                            <p>
                                <span style="font-family:Arial;font-size:12.000000px;font-weight:bold;color:#000000;">
                                    <span style="position:relative;top:5px;left: 1.034424px">
                                        <nobr>Exames: </nobr>
                                    </span>
                                    <span style="position:relative;top:5px;left:535px">
                                        <nobr>Data de realização </nobr>
                                    </span>
                                </span>
                            </p>
                            <div style="position:relative;left:5.00px;top:1px;max-width:700px;font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;" v-for="(exame, index2) in ficha.exames" :key="index2">
                                <span style="font-family:Arial;font-size:12px;font-weight:bold;color:#000000;">{{exame.nome}}</span>
                                <span style="position:absolute;top:5px;left:593px">
                                    <nobr>____/____/________ </nobr>
                                </span>
                            </div>
                    </div>
                    <p>
                        <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        </span>
                    </p>
                </div>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:916.867737px;left:65.049534px">
                            <nobr>APTO</nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:916.867737px;left:170.049534px">
                            <nobr>INAPTO </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:895.874023px;left:39.032742px">
                            <nobr>O funcionário acima, foi submetido(a) a exame médico, conforme a NR 07, sendo considerado: </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:935.862183px;left:42.035263px">
                            <nobr>Carimbo e assinatura do médico Examinador</nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:9.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:935.862183px;left:522.035263px">
                            <nobr>Examinador Médico Coordenador </nobr>
                        </span>
                    </span>
                </p>
                <div v-if="ficha.empresa.medico">
                    <p>
                        <span style="font-family:Arial;font-size:11px;font-weight:bold;color:#000000;">
                            <span style="position:absolute;top:955.862183px;left:435.035263px">
                                <nobr>{{ficha.empresa.medico.nome}} </nobr>
                            </span>
                        </span>
                    </p>
                    <p>
                        <span style="font-family:Arial;font-size:11px;font-weight:bold;color:#000000;">
                            <span style="position:absolute;top:968.862183px;left:435.035263px">
                                <nobr>{{ficha.empresa.medico.conselho}} </nobr>
                            </span>
                        </span>
                    </p>
                </div>
                <p>
                    <span style="font-family:Arial;font-size:8.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:1003.048828px;left:45.035263px">
                            <nobr>Atenção </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:10.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:1011.633057px;left:136.114197px">
                            <nobr>Estou ciente do resultado do presente exame médico e recebi a 2ª VIA deste ASO. </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:10.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:1030.627319px;left:43.036102px">
                            <nobr>Local e data da LIBERAÇÃO do ASO </nobr>
                        </span>
                        <span style="position:absolute;top:1065.011841px;left:42.035244px">
                            <nobr>
                                <span style="font-size:9.000000px;">Maranguape, ____/____/________ </span>
                            </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:10.000000px;font-weight:bold;color:#000000;">
                        <span style="position:absolute;top:1030.627319px;left:510.428162px">
                            <nobr>Assinatura do(a) funcionário(a) </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:10.000000px;font-style:normal;font-weight:normal;color:#000000;">
                        <span style="position:absolute;top:29.732504px;left:308.484131px">
                            <nobr>NIFO NUCLEO INTEGRADO DE FONOAUDIOLOGIA LTDA </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:10.000000px;font-style:normal;font-weight:normal;color:#000000;">
                        <span style="position:absolute;top:45.727703px;left:431.441956px">
                            <nobr>CNPJ: 02.576.947/0001-70 </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:8.000000px;font-style:normal;font-weight:normal;color:#000000;">
                        <span style="position:absolute;top:62.389404px;left:332.867249px">
                            <nobr>RUA DR. ARGEU BRAGA HERBSTER,615 - MARANGUAPE-CE </nobr>
                        </span>
                    </span>
                </p>
                <p>
                    <span style="font-family:Arial;font-size:8.000000px;font-style:normal;font-weight:normal;color:#000000;">
                        <span style="position:absolute;top:75.185631px;left:420.642181px">
                            <nobr>TELEFONE: (85) 3341-2376 </nobr>
                        </span>
                    </span>
                </p>
            </div>
        </div>
    </div>
</v-container>
</template>

<script>
export default {
    data: function() {
            return {
                asideHeight: 100,
                mainHeight: 800,
                ifMenuShow: true,
                zoomNum: '0.5',
                textAlign: 'center',
            }
        },
        methods: {
            print(){
              this.$htmlToPaper("aso")
            },
            backToAtendimentos(){
                this.$router.push({path:'/ocupacional/atendimentos'})
            }
        },
        computed: {
            ficha(){
                return this.$store.state.aso
            }
        },

}
</script>

<style scoped>
.print {
    display: block !important;
}

.body {
    margin: 0 auto;
    padding: 0;
    font-size: 16px;
    line-height: 1.6em;
    font-family: Raleway, Arial, Helvetica, sans-serif;
}

.el-header {
    background-color:#4DB6AC;
    height: 60px;
    padding-left: 20px;
}

.icon-btns {
    padding-top: 7px;
}

.clear {
    clear: both;
}



.main {
    padding-top: 20px;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    position: relative;
    overflow-y: auto;
}

.conent {
    font-size: 14px;
    line-height: 1.5em;
    width: 794px;
    float: right;
    position: absolute;
    transform-origin: left top;
    -webkit-transform-origin: left top;
    -ms-transform-origin: left top;
    -moz-transform-origin: left top;
    -o-transform-origin: left top;
    transition: all 0.3s;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
}

.scrollbar::-webkit-scrollbar-track
{

    background-color: #F5F5F5;
}

.scrollbar::-webkit-scrollbar
{
    width: 10px;
    background-color: #F5F5F5;
}

.scrollbar::-webkit-scrollbar-thumb
{
 
    background-color: #ccc;
}


.aleft .conent{
    left: 0;
}

.acenter .conent{
    left: 50%;
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
}

.aright .conent{
    left: auto;
    right:0;
}

.mainLeftM {
    margin-left: 260px;
}

.tab-conent {
    padding: 20px 0 20px 20px;
    overflow-y:auto;
    
}



</style>
