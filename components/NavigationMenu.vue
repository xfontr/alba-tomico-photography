<script lang="ts" setup>
import { addBrackets } from "#imports";

const { t } = useI18n();
</script>

<template>
  <nav class="navigation-menu">
    <button type="button" class="navigation-menu__item">
      {{ addBrackets(t("menu.menu") as string) }}
    </button>

    <NuxtLink to="/" class="navigation-menu__item">
      {{ addBrackets(t("meta.title") as string) }}
    </NuxtLink>

    <NuxtLink to="contact" class="navigation-menu__item">
      {{ addBrackets(t("menu.contact") as string) }}
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.navigation-menu {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  color: white;

  &__item {
    font-size: $font-size-m;
    cursor: pointer;
  }
}
</style>
