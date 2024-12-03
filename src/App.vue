<script setup lang="ts">
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useMessageAlert } from "./store/message.ts"

const messageStore = useMessageAlert()
const { show, message } = storeToRefs(messageStore)
</script>

<template>
  <RouterView />
  <v-snackbar
      v-model="show"
      location="top"
      variant="tonal"
    >
      {{ message }}
    </v-snackbar>
</template>