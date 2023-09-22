<template>
    <v-card :elevation="0" color="transparent">
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="end">
            <v-tab value="decks">Decks</v-tab>
            <v-tab value="subdecks">SubDecks</v-tab>
            <v-tab value="search"><v-icon icon="mdi-magnify"></v-icon></v-tab>
            <v-tab value="open"><v-icon icon="mdi-close-circle-outline"></v-icon></v-tab>
        </v-tabs>

        <v-window v-model="tab">
            <v-window-item value="decks">
                <DeckExpanderItems />
            </v-window-item>

            <v-window-item value="subdecks">
                <SubDeckExpanderItems />
            </v-window-item>

            <v-window-item value="open" style="height: auto;">

            </v-window-item>

            <v-window-item value="search" style="height: auto;">
                <v-row justify="center">
                    <v-col cols="3">
                        <v-text-field class="card-padding" placeholder="Pesquisar Deck" variant="outlined"
                            append-inner-icon="mdi-magnify"></v-text-field>
                    </v-col>
                </v-row>
            </v-window-item>
        </v-window>
    </v-card>
</template>

<script>
import DeckExpanderItems from "@/components/molecules/DeckExpanderItems.vue"
import SubDeckExpanderItems from "@/components/molecules/SubDeckExpanderItems.vue"

export default {
    "name": "DeckExpander",
    components: {
        SubDeckExpanderItems,
        DeckExpanderItems
    },
    data() {
        return {
            tab: "open"
        }
    }
}
</script>
