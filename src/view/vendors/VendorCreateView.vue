<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from 'vue-router';
  import AdminLayout from "../../layout/AdminLayout.vue"
  import Navbar from "../../components/Navbar.vue"
  import { storeToRefs } from 'pinia'
  import { useMessageAlert } from "../../store/message.ts"
 
  const messageStore = useMessageAlert()
  const router = useRouter()

  const { onShow } = messageStore

  const units: UnitProps[] = ref([])
  const vendors: VendorProps[] = ref([])
  const loading: boolean = ref(false)
  const showSnackBar: boolean = ref(false)
  const msgSnackBar: string = ref("")
  const selectedItem: string = ref("")
  const name: string = ref("")
  const address: string = ref("")

  const fetchUnitList = async() => {
    await fetch("http://localhost:3000/api/units")
          .then((res) => res.json())
          .then((data) => {
            units.value = data.units
            loading.value = false
          })
          .catch((error) => {
            onShow(error)
            loading.value = false
          })
  }

  const submit = async() => {
    const payload = {
      unit_id: selectedItem.value,
      name: name.value,
      address: address.value
    }

    await fetch('http://localhost:3000/api/vendors', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.success) {
        onShow("Vendor created successfully")
        router.push("/admin/vendors")
      } else {
        onShow(data.error)
      }
    })
    .catch((error) => {
      showSnackBar.value = true
      msgSnackBar.value = error
    })
  }

  onMounted(() => {
    fetchUnitList()
  })
</script>

<template>
  <AdminLayout>
    <Navbar title="Vendor" />
    <div class="px-5 mt-5">
      <div class="flex justify-between items-center">
        <h2>Create Vendor</h2>
      </div>
      <div class="mt-3">
        <v-form 
          v-model="valid"
          @submit.prevent="submit"
          class="w-1/4"
        >
          <v-select
            v-model="selectedItem"
            :items="units"
            item-title="name"
            item-value="id"
            variant="outlined"
            label="Select Unit"
            placeholder="Select unit"
            :clearable="true"
            @update:model-value="handleChange"    
          ></v-select>
          <v-text-field
            v-model:model-value="name"
            label="Name"
            class="mt-5"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            v-model:model-value="address"
            label="Address"
            class="my-5"
            variant="outlined"
            required
          ></v-text-field>
          <v-btn
            :loading="loading"
            text="Save"
            type="submit"
            variant="elevated"
            color="blue"
            size="large"
            block
          ></v-btn>
        </v-form>
      </div>
    </div>

    <v-snackbar
      v-model="showSnackBar"
      location="top"
      variant="tonal"
      timeout="3000"
    >
      {{ msgSnackBar }}
    </v-snackbar>
  </AdminLayout>
</template>