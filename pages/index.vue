<script lang="ts" setup>
import useImageStore from "~/stores/images.store";
import type { Image } from "~/types/Image";

const THROTTLE = 100;

const store = useImageStore(usePinia());

definePageMeta({ layout: "canvas" });

const location = ref<number>(0);
let lastChange = 0;

const images = computed<Image[]>(() => store.images.home ?? []);

const onMouseMove = (): void => {
  if (!images.value.length) return;

  const now = Date.now();

  if (now - lastChange < THROTTLE) return;

  lastChange = now;

  location.value += 1;
  if (location.value >= images.value.length) location.value = 0;
};

const image = computed<Image | undefined>(() => images.value[location.value]);
</script>

<template>
  <section class="landing" @mousemove="onMouseMove">
    <LandingMenu>
      <img
        v-if="image"
        class="landing__background"
        :src="image.src"
        :alt="image.alt"
    /></LandingMenu>
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
