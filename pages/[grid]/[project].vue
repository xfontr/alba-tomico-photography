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
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  gap: $distances-s;

  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox, Safari 18.2+, Chromium 121+ */

  &::-webkit-scrollbar {
    display: none; /* Older Safari and Chromium */
  }

  &__img {
    @media (min-width: 500px) {
      height: 100%;
      width: auto;
      object-fit: contain;
      flex-shrink: 0;
    }
  }

  @media (min-width: 500px) {
    height: 100vh;
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }
}
</style>
