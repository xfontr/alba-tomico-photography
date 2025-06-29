<script lang="ts" setup>
import useContentStore from "~/stores/content.store";
import type { Image } from "~/types/Image";
import type { MenuItems } from "~/types/MenuItem";
import type { DynamicPath } from "~/types/Path";

const { disabled = false } = defineProps<{
  items: MenuItems;
  disabled?: boolean;
}>();

const content = useContentStore(usePinia());

const open = defineModel<boolean>({ default: false });

const { t: i18n } = useI18n();

const currentHover = ref<DynamicPath>();
const images = ref<Image[]>([]);

const t = (key: string): string =>
  i18n(`menu.${key.split(" ").join("_")}`) as string;

const onMouseEnter = (key: string): void => {
  currentHover.value = key as DynamicPath;
  images.value = content.getFrontals(currentHover.value);
};

const onMouseLeave = () => {
  // images.value = [];
  // currentHover.value = undefined;
};

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

const toUrl = (key: string): string => `/${key.split(" ").join("-")}`;

const close = () => {
  setTimeout(() => {
    open.value = false;
  }, 150);
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
            v-for="key in items"
            :key
            class="full-menu__item"
            @mouseenter="onMouseEnter(key)"
            @mouseleave="onMouseLeave"
          >
            <NuxtLink :to="toUrl(key)" @click="close">{{ t(key) }}</NuxtLink>
            <SingleCarousel class="full-menu__img" :images />
          </li>
        </ul></section></Teleport
  ></ClientOnly>
</template>

<style lang="scss" scoped>
.full-menu {
  color: $color-primary;
  z-index: $z-index-l;
  background-color: $color-secondary;

  position: fixed;
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
    position: relative;
    font-size: $font-size-xxl;
    font-weight: 900;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: $distances-m;
  }

  &__img {
    position: absolute;
    bottom: 60%;
    right: -60%;
  }
}
</style>
