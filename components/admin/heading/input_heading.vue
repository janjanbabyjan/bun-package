<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { createSinglePage } from '~/plugins/api/authService';

const router = useRouter();

const props = defineProps({
  title: { type: String, default: "" },
  status: { type: Boolean, default: true },
  day: { type: String, default: "" },
  tag: { type: Array as () => string[], default: () => [] },
  addTag: { type: String, default: "" },
  removeTag: { type: String, default: "" },
});

const emits = defineEmits([
  "title",
  "status",
  "day",
  "tag",
  "addTag",
  "editTag",
  "removeTag",
]);

const saveName = ref(props.title);
const saveStatus = ref(props.status);
const saveDate = ref(props.day);
const tags = ref<string[]>([...props.tag]);
const newTag = ref('');
const editingIndex = ref<number | null>(null);

// Function to add or update a tag
const addTag = () => {
  if (newTag.value.trim() !== "") {
    if (editingIndex.value !== null) {
      tags.value[editingIndex.value] = newTag.value.trim();
      emits("editTag", { index: editingIndex.value, value: newTag.value.trim() });
      editingIndex.value = null;
    } else {
      tags.value.push(newTag.value.trim());
      emits("addTag", newTag.value);
    }
    newTag.value = "";
  }
};

// Function to remove a tag
const removeTag = (index: number) => {
  const removedTag = tags.value.splice(index, 1);
  emits("removeTag", removedTag[0]);
};

const editTag = (index: number) => {
  newTag.value = tags.value[index];
  editingIndex.value = index;
};

watch(() => props.title, (newValue) => {
  saveName.value = newValue;
});

watch(() => props.status, (newValue) => {
  saveStatus.value = newValue;
});

watch(() => props.day, (newValue) => {
  saveDate.value = newValue;
});

watch(() => props.tag, (newValue) => {
  tags.value = [...newValue];
});

watch(saveName, (newValue) => {
  emits("title", newValue);
});

watch(saveStatus, (newValue) => {
  emits("status", newValue);
});

watch(saveDate, (newValue) => {
  emits("day", newValue);
});

watch(tags, (newTags) => {
  emits("tag", newTags);
}, { deep: true });

// const getsave = async () => {
//   const data = {
//     title: saveName.value,
//     status: saveStatus.value,
//     day: saveDate.value,
//     tag: tags.value.map(tag => ({ tag }))
//   };

//   try {
//     const result = await createSinglePage(data);
//     if (result.statusCode === 200) {
//       router.push("/admin/dashboard");
//     } else {
//       console.error("Error creating article:", result);
//     }
//   } catch (error) {
//     console.error("Error creating article:", error);
//   }
// };
</script>

<template>
  <div class="center-container">
    <v-card class="withbg mt-4" style="max-width: 1000px">
      <v-card-item class="pa-6">
        <v-row class="mt-1">
          <v-col>
            <v-text-field label="หัวข้อ" v-model="saveName" />
          </v-col>
          <v-col>
            <v-text-field label="วันที่สร้าง" v-model="saveDate" type="date" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <div class="d-flex flex-column">
              <div class="d-flex align-center">
                <v-text-field type="text" v-model="newTag" label="เพิ่ม Tag ข่าว" style="max-width: 200px"></v-text-field>
                <v-btn color="primary" class="ml-5 mt-2 align-self-start" @click="addTag">
                  <v-icon left>mdi-plus</v-icon>
                </v-btn>
              </div>
              <div class="d-flex flex-wrap-reverse">
                <div v-for="(tag, index) in tags" :key="index" class="tag mr-4 tag-item">
                  <span @click="editTag(index)" class="editable-tag">{{ tag }}</span>
                  <span @click="removeTag(index)" class="delete-icon">-</span>
                </div>
              </div>
            </div>
          </v-col>
          <v-col>
            <v-row>
              <span class="ml-4">สถานะ</span>
              <v-col>
                <v-switch v-model="saveStatus" color="primary" style="margin-left: 35px; margin-top: -15px"></v-switch>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </div>
</template>


<style>
.tags-container {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
}

.tag-item {
  display: flex;
  align-items: center;
  background-color: #dae7ff;
  color: #3d7df3;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  margin-bottom: 8px;
  border: 1px solid transparent;
  height: 25px;
  white-space: nowrap;
}

.delete-icon {
  cursor: pointer;
  color: #3d7df3;
  font-size: 1.5rem;
  margin-left: 5px;
}

span {
  cursor: pointer;
  width: 100%;
}
</style>
