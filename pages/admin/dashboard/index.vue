<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
import { ref } from "vue";
import ProfitExpanse from "@/components/admin/dashboards/ProfitExpense.vue";
import TrafficDistribution from "@/components/admin/dashboards/TrafficDistribution.vue";
import ProductSales from "@/components/admin/dashboards/ProductSales.vue";
import UpcommingSchedule from "@/components/admin/dashboards/UpcommingSchedule.vue";
import TopPayingClients from "@/components/admin/dashboards/TopPayingClients.vue";
import ProductCards from "@/components/admin/dashboards/ProductCards.vue";
</script>

<template>
    <v-row>
        <v-col cols="12" sm="12" lg="8">
            <ProfitExpanse />
        </v-col>
        <v-col cols="12" sm="12" lg="4">
            <div class="mb-6">
                <TrafficDistribution/>
            </div>
            <div>
                <ProductSales/>
            </div>
        </v-col>
        <v-col cols="12" sm="12" lg="4">
            <UpcommingSchedule/>
        </v-col>
        <v-col cols="12" sm="12" lg="8">
            <TopPayingClients/>
        </v-col>
        <v-col cols="12" sm="12" lg="12">
            <ProductCards/>
        </v-col>
        <v-col class="text-center mt-2">
            <p class="text-muted">Design and Developed by <a flat variant="text" href="https://www.wrappixel.com/" target="_blank" class="pl-1 text-primary">wrappixel.com</a></p>
        </v-col>
    </v-row>
</template>