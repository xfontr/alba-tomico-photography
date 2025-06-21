<script lang="ts" setup>
import type { MenuItem } from "~/types/MenuItem";

const { disabled = false } = defineProps<{
  items: MenuItem[];
  disabled?: boolean;
}>();

const open = defineModel<boolean>({ default: false });

const { t: i18n } = useI18n();

const visibleImage = ref<string>();

const onMouseEnter = (key: string): void => {
  visibleImage.value = key;
};

const onMouseLeave = (): void => {
  visibleImage.value = undefined;
};

const t = (key: string): string => i18n(`menu.${key}`) as string;

onMounted(() => {
  document.addEventListener("close-menu", () => {
    open.value = false;
  });
});

const toggle = () => {
  if (disabled) {
    closeMenu();
    return;
  }

  open.value = !open.value;
};
</script>

<template>
  <div @click="toggle">
    <slot />
  </div>
  <ClientOnly>
    <Teleport to="#teleports">
      <section v-if="open && !disabled" class="full-menu">
        <header class="full-menu__header">
          <NavigationMenu :is-full-menu-open="true" />
        </header>

        <ul class="full-menu__list">
          <li
            v-for="{ key, to, img: { alt, src } } in items"
            :key
            class="full-menu__item"
            @mouseenter="onMouseEnter(key)"
            @mouseleave="onMouseLeave"
          >
            <NuxtLink :to @click="open = false">{{ t(key) }}</NuxtLink>
            <img
              v-show="visibleImage === key"
              class="full-menu__img"
              :src
              :alt
            />
          </li>
        </ul></section></Teleport
  ></ClientOnly>
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
