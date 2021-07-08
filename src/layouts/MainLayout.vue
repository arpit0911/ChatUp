<template>
  <q-layout>
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/Chat')"
          icon="arrow_back"
          flat
          class="absolute-left q-pl-md"
          @click="$router.go(-1)"
          dense
          label="Back"
        />
        <q-toolbar-title class="absolute-center"> {{ title }} </q-toolbar-title>
        <q-btn
          v-if="!userDetails.userId"
          class="absolute-right q-pr-md"
          icon="login"
          flat
          no-caps
          to="/Auth"
          dense
          label="Login"
        />
        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-md"
          icon="logout"
          flat
          no-caps
          dense
          >
          Logout {{userDetails.name}}
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { defineComponent } from "vue";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState('dataState', ['userDetails']),
    title() {
      let currentPath = this.$route.fullPath;
      if (currentPath == "/") return "ChatUp";
      else if (currentPath == "/Chat") return "Chat";
      else if (currentPath == "/Auth") return "Login";
    },
  },
methods:{
  ...mapActions('dataState',[ 'logoutUser'])
}

};
</script>
