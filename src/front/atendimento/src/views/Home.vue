<template>
<div>
  <v-layout align-center justify-center fill-height>
    <div class="foto">
        <v-img :src='require("@/assets/img/foto1.jpg")' align-center></v-img>
    </div>
  </v-layout>
</div>
</template>

<script>
  export default {
    name:'Home'
  }
</script>

<style >
  .foto{
    width: 50%;
    align-content: center;
    margin-bottom: 15px;
  }
</style>

