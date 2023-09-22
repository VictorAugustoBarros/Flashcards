
<template>
  <v-card :elevation="0" color="transparent">
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="end">
      <v-tab value="cards">Cards</v-tab>
      <v-tab value="search"><v-icon icon="mdi-magnify"></v-icon></v-tab>
      <v-tab value="open"><v-icon icon="mdi-close-circle-outline"></v-icon></v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item value="cards">
        <CardExpanderItems />
      </v-window-item>


      <v-window-item value="open" style="height: auto;"></v-window-item>

      <v-window-item value="search" style="height: auto;">
        <v-row justify="center">
          <v-col cols="3">
            <v-text-field class="card-padding" placeholder="Pesquisar Card" variant="outlined"
              append-inner-icon="mdi-magnify"></v-text-field>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-card>
</template>
  
<script>
import CardExpanderItems from "@/components/molecules/CardExpanderItems.vue"

export default {
  name: "CardExpander",
  components: {
    CardExpanderItems
  },
  data() {
    return {
      tab: null
    }
  }
}

</script>