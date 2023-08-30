<template>
  <v-expansion-panels>
    <v-expansion-panel rounded="True">
      <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
        Novo Card
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row>
          <v-col cols="2">
            <v-autocomplete
              label="Tipo"
              :items="cardTypes"
              variant="outlined"
              v-model="cardTypes[0]"
              disabled="True"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="4">
            <v-text-field
              hide-details
              placeholder="Question"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              hide-details
              placeholder="Answer"
              variant="outlined"
            ></v-text-field>
          </v-col>
          <v-col cols="2" class="center-elements">
            <v-btn prepend-icon="$vuetify" variant="outlined" color="green">
              Criar Card
            </v-btn>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "CreateCardExpander",
  props: {
    cardTypes: {
      type: Array
    }
  }
};
</script>
