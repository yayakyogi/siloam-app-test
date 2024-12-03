<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"
import { storeToRefs } from 'pinia'
import { useMessageAlert } from "../store/message.ts"
 
const messageStore = useMessageAlert()
const router = useRouter();
const username = ref("")
const password = ref("")
const loading = ref(false);

const { onShow, onHidden } = messageStore
  
const submit = async() => {
  loading.value = true;

  const payload = {
    username: username.value,
    password: password.value
  }

  await fetch('http://localhost:3000/api/auth/login', {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(payload)
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      onShow(`Welcome ${data.user.username}`)
      router.push("/admin")
      localStorage.setItem('user', JSON.stringify(data.user))
    } else {
      onShow(data.error)
    }
    
    loading.value = false;
  })
  .catch((error) => {
    onShow(error)
    loading.value = false;
  })
}

onMounted(() => {
  const user = localStorage.getItem('user')

  if(user) {
    router.push("/admin")
  }
})
</script>

<template>
  <div class="h-screen flex flex-col justify-center items-center">
    <v-form
      v-model="valid"
      @submit.prevent="submit"
      class="w-1/4 border border-slate-200 rounded"
    >
      <v-container>
        <h1 class="text-2xl mb-5">Login</h1>
        <v-text-field
          v-model:model-value="username"
          label="Username"
          class="mb-3"
          variant="outlined"
          required
        ></v-text-field>
        <v-text-field
          v-model:model-value="password"
          label="Password"
          type="password"
          class="mb-5"
          variant="outlined"
          required
        ></v-text-field>
        <v-btn
          :loading="loading"
          text="Login"
          type="submit"
          variant="elevated"
          color="blue"
          size="large"
          block
        ></v-btn>
      </v-container>
    </v-form>
  </div>
</template>
