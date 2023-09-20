<template>        
    <div style="display: grid;grid-template-rows: auto 1fr;height: 100%;">
        <div>
            <v-row style="height: auto;">
                <v-spacer />
                <v-col cols="4">
                    <DeckSubdeckDropdownList class="card-padding" @change-deck="changeDeck" @change-subdeck="changeSubDeck"
                        cols="6" :deck-id="this.deckId" :subdeck-id="this.subdeckId" :decks="decks" />

                    <!-- <v-progress-linear></v-progress-linear> -->
                </v-col>
                <v-spacer />
            </v-row>
        </div>

        <div>            
            <v-row v-if="this.cards.length && this.loadedCards" justify="center" style="height: 100%;">

                <v-col cols="6">
                    <CardUserList :activeId="this.card.id" :cards="this.cards" @load-card="loadCard" @remove-card="removeCard" />
                </v-col>

                <v-spacer />
                <v-col cols="5" class="center-Elements-Flex">
                    <Card v-if="this.card.id" :card="{ ...this.card }" @updated-card="updatedCard" @deleted-card="deletedCard" />
                </v-col>
                <v-spacer />
            </v-row>

            <v-row v-else-if="this.deckId && this.subdeckId && !this.cards.length && this.loadedCards"
                style="height: 100%;">
                <v-spacer />
                <v-col cols="6" class="center-Elements-Flex">
                    <Component404 description="Card não encontrado!" @click-create-card="openCardExpander" />
                </v-col>
                <v-spacer />
            </v-row>
        </div>
    </div>
</template>

<script>
import DeckSubdeckDropdownList from "@/components/molecules/DeckSubdeckDropdownList.vue";

import CardUserList from "@/components/molecules/CardUserList.vue";
import Card from "@/components/organisms/Card.vue";
import Component404 from "@/components/organisms/404.vue"

import { getSubDeckCards } from "@/services/cards";

export default {
    name: "CardTemplate",
    props: {
        decks: Array,
    },
    components: {
        DeckSubdeckDropdownList,
        CardUserList,
        Card,
        Component404
    },
    data() {
        return {
            cards: [],
            card: {
                id: null,
                question: null,
                answer: null
            },
            loadedCards: false,
            deckId: null,
            subdeckId: null,
        }
    },
    created() {
        this.emitter.on("reloadCardUserList", (subDeckId) => {
            if (this.subdeckId === subDeckId) {
                this.loadSubDeckCards(subDeckId)
            }
        });
    },
    methods: {
        changeDeck(deckId) {
            this.deckId = deckId
        },
        changeSubDeck(subdeckId) {           
            this.subdeckId = subdeckId
            this.loadedCards = false

            const deck = this.decks.find(deck => deck.id === this.deckId);
            this.subdecks = deck.sub_deck ? deck.sub_deck : []

            const subdeck = this.subdecks.find(subdeck => subdeck.id === subdeckId);
            this.cards = subdeck.cards

            this.loadedCards = true
        },
        loadCard(selectedCardId) {
            const card = this.cards.find(card => card.id === selectedCardId);
            if (card) {
                this.card = card;
            }
        },
        updatedCard(cardUpdated) {
            const deck = this.decks.find(deck => deck.id === this.deckId);
            const subdeck = deck.sub_deck.find(subdeck => subdeck.id === this.subdeckId);
            
            subdeck.cards = subdeck.cards.map(card => {
                if (card.id === cardUpdated.id) {
                    return cardUpdated;
                }
                return card;
            });

            this.emitter.emit("reloadDecks", this.decks)

        },
        deletedCard(cardDeleted) {
            this.cards = this.cards.filter(card => card.id !== cardDeleted.id);
        },
        openCardExpander() {
            this.emitter.emit("openExpander", { deckId: this.deckId, subdeckId: this.subdeckId });
            this.cardExpanded = true
        }
    }
}

</script>