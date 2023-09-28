<template>
    <v-card color="transparent" :elevation="5" theme="dark" class="deck rounded-xl" style="padding: 10px;">
        <div class="d-flex flex-no-wrap justify-space-between">
            <div>
                <v-card-title class="text-h5">
                    {{ name }}
                </v-card-title>

                <v-card-text>
                    <div class="text-space">
                        {{ description }}
                    </div>
                </v-card-text>
            </div>

            <v-avatar class="ma-3" size="125" rounded="0">
                <v-img src="https://miro.medium.com/v2/resize:fit:1200/0*n-2bW82Z6m6U2bij.jpeg" cover
                    style="border-radius: 10px;"></v-img>
            </v-avatar>
        </div>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-heart"></v-btn>
            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-bookmark"></v-btn>
            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-note-edit" @click="loadSubdecks"></v-btn>
            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share"></v-btn>
            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-delete"></v-btn>
            <v-spacer></v-spacer>
        </v-card-actions>
    </v-card>
</template>

<script>
import { useSubDecksStore } from "@/store/subdecks"

export default {
    name: "Deck",
    props: {
        id: Int16Array,
        name: String,
        description: String,
        width: {
            type: Int16Array,
            default: 200
        },
        height: {
            type: Int16Array,
            default: 200
        },
    },
    methods: {
        changeColor(newColor) {
            this.buttonColor = newColor; // Define a nova cor quando o mouse entra
        },
        resetColor() {
            this.buttonColor = "surface-variant"; // Volta à cor normal quando o mouse sai
        },
        loadSubdecks() {
            useSubDecksStore().setSubdeckId(this.id)
            this.$router.push({ path: '/subdecks' })
        }
    },
}
</script>


<style>
.text-space {
    max-width: 100px;
    overflow: hidden;
    display: -webkit-box;
}

.deck {
    height: 220px;
    width: 300px;
}
</style>