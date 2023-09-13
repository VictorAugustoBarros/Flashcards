<template>
  <v-alert
    v-if="visible"
    :type="type"
    :title="title"
    style="position: absolute;"
    class="fixed-alert"
    max-width="300px"
    max-height="100px"
    closable
  >
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  name: "AlertBox",
  data() {
    return {
      visible: false,
      title: "",
      message: "",
      type: "",
    };
  },
  created() {
    this.emitter.on("alertBox", (alert) => {
      this.title = alert.title;
      this.message = alert.message;
      this.type = alert.type;
      this.visible = true;

      setTimeout(() => {
        this.visible = false;
      }, 3000);
    });
  },
};
</script>

<style>
.fixed-alert {
  top: 20px;
  right: 20px;
  z-index: 9999;
}
</style>
