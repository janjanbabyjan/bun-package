<script setup>
import { ref, onMounted, defineProps } from "vue"; // ปรับเปลี่ยนการ import ที่ใช้งานกับ Vue 3 Composition API
import { getAllManageMenus } from "@/plugins/api/authService"; // ปรับเปลี่ยน path ตามที่เจ้าต้องการ

const props = defineProps({
  item: Object,
  level: Number,
});

const menus = ref([]); // ประกาศ reactive variable สำหรับเก็บข้อมูลเมนู

const fetchMenus = async () => {
  try {
    const response = await getAllManageMenus(); // เรียกใช้ API เพื่อดึงข้อมูลเมนู
    menus.value = response.result.manageMenus; // เก็บข้อมูลเมนูใส่ในตัวแปร menus
  } catch (error) {
    console.error("Error fetching menus:", error);
  }
};

onMounted(() => {
  fetchMenus(); // เรียกใช้ fetchMenus เมื่อ component ถูก mount
});
</script>

<template>
  <v-list>
    <template v-for="menu in menus" :key="menu.id">
      <v-list-item v-if="menu.isActive" :to="menu.to" rounded class="mb-1" :disabled="menu.disabled" :target="menu.type === 'external' ? '_blank' : ''">
        
        <template v-slot:prepend>
          <Icon :item="menu.icon" :level="1" />
        </template>

        <v-list-item-title>{{ menu.menuName }}</v-list-item-title>

        <v-list-item-group v-if="menu.children && menu.children.length > 0">
          <template v-for="child in menu.children" :key="child.id">
            <v-list-item v-if="child.isActive" :to="child.to" rounded class="mb-1 sub-menu-item" :disabled="child.disabled" :target="child.type === 'external' ? '_blank' : ''">
              <v-list-item-title>{{ child.menuName }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>

      </v-list-item>
    </template>
  </v-list>

  <v-list v-model:opened="open">
    <v-list-group value="Users">
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          prepend-icon="mdi-account-circle"
          title="Users"
        ></v-list-item>
      </template>

      <v-list-group value="Admin">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Admin"></v-list-item>
        </template>

        <v-list-item
          v-for="([title, icon], i) in admins"
          :key="i"
          :prepend-icon="icon"
          :title="title"
          :value="title"
        ></v-list-item>
      </v-list-group>

      <v-list-group value="Actions">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" title="Actions"></v-list-item>
        </template>

        <v-list-item
          v-for="([title, icon], i) in cruds"
          :key="i"
          :prepend-icon="icon"
          :title="title"
          :value="title"
        ></v-list-item>
      </v-list-group>
    </v-list-group>
  </v-list>
</template>

<style>
.sub-menu-item {
  margin-left: 20px; /* กำหนดระยะห่างระหว่างเมนูย่อยกับเมนูหลัก */
}
</style>

<!-- <template>
<v-list>
  <v-list>
    <template v-for="menu in menus" :key="menu.id">
      <v-list-item :to="menu.to" rounded class="mb-1" :disabled="menu.disabled" :target="menu.type === 'external' ? '_blank' : ''">
        <template v-slot:prepend>
          <Icon :item="menu.icon" :level="1" />
        </template>
        <v-list-item-title>{{ menu.menuName }}</v-list-item-title>
        <v-list-item-group v-if="menu.children && menu.children.length > 0">
          <template v-for="child in menu.children" :key="child.id">
            <v-list-item :to="child.to" rounded class="mb-1 sub-menu-item" :disabled="child.disabled" :target="child.type === 'external' ? '_blank' : ''">
              <v-list-item-title>{{ child.menuName }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list-item>
    </template>
  </v-list>
  </v-list> -->

<!---Single Item--->
<!-- <v-list-item v-if="!item.children" :to="item.to" rounded class="mb-1" :disabled="item.disabled"
    :target="item.type === 'external' ? '_blank' : ''"> -->
<!---If icon--->
<!-- <template v-slot:prepend>
      <Icon :item="item.icon" :level="level" />
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title> -->
<!---If Caption--->
<!-- </v-list-item> -->

<!-- Group Item -->
<!-- <v-list-group v-else-if="item.children" :disabled="item.disabled">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props" rounded class="mb-1" :title="item.title"
        :disabled="item.disabled">
        <template v-slot:prepend>
          <Icon :item="item.icon" :level="level" />
        </template>
      </v-list-item>
    </template> -->

<!-- <template v-for="(sub, index) in item.children">
      <v-list-item v-if="!sub.children" :to="sub.to" rounded class="mb-1" 
        :disabled="sub.disabled" :target="sub.type === 'external' ? '_blank' : ''">
        <v-list-item-title >{{ sub.title }}</v-list-item-title>
      </v-list-item> -->

<!-- <v-list-group v-else :disabled="sub.disabled">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" rounded class="mb-1"  :title="sub.title"
            :disabled="sub.disabled">
          </v-list-item>
        </template> -->

<!-- <v-list-item v-for="(insub, index) in sub.children" :key="index" :to="insub.to" rounded class="mb-1"
           :disabled="insub.disabled" :target="insub.type === 'external' ? '_blank' : ''" >
          <v-list-item-title>{{ insub.title }}</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </template>
  </v-list-group> -->

<!-- </template>
<style>
.sub-menu-item {
  margin-left: 20px; 
}
</style> -->
