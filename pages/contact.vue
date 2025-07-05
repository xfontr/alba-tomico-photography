<script lang="ts" setup>
import useContentStore from "~/stores/content.store";
import type { Image } from "~/types/Image";

const { t } = useI18n();
const { contact } = useRuntimeConfig().public;

const { getImages } = useContentStore(usePinia());

const KEYS = ["description", "location", "contact", "instagram"];

const textBlocks = KEYS.map(
  (block) => t(`contact.${block}`, { email: contact }) as string
);

const image = computed<Image>(() => getImages("contact")[0]);
</script>

<template>
  <div class="contact">
    <article class="contact__content">
      <p v-for="block in textBlocks" :key="block" v-html="block" />
    </article>
    <img
      v-if="image?.src"
      class="contact__background"
      :src="image.src"
      :alt="image.alt"
    />
  </div>
</template>

<style lang="scss" scoped>
.contact {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    max-width: 17rem;
    display: flex;
    flex-direction: column;
    gap: $distances-s;
    color: $color-primary;
    text-align: center;
    font-size: $font-size-m;
  }

  &__background {
    position: absolute;
    inset: 0;
    height: 100vh;
    width: 100vw;
    object-fit: cover;
    z-index: -1;
  }
}
</style>
