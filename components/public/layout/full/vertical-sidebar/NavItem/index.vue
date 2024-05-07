<script setup>
import Icon from '../Icon.vue';
// import VListGroup from 'vuetify/components'
const props = defineProps({
    item: Object,
    level: Number,
});
</script>


<template>
    <!---Single Item--->
    <v-list-item v-if="!item.children" :to="item.to" rounded class="mb-1" active-color="primary"
        :disabled="item.disabled" :target="item.type === 'external' ? '_blank' : ''">
        <!---If icon--->
        <template v-slot:prepend>
            <Icon :item="item.icon" :level="level" />
        </template>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
        <!---If Caption--->
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
            {{ item.subCaption }}
        </v-list-item-subtitle>
        <!---If any chip or label--->
        <template v-slot:append v-if="item.chip">
            <v-chip :color="item.chipColor" class="sidebarchip hide-menu" :size="'small'" :variant="item.chipVariant"
                :prepend-icon="item.chipIcon">
                {{ item.chip }}
            </v-chip>
        </template>
    </v-list-item>

    <!-- Group Item -->
    <v-list-group v-else :value="item.active" :disabled="item.disabled">
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" rounded class="mb-1" active-color="primary" :title="item.title"
                :disabled="item.disabled">
                <template v-slot:prepend>
                    <Icon :item="item.icon" :level="level" />
                </template>
            </v-list-item>
        </template>
        <NavItem v-for="(child, i) in item.children" :key="`child-${i}`" :item="child" :level="level + 1" />
    </v-list-group>
</template>
