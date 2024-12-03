<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeRoute = ref<string>(router.currentRoute.value.matched[0].path) // set default active route when first load

const routes = [
  { path: "/admin", title: "Dashboard", icon: "$dashboard" },
  { path: "/admin/vendors", title: "Vendor", icon: "$account" }
]

// to set active route when changed
router.afterEach((to) => (activeRoute.value = to.matched[0].path))

const onLogout = () => {
  localStorage.clear()
  router.push("/login")
}

onMounted(() => {
  const user = localStorage.getItem('user')

  if(!user) {
    router.push("/login")
  }
})
</script>

<template>
  <div class="w-full h-screen flex">
    <div class="w-56 h-full z-20 fixed flex flex-col justify-between shadow-lg py-3">
      <div class="flex-1">
        <div v-for="route in routes" v-bind:key="route.path" class="">
          <RouterLink :to="route.path">
            <div class="p-3 mb-1 hover:bg-slate-100">
              <v-icon :icon="route.icon" class="mr-3" />
              <span>{{ route.title }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="px-2">
        <v-btn block variant="tonal" color="red" @click="onLogout()">Logout</v-btn>
      </div>
    </div>
    <div class="flex-1 ml-56">
      <slot></slot>
      <div class="mt-4"></div>
    </div>
  </div>
</template>
