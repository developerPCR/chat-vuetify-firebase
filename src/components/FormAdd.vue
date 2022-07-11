<template>
    <v-form class="w-100" @submit.prevent="sendMessage"> 
    <!-- con este submit evito el preventdefault de js y de paso si le doy enter envia el mensaje -->
              <v-text-field
                label="Type here!"
                variant="outlined"
                loading
                outlined
                append-icon="mdi-send"
                hide-details
                clearable
                @click:append="sendMessage"
                v-model="message"
              ></v-text-field>
    </v-form>
      <!-- <v-input
    :success-messages="['Success']"
    :messages="messages"
  >
    Input
  </v-input> -->
</template>

<script setup>
import { addDoc, collection } from "@firebase/firestore";
import { auth, db } from '../firebase'
import { ref } from "@vue/reactivity";

  // const messages = ref(['hola mundo', 'asdasdas','asdasdas'])

const message = ref('')

const sendMessage = async() => {
    console.log('enviando mensaje' + message.value);

    try {
      await addDoc(collection(db, 'chats'),{
          text: message.value,
          time: Date.now(),
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName
          //en firebase podemos acceder al auth, este currentuser nos trae la sesion actiba del usuario que actualmente esta en mi sitio
          //este current user es el objeto user que mande con el console.log
          //con esto estamos empujando un documento que se va registrar en nuestra base de datos
      })
    } catch (error) {
      console.log(error);
    }
    message.value = "" //con esto luego limpio el input

   
}

// const enter = () => {
//     console.log('enviando mensaje ' + message.value);

// }
// todos los ref que yo use tienen que ser accedidos con .value
// solo en script, en templates no es necesario
</script>