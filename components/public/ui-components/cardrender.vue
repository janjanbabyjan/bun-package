<!-- components\public\ui-components\cardrender.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Props {
  limitCards?: number;
}

const props = withDefaults(defineProps<Props>(), {
  limitCards: undefined,
});

interface ContentBlock {
  id: string;
  type: string;
  data: {
    text?: string;
    level?: number;
    url?: string;
  };
}

interface BlogData {
  id: number;
  title: string;
  content: {
    time: number;
    blocks: ContentBlock[];
    version: string;
  };
  createdAt: string;
  updatedAt: string;
  timestampCreate: string;
  titleImages: string;
  pageLink: string;
  isActive: boolean;
  typeId: number;
  tag: { tagName: string }[];
}

const Blog = ref<BlogData[]>([]);

// Fetch the data from the API
const fetchBlogData = async () => {
  try {
    const response = await axios.get('http://localhost:8000/singlepage', {
      params: {
        typeId: 1
      }
    });
    const data: BlogData[] = response.data.result.singlePage.filter((page: BlogData) => page.typeId === 1);
    Blog.value = data;
  } catch (error) {
    console.error('Error fetching blog data:', error);
  }
};

// Fetch the blog data when the component is mounted
onMounted(fetchBlogData);

// Type guard to check if the data object has a url property
function hasUrl(data: any): data is { url: string } {
  return typeof data.url === 'string';
}

// Utility function to get the image URL
const getImageUrl = (blocks: ContentBlock[]): string | null => {
  for (const block of blocks) {
    if (block.type === 'image' && hasUrl(block.data)) {
      return block.data.url;
    }
  }
  return null;
};
</script>

<template>
  <div class="py-md-15 py-sm-8">
    <v-container>
      <v-row class="justify-center header-test">
        <v-col cols="12" sm="8">
          <div class="text-center">
            <div class="d-flex align-center mb-5 justify-center" data-aos="fade-right" data-aos-delay="200"
              data-aos-duration="1000">
              <span class="bg-success pa-2 rounded-circle mr-2"></span>
              <h6 class="text-subtitle-1 text-dark font-weight-bold">Banpu</h6>
            </div>
            <h2 class="text-h2 text-dark mb-3" data-aos="fade-left" data-aos-delay="200" data-aos-duration="1000">
              ข่าวสาร</h2>
            <!-- <p class="text-muted mb-4">Newsroom</p> -->
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="12" md="4" sm="6"
          v-for="(card, index) in props.limitCards ? Blog.slice(0, props.limitCards) : Blog" :key="card.id"
          class="mb-4">
          <v-card elevation="0" variant="outlined" class="card-with-min-height">
            <div class="hover-card overflow-hidden lh-10 rounded-md rounded-be-0 position-relative">
              <NuxtLink :to="card.pageLink" class="text-decoration-none">
                <v-img :src="getImageUrl(card.content.blocks) || card.titleImages" height="250px" alt="post" cover
                  class="zoom-in w-100"></v-img>
              </NuxtLink>
            </div>
            <div class="pa-4 mt-2">
              <div class="d-flex justify-space-between align-center">
                <p class="text-muted text-subtitle-1">{{ new Date(card.createdAt).toLocaleDateString() }}</p>
                <v-chip v-for="tag in card.tag" :key="tag.tagName" color="primary" height="auto" size="small"
                  variant="tonal" rounded="md">
                  {{ tag.tagName }}
                </v-chip>
              </div>
              <div class="mt-4">
                <h5 class="text-h5 font-weight-bold mb-3 lh-normal line-clamp">
                  <NuxtLink class="text-decoration-none text-dark hover-primary" :to="card.pageLink">
                    {{ card.title }}
                  </NuxtLink>
                </h5>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.line-clamp {
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: normal !important;
}
</style>