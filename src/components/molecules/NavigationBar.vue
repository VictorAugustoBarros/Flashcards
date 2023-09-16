<template>
    <v-navigation-drawer floating permanent color="transparent" style="height: 100%;">
        <v-list-item>
            <v-list-item-title>
                <b>Flashcards</b>
            </v-list-item-title>
        </v-list-item>
        
        <v-list density="compact" nav>
            <router-link to="/" class="title">
                <v-list-item prepend-icon="mdi-home-analytics" title="Dashboard" value="dashboard"></v-list-item>
            </router-link>

            <router-link to="/decks" class="title">
                <v-list-item prepend-icon="mdi-cards" title="Decks" value="decks"></v-list-item>
            </router-link>            

            <router-link to="/cards" class="title">
                <v-list-item prepend-icon="mdi-cards-playing-diamond" title="Cards" value="cards"></v-list-item>
            </router-link>

        </v-list>

        <v-list-item>
            <v-list-item-title>
                <b>Review</b>
            </v-list-item-title>
        </v-list-item>
        <v-list density="compact" nav disabled>
            <v-list-item prepend-icon="mdi-book-alphabet" title="Review" value="review"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "NavigationBar"
}
</script>