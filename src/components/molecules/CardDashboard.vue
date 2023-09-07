<template>
  <div style="height: 150px; width: 200px; background-color: lightblue;border: 1px;border-radius: 30px;padding: 15px;">
    <div>
      <v-icon :icon="icon"></v-icon>
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        background-color: '{{ color }}'
      "
    >
      <div>
        {{ text }}
      </div>
      <div>
        <h1 :style="'font-size: ' + fontSize + 'px;'">{{ count }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardDashboard",
  props: {
    text: String,
    icon: String,
    cardSize: Int16Array,
    color: String,
    count: {
      type: Int16Array,
      default: 0,
    },
    fontSize: {
      type: Int16Array,
    },
  },
};
</script>
