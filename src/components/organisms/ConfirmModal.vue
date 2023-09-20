<template>
    <v-dialog contained v-model="dialog" width="auto" content-class="elevation-0" hide-overlay>
        <v-card>
            <v-card-text>
                Realmente quer deletar?
            </v-card-text>
            <v-card-actions>
                <Button color="green" text="Cancelar" variant="text" @click="this.$emit('closeModal')"></Button>

                <Button class="center-Elements-Flex" color="red" variant="text" @click="deleteItem"
                    :icon="hovered ? 'mdi-delete-empty' : 'mdi-delete'" size="x-large" @mouseover="hovered = true"
                    @mouseout="hovered = false"></Button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import Button from "@/components/atoms/Button.vue";


export default {
    name: "ConfirmModal",
    components: {
        Button
    },
    data() {
        return {
            hovered: false,
            dialog: false,
        }
    },
    methods: {
        deleteItem() {
            this.$emit("deleteItem")
        }
    }
}
</script>