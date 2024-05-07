<script setup>
import Icon from '../Icon.vue';
// import VListGroup from 'vuetify/components'
const props = defineProps({
    item: Object,
    level: Number,
});

const openGroups = ref([]);

// Function to toggle the open/closed state of a group
const toggleGroup = (group) => {
    const index = openGroups.value.indexOf(group);
    if (index !== -1) {
        openGroups.value.splice(index, 1);
    } else {
        openGroups.value.push(group);
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
        <v-list-item-subtitle v-if="item.subCaption" class="text-caption mt-n1 hide-menu">
            {{ item.subCaption }}
        </v-list-item-subtitle>
    </v-list-item>

    <!-- Group Item -->
    <v-list-group v-else :value="openGroups.includes(item)" @update:modelValue="toggleGroup(item)"
        :disabled="item.disabled">
        <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" rounded class="mb-1" active-color="primary" :title="item.title"
                :disabled="item.disabled">

                <!-- <template v-slot:prepend>
                    <Icon :item="item.icon" :level="level" />
                </template> -->
            </v-list-item>
            <template v-for="(sub, index) in item.children">
                <v-list-group :value="openGroups.includes(sub)" @update:modelValue="toggleGroup(sub)"
                    :disabled="sub.disabled">
                    <v-list-item :to="sub.to" rounded class="mb-1" active-color="primary" :disabled="sub.disabled"
                        :target="sub.type === 'external' ? '_blank' : ''">
                        <!-- <template v-slot:prepend>
                        <Icon :item="sub.icon" :level="level" />
                    </template> -->
                        <v-list-item-title>{{ sub.title }}</v-list-item-title>
                        <v-list-item-subtitle v-if="sub.subCaption" class="text-caption mt-n1 hide-menu">
                            {{ sub.subCaption }}
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list-group>
            </template>


            <!-- <v-list-item v-if="!item.children" v-bind="props" rounded class="mb-1" active-color="primary"
                :title="item.title" :disabled="item.disabled">

                <template v-slot:prepend>
                    <Icon :item="item.icon" :level="level" />
                </template>
            </v-list-item> -->
            <!-- <template v-else>
                <div>{{item}}</div>
            </template> -->
            <!-- <template v-for="(subItem,index) in item.children">
            
            <v-list-group v-else :value="openGroups.includes(subItem.children)" @update:modelValue="toggleGroup(subItem.children)"
                :disabled="item.disabled">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" rounded class="mb-1" active-color="primary" :title="subItem.title"
                        :disabled="subItem.disabled">
                        <template v-slot:prepend>
                            <Icon :item="subItem.icon" :level="level" />
                        </template>
                    </v-list-item>
                </template>

            </v-list-group>
            </template> -->
        </template>

    </v-list-group>
</template>
