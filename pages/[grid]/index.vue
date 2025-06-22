<script lang="ts" setup>
import useContentStore from "~/stores/content.store";
import type { Entry } from "~/types/Entry";
import type { Image } from "~/types/Image";

const content = useContentStore(usePinia());

const path = usePath();
const { t } = useI18n();

onMounted(() => {
  if (!path.view.value) {
    throw createError({ statusCode: 404 });
  }

  if (!fronts.value.length) {
    throw createError({
      statusMessage: t("error.in_progress") as string,
      statusCode: 204,
    });
  }
});

const fronts = computed<Image[]>(() =>
  new Array(50)
    .fill(
      content.content[path.view.value!]?.children?.flatMap((child) =>
        (child as Entry).children?.filter((image) => (image as Image).front)
      )
    )
    .flat()
);

const frontsWithEmptySpaces = computed<(Image | undefined)[]>(() => {
  const result: (Image | undefined)[] = [];

  let i = 0;
  while (i < fronts.value.length) {
    const roll = Math.random();

    if (roll < 0.3) {
      result.push(undefined);
    } else {
      result.push(fronts.value[i]);
      i += 1;
    }

    if (Math.random() < 0.2) result.push(undefined);
  }

  return result;
});
</script>

<template>
  <section class="repository">
    <div
      v-for="(front, key) in frontsWithEmptySpaces"
      :key="`item-${key}`"
      class="repository__grid"
    >
      <NuxtLink v-if="front?.alt" :to="front.post">
        <img class="repository__img" :src="front.src" :alt="front.alt" />
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.repository {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-auto-rows: 200px;
  row-gap: $distances-l;
  column-gap: $distances-s;

  &__grid {
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
