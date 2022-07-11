<template>
  <v-container>
      <v-card
      transition="scroll-y-transition"
      v-for="item in messages"
      :key="item.id"
      class="mb-4 fill-height" 
      width="300" 
      :subtitle="item.displayName"
      :color="item.uid === userChat.uid ? 'primary' : '#5555'"
      :class="item.uid === userChat.uid && 'ml-auto'" 
      :text="item.text"
      align="end"
      >
    </v-card>
  </v-container>
</template>

      <!-- in para objetos y of para array en js -->
<script setup>
import { ref } from "@vue/reactivity";
import { collection, query,  onSnapshot, orderBy } from "firebase/firestore";
import { auth, db } from '../firebase'

const userChat = ref(auth.currentUser)
const messages = ref([])

const q = query(collection(db, "chats"), orderBy('time'));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
        // console.log("Message: ", change.doc.id, change.doc.data()); // gracias al doc.data podemos acceder al data del firebase
        messages.value.push({
          id: change.doc.id,
          ...change.doc.data()// con esto me estoy sacando todos los datos de la base de datos de firebase
        })
    }
 
  });
  
});
</script>

<style scoped>
#scroll{
  scroll-behavior: auto;

}

 
</style>