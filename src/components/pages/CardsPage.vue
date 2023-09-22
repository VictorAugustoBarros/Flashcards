<template>
  <div class="center-Elements-Flex" style="overflow: auto; height: 100%;">
    <v-sheet rounded="xl" width="95%" height="100%" class="sheet">
      <div style="display: grid; grid-template-rows: auto 1fr; height: 100%;">
        <div>
          <CardExpander />
        </div>
        <div>
          <CardTemplate />
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import CardExpander from "@/components/organisms/CardExpander.vue";
import CardTemplate from "@/components/templates/CardTemplate.vue"

export default {
  name: "CardsPage",
  components: {
    CardExpander,
    CardTemplate
  }
};
</script>
