<template>
  <v-container>
    <v-row class="center-Elements-Flex" style="height: 90vh">
      <v-col cols="6">
        <v-card
          variant="outlined"
          style="border-color: white"
          :title="title"
          :text="description"
        >
          <v-card-actions>
            <router-link to="/register">
              <Button variant="text" text="Register" color="blue" />
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
      
      <v-col cols="6">
        <v-img
          class="bg-white"
          width="400px"
          :aspect-ratio="1"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
          cover
        ></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Button from "@/components/atoms/Button.vue";

export default {
  name: "HowItWorksPage",
  components: {
    Button,
  },
  data() {
    return {
      title: "Lorem ipsum",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eros id turpis sagittis, ut consequat ipsum sodales. Integer lacus urna, mollis eget posuere sit amet, mollis sed enim. Aenean imperdiet commodo risus nec ullamcorper. Vivamus lacinia urna elit, ac hendrerit risus bibendum id. Mauris vitae convallis neque. Sed ullamcorper arcu quis purus cursus, ac ultrices felis tristique. Nam eget ipsum nec neque suscipit mattis quis et arcu. Cras accumsan sem massa, sit amet lacinia turpis tristique sit amet. Quisque scelerisque neque ut ipsum mattis, quis congue massa pulvinar. Aliquam in mauris elit. Nunc ornare euismod viverra.",
    };
  },
};
</script>
