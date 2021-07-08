<template>
  <router-view />
</template>
<script>
// import { defineComponent } from 'vue';
import { mapActions } from 'vuex';


export default {
  name: 'App',
  methods:{
  ...mapActions('dataState', ['handleAuthStateChanged'])

  },

  mounted(){
    this.handleAuthStateChanged();
    
  }
}
</script>
