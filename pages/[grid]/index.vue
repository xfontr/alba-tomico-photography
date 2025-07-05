<script lang="ts" setup>
import type { ImgHTMLAttributes } from "vue";
import { CHAOTIC_VIEWS, ZOOMABLE_VIEWS } from "~/configs/constants";
import { LAYOUT } from "~/configs/layout";
import useContentStore from "~/stores/content.store";
import type { Image } from "~/types/Image";
import type { StaticPath } from "~/types/Path";

const { content, getFolders } = useContentStore(usePinia());
const path = usePath();

const fronts = computed<Image[]>(() => {
  const children = content[path.view.value!]?.children ?? [];
  const isOnlyFrontals = !!(children[0] as Image)?.src;

  if (!isOnlyFrontals) {
    return (
      getFolders(path.view.value!)
        ?.flatMap((child) => child.children?.filter(({ front }) => front))
        .flat() ?? []
    );
  }

  return children as Image[];
});

const isChaoticView = computed<boolean>(() =>
  CHAOTIC_VIEWS.includes(path.view.value as StaticPath)
);

const getResponsiveBaseSize = (): number => {
  const width = window.innerWidth;
  if (width < 480) return 80; // mobile
  if (width < 768) return 100; // small tablets
  if (width < 1024) return 120; // medium
  if (width < 1280) return 135; // large
  return 150; // desktop+
};

const frontsWithLayout = computed<(Image | undefined)[]>(() => {
  const images = fronts.value;
  const result: (Image | undefined)[] = [];

  let imageIndex = 0;
  for (const slot of LAYOUT) {
    if (slot === "img") {
      if (imageIndex < images.length) {
        result.push(images[imageIndex]);
        imageIndex++;
      } else {
        break;
      }
    } else {
      if (imageIndex < images.length) {
        result.push(undefined);
      } else {
        break;
      }
    }
  }

  return result;
});

const positions = ref<Record<number, ImgHTMLAttributes["style"]>>({});

const getLocation = (index: number) => positions.value[index] || {};

const canZoom = computed<boolean>(() =>
  ZOOMABLE_VIEWS.includes(path.view.value!)
);

onMounted(() => {
  if (isChaoticView.value) {
    const w = window.innerWidth;
    const h = (window.innerHeight * fronts.value.length) / 2;
    const baseSize = getResponsiveBaseSize();
    positions.value = generateMatterLayout(fronts.value, w, h, baseSize);
    document.body.style.height = h + "px";
  }
});

onUnmounted(() => {
  document.body.style.height = "fit-content";
});
</script>

<template>
  <section :class="['repository', { 'repository--chaotic': isChaoticView }]">
    <ClientOnly>
      <div
        v-for="(front, key) in isChaoticView ? fronts : frontsWithLayout"
        :key="`item-${key}`"
        :class="['repository__grid', { 'repository__grid--zoom': canZoom }]"
      >
        <NuxtLink v-if="front?.alt && front.front" :to="front.post">
          <div class="repository__img-cover" :style="getLocation(key)">
            <h4 class="repository__img-title">
              {{ front.post.split("/").at(-1)?.toLocaleUpperCase() }}
            </h4>
            <img class="repository__img" :src="front.src" :alt="front.alt" />
          </div>
        </NuxtLink>
        <img
          v-else-if="front?.alt"
          :style="getLocation(key)"
          :class="['repository__img', { 'repository__img--zoom': canZoom }]"
          :src="front.src"
          :alt="front.alt"
        /></div
    ></ClientOnly>
  </section>
</template>

<style lang="scss" scoped>
.repository {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: $distances-s;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  &--chaotic {
    position: relative;
  }

  &__grid {
    width: 100%;
    aspect-ratio: 3 / 4;
    z-index: 0;
    overflow: hidden;

    &:hover {
      z-index: 10;
    }

    &:hover .repository__img--zoom {
      transform: scale(2.2);
    }

    &--zoom {
      overflow: visible;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: relative;

    &--zoom {
      transition: transform 0.35s cubic-bezier(0.075, 0.82, 0.165, 1);
      will-change: transform;
      transform-origin: center;
    }
  }

  &__img-cover {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      transition: 0.3s;
    }

    &:hover::after {
      backdrop-filter: blur(8px);
    }

    &:hover .repository__img-title {
      opacity: 1;
    }
  }

  &__img-title {
    opacity: 0;
    transition: 0.3s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
    text-align: center;
    color: $color-primary;
    z-index: 1;
  }
}
</style>
