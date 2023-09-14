<template>
    <div class="center-Elements-Flex">
        <v-card class="deck">
            <v-card-item class="center-Elements-Flex">
                <v-card-title>{{ name }}</v-card-title>
            </v-card-item>
        </v-card>
    </div>
</template>

<script>
export default {
    name: "Deck",
    props: {
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
    }
}
</script>


<style>
.deck {
    border-radius: 10px;
}

.deck-description-text {
    word-break: break-word;
}
</style>