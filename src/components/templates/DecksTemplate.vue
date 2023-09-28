<template>
    <v-row justify="center" style="overflow: auto;">
        <div v-for="deck in decks" style="display: inline-block;" class="px-5 py-8">
            <Deck :id="deck.id" :name="deck.name" :description="deck.description" />
        </div>
    </v-row>
</template>
  
<script>
import DeckExpander from "@/components/organisms/DeckExpander.vue"
import Deck from "@/components/molecules/Deck.vue"

import { getUserDecks } from "@/services/decks";

export default {
    name: "DecksTemplate",
    components: {
        DeckExpander,
        Deck
    },
    data() {
        return {
            tab: null,
            createDeck: false,
            decks: [],
            items: [
                {
                    title: 'Decks',
                    disabled: false,
                    href: 'decks',
                },
                {
                    title: 'SubDecks',
                    disabled: true,
                    href: 'breadcrumbs_link_1',
                }
            ],
        }
    },
    mounted() {
        this.loadDecks();
    },
    created() {
        this.emitter.on("reloadDeckList", () => {
            this.loadDecks()
        })
    },
    methods: {
        async loadDecks() {
            const deckData = await getUserDecks();

            if (deckData.response.success) {
                this.decks = deckData.decks;
                return;
            }
        },
    }
};
</script>
  