import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessageAlert = defineStore("message", () => {
  const show = ref(false);
  const message = ref("");
  const onShow = (msg: any) => ((show.value = true), (message.value = msg));
  const onHidden = () => ((show.value = false), (message.value = ""));

  return { show, message, onShow, onHidden };
});
