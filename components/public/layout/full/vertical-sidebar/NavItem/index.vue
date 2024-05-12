<script setup>
import Icon from '../Icon.vue';

const props = defineProps({
  item: Object,
  level: Number,
});
</script>

<template>
  <!---Single Item--->
  <v-list-item v-if="!item.children" :to="item.to" rounded class="mb-1" :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : ''">
    <!---If icon--->
    <template v-slot:prepend>
      <Icon :item="item.icon" :level="level" />
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
    <!---If Caption--->
  </v-list-item>

  <!-- Group Item -->
  <v-list-group v-else-if="item.children" :disabled="item.disabled">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" rounded class="mb-1" :title="item.title"
        :disabled="item.disabled">
        <template v-slot:prepend>
          <Icon :item="item.icon" :level="level" />
        </template>
      </v-list-item>
    </template>

    <template v-for="(sub, index) in item.children">
      <v-list-item v-if="!sub.children" :to="sub.to" rounded class="mb-1" 
        :disabled="sub.disabled" :target="sub.type === 'external' ? '_blank' : ''">
        <v-list-item-title >{{ sub.title }}</v-list-item-title>
      </v-list-item>

      <v-list-group v-else :disabled="sub.disabled">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" rounded class="mb-1"  :title="sub.title"
            :disabled="sub.disabled">
          </v-list-item>
        </template>

        <v-list-item v-for="(insub, index) in sub.children" :key="index" :to="insub.to" rounded class="mb-1"
           :disabled="insub.disabled" :target="insub.type === 'external' ? '_blank' : ''" >
          <v-list-item-title>{{ insub.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </template>
  </v-list-group>
</template>