<script lang="ts" setup>
import type { Image } from "~/types/Image";

const THROTTLE = 100;

const images = useImages();

definePageMeta({ layout: "canvas" });

const location = ref<number>(0);
let lastChange = 0;

const onMouseMove = (): void => {
  const now = Date.now();

  if (now - lastChange < THROTTLE) return;

  lastChange = now;

  location.value += 1;
  if (location.value >= images.list.value.length) location.value = 0;
};

const image = computed<Image>(() => images.list.value[location.value] ?? {});

onMounted(() => images.update("home"));
</script>

<template>
  <section class="landing" @mousemove="onMouseMove">
    <LandingMenu>
      <img class="landing__background" :src="image.src" :alt="image.alt"
    ></LandingMenu>
  </section>
</template>

<style lang="scss" scoped>
.landing__background {
  position: absolute;
  inset: 0;
  height: 100vh;
  width: 100vw;
  object-fit: cover;
}
</style>
