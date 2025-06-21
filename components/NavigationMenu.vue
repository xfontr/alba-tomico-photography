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
      <button type="button" class="navigation-menu__item">
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

  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: $z-index-m;
  color: $color-primary;

  &__item {
    font-size: $font-size-m;
    cursor: pointer;
  }

  &__center {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
  }
}
</style>
