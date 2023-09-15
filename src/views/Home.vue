<template>
  <v-row justify="center" style="height: 100%;">
    <v-sheet rounded="xl" width="95%">
      <div style="height: 100%;padding-top: 50px;">
        <v-row>
          <v-col cols="3">
            <CardDashboard text="Decks" icon="mdi-cards" count="10" />
          </v-col>
          <v-col cols="3">
            <CardDashboard text="SubDecks" icon="mdi-cards" />
          </v-col>
          <v-col cols="3">
            <CardDashboard text="Card" icon="mdi-cards-playing-diamond" />
          </v-col>
          <v-col cols="3">
            <CardDashboard text="Pendentes" icon="mdi-book-alphabet" color="red" />
          </v-col>
        </v-row>
        <v-row style="padding-top: 100px">
          <v-col cols="1" />
          <v-col cols="5">
            <AreaChart />
          </v-col>
          <v-col cols="1" />
          <v-col cols="4">
            <PieChart />
          </v-col>
        </v-row>

      </div>
    </v-sheet>
  </v-row>
</template>

<script>
import { useAuthStore } from "@/store/app";
import CardDashboard from "@/components/molecules/CardDashboard.vue";
import AreaChart from "@/components/atoms/AreaChart.vue";
import PieChart from "@/components/atoms/PieChart.vue";


export default {
  name: "HomePage",
  components: {
    CardDashboard,
    AreaChart,
    PieChart
  },
  data() {
    return {
      authStore: useAuthStore(),
    };
  },
  methods: {
    logout() {
      this.authStore.logout();
    },
  },
};
</script>
