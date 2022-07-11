<template>
            <!-- el v-if se cumple solo si el usuario no ha iniciado sesion, muestrate si el user no es false-->
  <v-app id="app">
    <div v-if="userGoogle === false" class="text-center mt-15">
          <v-progress-circular
          :size="50"
          :width="7"
            indeterminate
            color="primary"
          ></v-progress-circular>
    </div>
    <v-app-bar class="bg-pink" v-if="userGoogle !== false" height="50">
      <v-app-bar-title >Chat vuetify </v-app-bar-title>
      <template v-slot:append>
        <v-btn
           v-if="!userGoogle" 
          prepend-icon="mdi-account-arrow-right"
          color="black"
          @click="googleAccess"
          >Acceder</v-btn>

        <v-btn
          v-else
          prepend-icon="mdi-door"
          color="black"
          @click="logOut"
          >Log out</v-btn>
      </template>
    </v-app-bar>
    <v-main app v-if="userGoogle !== false">
       <v-container>
         <Chat v-if="userGoogle"/>
         <div v-else>
           <v-alert
              elevation="4"
              type="warning"
            >Debes iniciar sesion primero</v-alert>
         </div>
       </v-container>
      </v-main>

    <v-footer class="d-flex flex-column" app v-if="userGoogle !== false">
      <FormAdd />
      
    </v-footer>
  </v-app>
  <!--  -->
</template>

<script setup>
import { ref } from "vue";
import { auth } from "./firebase";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from '@firebase/auth'

import Chat from "./components/Chat.vue";
import FormAdd from './components/FormAdd.vue';

const userGoogle = ref(false)

const logOut = async() => {
    await signOut(auth)
}

const googleAccess = async( ) => {
  try {
    const provider = new GoogleAuthProvider()
    const { user } =  await signInWithPopup(auth, provider)
    // console.log(user);


  } catch (error) {
    console.log(error);
  }
}
// const icons = ref([
//         'mdi-facebook',
//         'mdi-twitter',
//         'mdi-linkedin',
//         'mdi-instagram',
//       ],)


onAuthStateChanged(auth, (user) => {
   console.log(user);
    userGoogle.value = user
  
 })
 //se esta ejecutando este watcher, esta queriendo decir
 // que si existe una sesion activa, me trae la informacion del usuario


//todo lo q este dentro del ref, se accede mediante value
</script>
