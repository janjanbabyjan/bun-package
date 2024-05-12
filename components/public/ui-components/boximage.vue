<script lang="ts">
import { shallowRef } from 'vue';
import cards from '~/components/public/ui-components/image';

export default {
    data() {
        return {
            cards: shallowRef(cards)
        }
    }
}
</script>

<template>
    <div>
        <v-row>
            <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="4" lg="3">
                <v-card class="mx-auto" max-width="400">
                    <v-img class="align-end text-white" height="200" :src="card.imageUrl" cover>
                        <v-card-title>{{ card.title }}</v-card-title>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<style>
.v-img {
    cursor: pointer;
}

.v-card-title {
    font-size: 16px;
    color: #ffffff;
}
</style>