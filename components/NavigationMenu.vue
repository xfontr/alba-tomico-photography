<script lang="ts" setup>
import { addBrackets, closeMenu } from "#imports";
import { MENU_ITEMS } from "~/configs/constants";

const { t } = useI18n();

const { isFullMenuOpen = false } = defineProps<{ isFullMenuOpen?: boolean }>();
</script>

<template>
  <nav class="navigation-menu">
    <NuxtLink to="/contact" class="navigation-menu__item" @click="closeMenu">
      {{ addBrackets(t("menu.contact") as string) }}
    </NuxtLink>

    <div class="navigation-menu__center">
      <NuxtLink to="/" class="navigation-menu__item">
        {{ addBrackets(t("meta.title") as string) }}
      </NuxtLink>
    </div>

    <FullMenu :items="MENU_ITEMS" :disabled="isFullMenuOpen">
      <button
        type="button"
        class="navigation-menu__item navigation-menu__item--right"
      >
        {{
          addBrackets(t(`menu.${isFullMenuOpen ? "close" : "menu"}`) as string)
        }}
      </button></FullMenu
    >
  </nav>
</template>

<style lang="scss" scoped>
.navigation-menu {
  width: 100%;

  position: fixed;
  padding: $distances-m;
  inset: 0;
  bottom: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: $z-index-m;
  color: $color-primary;
  mix-blend-mode: difference;
  -webkit-text-fill-color: $color-primary;

  &__item {
    font-size: $font-size-m;
    cursor: pointer;
    width: 120px;
    overflow: visible;
    text-wrap: nowrap;

    &--right {
      text-align: right;
    }
  }

  &__center {
    display: none;

    @media (min-width: 500px) {
      display: block;
    }
  }
}
</style>
