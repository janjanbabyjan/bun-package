<script setup>
import Icon from '../Icon.vue';
// import VListGroup from 'vuetify/components'
const props = defineProps({
    item: Object,
    level: Number,
});

const openGroups = ref([]);

// Function to toggle the open/closed state of a group
const toggleGroup = (group, value) => {
    if (value) {
        openGroups.value.push(group);
    } else {
        const index = openGroups.value.indexOf(group);
        if (index !== -1) {
            openGroups.value.splice(index, 1);
        }
    }
};

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
    </v-list-item>

    <!-- Group Item -->
    <v-list-group v-else-if="item.children" :value="openGroups.includes(item)" @update:modelValue="toggleGroup(item)"
        :disabled="item.disabled">
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" rounded class="mb-1" active-color="#FFFFFF" :title="item.title"
                :disabled="item.disabled">
                <template v-slot:prepend>
                    <Icon :item="item.icon" :level="level" />
                </template>
                
            </v-list-item>

            <template v-for="(sub, index) in item.children">
                <v-list-group v-if="item.children" :value="openGroups.includes(sub)"
                    @update:modelValue="toggleGroup(sub)" :disabled="sub.disabled">
                    <v-list-item v-if="!sub.children" :to="sub.to" rounded class="mb-1" active-color="primary"
                        :disabled="sub.disabled" :target="sub.type === 'external' ? '_blank' : ''">
                        <v-list-item-title>{{ sub.title }} </v-list-item-title>
                    </v-list-item>


                    <v-list-group v-if="sub.children">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" rounded class="mb-1" active-color="primary" :title="sub.title"
                                :disabled="sub.disabled">
                            </v-list-item>

                        </template>
                        <template v-for="(insub, index) in sub.children">
                            <v-list-group v-if="item.children" :value="openGroups.includes(insub)"
                                @update:modelValue="toggleGroup(insub)" :disabled="insub.disabled">
                                <v-list-item v-if="item.children" :to="insub.to" rounded class="mb-1"
                                    active-color="primary" :disabled="insub.disabled"
                                    :target="insub.type === 'external' ? '_blank' : ''">
                                    <v-list-item-title>{{ insub.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list-group>
                        </template>
                    </v-list-group>

                </v-list-group>
            </template>

        </template>
    </v-list-group>
</template>


<!-- <style>
.v-list-group--open i a .v-list-item__append{
    color: aliceblue;
}
</style> -->
<!-- <template v-for="(insub, i) in sub.children">
                        <v-list-group v-if="sub.children" :value="openGroups.includes(insub)"
                            @update:modelValue="(value) => toggleGroup(insub, value)" :disabled="insub.disabled">
                            <v-list-item v-if="sub.children" :to="insub.to" rounded class="mb-1" active-color="primary"
                                :disabled="insub.disabled" :target="insub.type === 'external' ? '_blank' : ''">
                                <v-list-item-title>{{ insub.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list-group>
                    </template> -->