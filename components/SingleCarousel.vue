<script lang="ts" setup>
import type { Image } from "~/types/Image";

const { images = [] } = defineProps<{ images?: Image[] }>();

const location = ref<number>(0);
const current = computed<Image>(
  () => images[Math.floor(location.value)] ?? images[0]
);

const animate = (): void => {
  requestAnimationFrame(() => {
    if (location.value === -1) return;

    if (location.value >= images.length) location.value = 0;

    location.value += 0.1;

    animate();
  });
};

const disconnect = () => {
  location.value = -1;
};

onBeforeMount(disconnect);

watch(
  () => images,
  (imgs) => {
    console.log(imgs.length);
    if (!imgs.length) {
      disconnect();
      return;
    }

    location.value = 0;
    animate();
  }
);
</script>

<template>
  <div class="single-carousel">
    <img
      v-if="current"
      class="single-carousel__img"
      :src="current.src"
      :alt="current.alt"
    />
  </div>
</template>

<style lang="scss" scoped>
.single-carousel__img {
  width: 150px;
}
</style>
