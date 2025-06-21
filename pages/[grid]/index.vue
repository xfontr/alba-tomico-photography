<script lang="ts" setup>
import type { Image } from "~/types/Image";

const posts = usePosts();
const images = useImages();
const path = usePath();

onMounted(async () => {
  if (!path.isValid.value) {
    throw createError({ name: "Not found", statusCode: 404 });
  }

  await posts.update(path.current.value);
  await images.update(...posts.allPaths());
});

const fronts = computed<Image[]>(() =>
  new Array(50).fill(images.list.value.filter(({ front }) => front)[0])
);

const frontsWithEmptySpaces = computed<(Image | undefined)[]>(() => {
  const result: (Image | undefined)[] = [];
  const list = fronts.value;

  let i = 0;
  while (i < list.length) {
    const roll = Math.random();

    if (roll < 0.3) {
      result.push(undefined);
    } else {
      result.push(list[i]);
      i += 1;
    }

    // Occasionally drop a black square *after* the image too
    if (Math.random() < 0.2) result.push(undefined);
  }

  return result;
});
</script>

<template>
  <section class="works">
    <div
      v-for="(front, key) in frontsWithEmptySpaces"
      :key
      :class="['works__work', { 'works__work--empty': !front }]"
    >
      <NuxtLink v-if="front" :to="front.post">
        <img class="works__img" :src="front.src" :alt="front.alt" />
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.works {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 200px;
  row-gap: $distances-l;
  column-gap: $distances-s;

  &__work {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
