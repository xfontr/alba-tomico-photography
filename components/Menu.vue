<script lang="ts" setup>
const { t } = useI18n();
</script>

<template>
  <slot />

  <div class="menu">
    <NuxtLink to="" class="menu__item menu__item--left">
      {{ t("menu.info") }}
    </NuxtLink>

    <h1 class="menu__heading">
      {{ t("meta.title") }}
    </h1>

    <NuxtLink to="" class="menu__item menu__item--right">
      {{ t("menu.menu") }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: all;

  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  color: white;

  &__item {
    font-size: 1.25rem;
    cursor: pointer;

    &--left {
      transform: rotate(90deg);
    }

    &--right {
      transform: rotate(-90deg);
    }
  }

  &__heading {
    text-transform: uppercase;
    font-size: 4.5rem;
    font-weight: 900;
  }
}
</style>
