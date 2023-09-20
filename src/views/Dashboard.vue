<template>
  <div class="center-Elements-Flex" style="height: 100vh;overflow: auto;">
    <v-sheet rounded="xl" width="95%" height="100%" class="sheet">
      
      <div style="padding: 50px;height: 100%">
        <v-row>
          <v-col cols="3" class="center-Elements-Flex">
            <CardDashboard text="Decks" icon="mdi-cards" count="10" />
          </v-col>
          <v-col cols="3" class="center-Elements-Flex">
            <CardDashboard text="SubDecks" icon="mdi-cards" />
          </v-col>
          <v-col cols="3" class="center-Elements-Flex">
            <CardDashboard text="Card" icon="mdi-cards-playing-diamond" />
          </v-col>
          <v-col cols="3" class="center-Elements-Flex">
            <CardDashboard text="Pendentes" icon="mdi-book-alphabet" color="red" />
          </v-col>
        </v-row>
        
        <v-row style="padding-top: 150px;">
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
  </div>
</template>

<script>
import { useAuthStore } from "@/store/app";
import CardDashboard from "@/components/molecules/CardDashboard.vue";
import AreaChart from "@/components/molecules/AreaChart.vue";
import PieChart from "@/components/molecules/PieChart.vue";


export default {
  name: "DashboardPage",
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
