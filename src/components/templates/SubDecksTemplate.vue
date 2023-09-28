<template>
    {{ subdeckStore.getSubdeckId }}
    <v-row justify="center" style="overflow: auto;">
        <h1>Subdecks</h1>
    </v-row>
</template>
  
<script>
import { useSubDecksStore } from "@/store/subdecks"

export default {
    name: "SubDecksTemplate",
    data() {
        return {
            subdeckStore: useSubDecksStore()
        }
    }
};
</script>