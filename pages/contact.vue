<script lang="ts" setup>
const { t } = useI18n();
const { contact } = useRuntimeConfig().public;

const KEYS = ["description", "location", "contact", "instagram"];

const textBlocks = KEYS.map(
  (block) => t(`contact.${block}`, { email: contact }) as string
);
</script>

<template>
  <div class="contact">
    <article class="contact__content">
      <p v-for="block in textBlocks" :key="block" v-html="block" />
    </article>
  </div>
</template>

<style lang="scss" scoped>
.contact {
  position: absolute;
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
}
</style>
