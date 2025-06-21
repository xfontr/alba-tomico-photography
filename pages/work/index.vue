<script lang="ts" setup>
import type { Image } from "~/types/Image";

const posts = usePosts();
const images = useImages();

onMounted(async () => {
  await posts.update();
  await images.update(...posts.allPaths());
});

const frontImages = computed<Image[]>(() =>
  images.list.value.filter(({ front }) => front)
);
</script>

<template>
  <section class="works">
    <div v-for="{ alt, src, post } in frontImages" :key="src" :src :alt>
      <NuxtLink :to="post"><img :src :alt ></NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.landing {
  position: relative;

  &__background {
    position: absolute;
    inset: 0;
    height: 100vh;
    width: 100vw;
    object-fit: cover;
  }
}
</style>
