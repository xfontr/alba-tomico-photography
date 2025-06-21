<script lang="ts" setup>
import type { MenuItem } from "~/types/MenuItem";

defineProps<{ items: MenuItem[] }>();

const open = defineModel<boolean>();

const { t: i18n } = useI18n();

const visibleImage = ref<string>();

const onMouseEnter = (key: string): void => {
  visibleImage.value = key;
};

const onMouseLeave = (): void => {
  visibleImage.value = undefined;
};

const t = (key: string): string => i18n(`menu.${key}`) as string;
</script>

<template>
  <div @click="open = true"><slot /></div>

  <section v-if="open" class="full-menu" @click="open = false">
    <header class="full-menu__header">
      <NavigationMenu />
    </header>

    <ul class="full-menu__list">
      <li
        v-for="{ key, to, img: { alt, src } } in items"
        :key
        class="full-menu__item"
        @mouseenter="onMouseEnter(key)"
        @mouseleave="onMouseLeave"
      >
        <NuxtLink :to>{{ t(key) }}</NuxtLink>
        <img v-show="visibleImage === key" class="full-menu__img" :src :alt >
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.full-menu {
  color: $color-primary;
  z-index: $z-index-l;
  background-color: $color-secondary;

  position: absolute;
  inset: 0;
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__header {
    width: 100%;
    position: absolute;
    top: $distances-m;
    padding: 0 $distances-m;
  }

  &__list {
    font-size: $font-size-xxl;
    font-weight: 900;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: $distances-m;
  }
}
</style>
