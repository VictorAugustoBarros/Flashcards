<template>
  <v-container>
    <v-row style="height: 90vh">
      <v-col cols="6" class="center-Elements-Flex">
        <v-card
          variant="outlined"
          style="border-color: white"
          :title="product.title"
          :text="product.description"
        >
          <v-card-actions>
            <router-link to="/register">
              <Button variant="text" text="Register" color="blue" />
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="6" class="center-Elements-Flex">
        <v-card
          variant="outlined"
          style="border-color: white"
          class="mx-auto"
          width="5002"
        >
          <v-img
            :width="400"
            aspect-ratio="1/1"
            src="user.jpg"
            cover
            class="text-white"
          ></v-img>

          <v-card-title> {{ dev.title }} </v-card-title>

          <v-card-subtitle> {{ dev.description }} </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      product: {
        title: "Lorem ipsum",
        description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eros id turpis sagittis, ut consequat ipsum sodales. Integer lacus urna, mollis eget posuere sit amet, mollis sed enim. Aenean imperdiet commodo risus nec ullamcorper. Vivamus lacinia urna elit, ac hendrerit risus bibendum id. Mauris vitae convallis neque. Sed ullamcorper arcu quis purus cursus, ac ultrices felis tristique. Nam eget ipsum nec neque suscipit mattis quis et arcu. Cras accumsan sem massa, sit amet lacinia turpis tristique sit amet. Quisque scelerisque neque ut ipsum mattis, quis congue massa pulvinar. Aliquam in mauris elit. Nunc ornare euismod viverra.",
      },
      dev: {
        title: "El robô",
        description: "Amigo de infância do ChatGPT",
      },
    };
  },
};
</script>
