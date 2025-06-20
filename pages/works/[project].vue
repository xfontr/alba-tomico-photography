<script lang="ts" setup>
const posts = usePosts();
const images = useImages();

onMounted(async () => {
  await posts.update();
  await images.update(...posts.allPaths());
});
</script>

<template>
  <section class="works">
    <img v-for="{ alt, src } in images.list.value" :key="src" :src :alt />
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
