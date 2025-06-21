<script lang="ts" setup>
const path = usePath();
const posts = usePosts();
const images = useImages();

onMounted(async () => {
  await posts.update(path.current.value);
  await images.update(...posts.allPaths());
});
</script>

<template>
  <section>
    <img v-for="{ alt, src } in images.list.value" :key="src" :src :alt />
  </section>
</template>
