import { firebaseAuth, firebaseDb } from "src/boot/firebase";
// import state from "./state";
// let messagesRef;

export function registerUser({}, payload) {
  console.log("payload", payload);
  firebaseAuth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then((response) => {
      let userId = firebaseAuth.currentUser.uid;
      firebaseDb.ref("users/" + userId).set({
        name: payload.name,
        email: payload.email,
        online: true,
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function loginUser({}, payload) {
  // console.log("payload", payload);
  firebaseAuth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function logoutUser() {
  firebaseAuth.signOut();
}

export function handleAuthStateChanged({ commit, dispatch, state }) {
  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      let userId = firebaseAuth.currentUser.uid;
      firebaseDb.ref("users/" + userId).once("value", (snapshot) => {
        //   console.log('snapshot' , snapshot)
        let userDetails = snapshot.val();
        //   console.log('userDetails', userDetails)

        commit("setUserDetails", {
          name: userDetails.name,
          email: userDetails.email,
          userId: userId,
        });
        //   console.log('userName', userDetails)
      });

      dispatch("firebaseUpdateUser", {
        userId: userId,
        updates: {
          online: true,
        },
      });

      dispatch("firebaseGetUsers");

      this.$router.push("/");
    } else {
      //user logged out
      dispatch("firebaseUpdateUser", {
        userId: state.userDetails.userId,
        updates: {
          online: false,
        },
      });
      commit("setUserDetails", {});
      this.$router.replace("/Auth");
    }
  });
}

export function firebaseUpdateUser({}, payload) {
  if (payload.userId) {
    firebaseDb.ref("users/" + payload.userId).update(payload.updates);
  }
}

export function firebaseGetUsers({ commit }) {
  firebaseDb.ref("users").on("child_added", (snapshot) => {
    let userDetails = snapshot.val();
    let userId = snapshot.key;

    commit("addUser", {
      userId,
      userDetails,
    });
  });

  firebaseDb.ref("users").on("child_changed", (snapshot) => {
    let userDetails = snapshot.val();
    let userId = snapshot.key;

    commit("updateUser", {
      userId,
      userDetails,
    });
  });
}

export function firebaseGetMessages({ commit, state }, otherUserId) {
  // console.log('OtherUser', otherUserId)
  let userId = state.userDetails.userId;
  // messagesRef = firebaseDb.ref("chats/" + userId + "/" + otherUserId);
  firebaseDb
    .ref("chats/" + userId + "/" + otherUserId)
    .on("child_added", (snapshot) => {
      let messageDetails = snapshot.val();
      let messageId = snapshot.key;

      commit("addMessages", {
        messageId,
        messageDetails,
      });
      // console.log('messageDetails' , messageDetails);
      // console.log('messageId' , messageId);
    });
}

export function firebaseStopGettingMessages() {
  console.log("stop getting Messages");
  // if (messagesRef) {
  //   messagesRef.off("child_added");
  //   commit('clearMessages')
  // }
}
