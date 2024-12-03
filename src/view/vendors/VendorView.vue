<script setup lang="ts">
  import {ref, onMounted} from "vue";
  import { useRouter, useRoute } from 'vue-router';
  import AdminLayout from "../../layout/AdminLayout.vue"
  import Navbar from "../../components/Navbar.vue"

  interface VendorProps {
    id: string;
    name: string;
    address: string;
  }

  interface UnitProps {
    id: string;
    name: string;
  }

  const router = useRouter();
  const route = useRoute();

  const units: UnitProps[] = ref([])
  const vendors: VendorProps[] = ref([])
  const loading: boolean = ref(true)
  const showSnackBar: boolean = ref(false)
  const msgSnackBar: string = ref("")
  const selectedItem: string = ref("")

  const fetchUnitList = async() => {
    await fetch("http://localhost:3000/api/units")
          .then((res) => res.json())
          .then((data) => {
            units.value = data.units
            loading.value = false
          })
          .catch((error) => {
            msgSnackBar.value = error
            showSnackBar.value = true
            loading.value = false
          })
  }

  const fetchVendorList = async(unit: string) => {
    await fetch("http://localhost:3000/api/vendors?" + new URLSearchParams({unit_id: unit}))
          .then((res) => res.json())
          .then((data) => {
            vendors.value = data.vendors
            loading.value = false
          })
          .catch((error) => {
            msgSnackBar.value = error
            showSnackBar.value = true
            loading.value = false
          })
      
    // to set active select
    selectedItem.value = +unit || ''
  }

  const handleChange = (value) => {
    router.replace({
      query: value ? { ...route.query, unit: value } : null
    });
    fetchVendorList(value || "")
  }

  onMounted(() => {    
    fetchVendorList(route.query.unit || '')
    fetchUnitList()
  })
</script>

<template>
  <AdminLayout>
    <Navbar title="Vendors">
      <div class="w-1/4">
        <v-select
          v-model="selectedItem"
          :items="units"
          item-title="name"
          item-value="id"
          variant="outlined"
          density="compact"
          placeholder="Select unit"
          :clearable="true"
          @update:model-value="handleChange"    
        ></v-select>
      </div>
    </Navbar>
    <div class="px-5 mt-5">
      <div class="flex justify-between items-center">
        <h2>List Vendor</h2>
        <RouterLink to="vendors/create">
          <v-btn variant="tonal" color="blue">Add New</v-btn>
        </RouterLink>
      </div>
      <div v-if="loading" class="w-full h-96 flex justify-center items-center">Fetching Vendor...</div>
      <div v-if="!loading" class="mt-3 overflow-auto">
        <v-table class="border border-slate-200 rounded relative">
          <thead class="bg-slate-50">
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-if="vendors.length"
              v-for="vendor in vendors"
              :key="vendor.id"
            >
              <td>{{ vendor.id }}</td>
              <td>{{ vendor.name }}</td>
              <td>{{ vendor.address }}</td>
            </tr>
            <tr v-else>
              <td colspan="3">
                <div class="w-full flex justify-center">No Data Found</div>
              </td>
            </tr>
          </tbody>
        </v-table>
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

<style>
.v-input__details {
  display: none !important;
}
</style>