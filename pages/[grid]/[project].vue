<script lang="ts" setup>
import useContentStore from "~/stores/content.store";
import type { Entry } from "~/types/Entry";

const content = useContentStore(usePinia());

const current = ref();
const container = ref<HTMLElement>();

onMounted(() => {
  const { view, project } = usePath();

  if (!project.value || !view.value) {
    throw createError({ statusCode: 404 });
  }

  current.value = (
    content.content[view.value]?.children?.find(
      (entry) => (entry as Entry).name === project.value?.split("-").join(" ")
    ) as Entry
  )?.children;
});

onMounted(() => {
  document.body.style.height = container.value?.clientHeight + "px";
});

onBeforeUnmount(() => {
  document.body.style.height = "fit-content";
});
</script>

<template>
  <section ref="container" class="project">
    <img
      v-for="{ alt, src } in current"
      :key="src"
      class="project__img"
      :src
      :alt
    />
  </section>
</template>

<style lang="scss" scoped>
.project {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  height: 98.5vh;
  gap: $distances-s;

  &__img {
    width: 100%;
  }

  @media (min-width: 500px) {
    flex-direction: row;
  }
}
</style>
