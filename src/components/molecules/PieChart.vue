<template>
  <apexchart
    type="pie"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script lang="ts">
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "PieChart",
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [44, 55, 13, 43, 22],
      chartOptions: {
        chart: {
          width: 380,
          type: "pie",
        },
        labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  },
};
</script>
