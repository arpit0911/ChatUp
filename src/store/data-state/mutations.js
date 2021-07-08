export function setUserDetails(state, payload) {
  state.userDetails= payload;
}

export function addUser(state, payload){

  // console.log('payload', payload)
  state.users[payload.userId]= payload.userDetails
  // Vue.set(state.users, payload.usrId, payload.usrDetails)
  //
  

  // what to do here ??!!
}

export function updateUser(state, payload){
  Object.assign(state.users[payload.userId], payload.userDetails)
}

export function addMessages(state, payload){
    state.messages[payload.messageId]= payload.messageDetails
    // Object.assign(state.messages[payload.messageId], payload.messageDetails)

}
// export function clearMessages(state){
//   state.messages= {}
// }