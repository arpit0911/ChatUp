<template>
  <q-form @submit="submitForm">
    <q-input
      v-if="tab == 'register'"
      class="q-mb-md"
      outlined
      v-model="dataForm.name"
      type="name"
      label="Name"
    />
    <q-input
      class="q-mb-md"
      outlined
      v-model="dataForm.email"
      type="email"
      label="Email"
    />
    <q-input
      class="q-mb-md"
      outlined
      v-model="dataForm.password"
      type="password"
      label="Password"
    />
    <dev class="row">
      <q-space></q-space>
      <q-btn color="primary" type="submit" :label="tab" />
    </dev>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ["tab"],
  data() {
    return {
      dataForm: {
        name: "",
        email: "arpit@test.com",
        password: "123456",
      },
    };
  },
  methods: {
    ...mapActions('dataState', ['registerUser', 'loginUser']),
    submitForm() {
      if (this.tab == "login") {
        this.loginUser(this.dataForm)

      } else {
        // console.log("Register tab");
        this.registerUser(this.dataForm)
        
      }
    },
  },
};
</script>

<style></style>
