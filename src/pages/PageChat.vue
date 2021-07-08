<template>
  <q-page class="flex column">
    <q-banner inline-actions class="text-center bg-grey-5">
      User Offline
    </q-banner>
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="message in messages"
        :key="message.text"
        :name="message.from"
        :text="[message.text]"
        :sent="message.from === 'me' ? true : false"
      />
    </div>
  </q-page>

  <q-footer elevated>
    <q-toolbar>
      <q-input
        @keyup.enter="sendMessage"
        v-model="newMessage"
        class="full-width"
        bg-color="white"
        outlined
        rounded
        label="Message"
        dense
      >
        <template v-slot:after>
          <q-btn
            @click="sendMessage"
            color="white"
            round
            dense
            flat
            icon="send"
          />
        </template>
      </q-input>
    </q-toolbar>
  </q-footer>
</template>

<script>
// import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      newMessage: "",
    };
  },

  computed: {
    ...mapState("dataState", ["messages"]),
  },
  methods: {
    ...mapActions("dataState", [
      "firebaseGetMessages",
      "firebaseStopGettingMessages",
    ]),
    sendMessage() {
      // console.log("submit action");
      this.messages.push({
        text: this.newMessage,
        from: "me",
      });
      this.newMessage = "";
    },
  },
  mounted() {
    // console.log(this.$route.params.otherUserId)
    this.firebaseGetMessages(this.$route.params.otherUserId);
    // this.firebaseStopGettingMessages();
    
  },

  destroyed() {
    // console.log("destroyed");
    this.firebaseStopGettingMessages();
  }
};
</script>
