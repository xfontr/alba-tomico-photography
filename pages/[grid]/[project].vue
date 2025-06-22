<script lang="ts" setup>
import useContentStore from "~/stores/content.store";
import type { Entry } from "~/types/Entry";

const content = useContentStore(usePinia());

const current = ref();

onMounted(() => {
  const { view, project } = usePath();

  if (!project.value || !view.value) {
    throw createError({ statusCode: 404 });
  }

  current.value = (
    content.content[view.value]?.children?.find(
      (entry) => (entry as Entry).name === project.value
    ) as Entry
  )?.children;
});
</script>

<template>
  <section>
    <img v-for="{ alt, src } in current" :key="src" :src :alt />
  </section>
</template>
