<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import type { ImgHTMLAttributes } from "vue";
import {
  AVAILABLE_PATHS,
  CHAOTIC_VIEWS,
  ZOOMABLE_VIEWS,
} from "~/configs/constants";
import { LAYOUT } from "~/configs/layout";
import useContentStore from "~/stores/content.store";
import type { Image } from "~/types/Image";
import type { PredefinedPath, StaticPath } from "~/types/Path";

const { content, getFolders } = useContentStore(usePinia());
const path = usePath();

const repository = ref<HTMLElement>();

const fronts = computed<Image[]>(() => {
  const children = content[path.view.value!]?.children ?? [];
  const isOnlyFrontals = !!(children[0] as Image)?.src;

  if (!isOnlyFrontals) {
    return (
      (getFolders(path.view.value!)?.map((child) => ({
        ...child.children?.find(({ front }) => front),
        index: child.index,
      })) as Image[]) ?? []
    );
  }

  return children as Image[];
});

const isChaoticView = computed<boolean>(() =>
  CHAOTIC_VIEWS.includes(path.view.value as StaticPath)
);

const getResponsiveBaseSize = (): number => {
  const width = window.innerWidth;
  if (width < 480) return 80;
  if (width < 768) return 100;
  if (width < 1024) return 120;
  if (width < 1280) return 135;
  return 150;
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
      } else break;
    } else {
      if (imageIndex < images.length) {
        result.push(undefined);
      } else break;
    }
  }

  return result;
});

const positions = ref<
  Record<number, ImgHTMLAttributes["style"] & { aspectRatio?: string }>
>({});

const getLocation = (index: number) => {
  const pos = positions.value[index];
  if (!pos) return {};

  const { aspectRatio, ...rest } = pos as any;
  if (aspectRatio) {
    return { ...rest, aspectRatio };
  }
  return rest;
};

const canZoom = computed(() => ZOOMABLE_VIEWS.includes(path.view.value!));

let observer: IntersectionObserver;

onMounted(async () => {
  if (!AVAILABLE_PATHS.includes(path.view.value as PredefinedPath)) {
    throw createError({
      statusCode: 404,
      statusMessage: useI18n().t("error.not_found") as string,
    });
  }

  repository.value!.style.display = isChaoticView.value ? "hidden" : "visible";

  if (isChaoticView.value) {
    const preloadImages = async (images: Image[]) => {
      await Promise.all(
        images.map((img) => {
          return new Promise((resolve) => {
            const el = new Image();
            el.onload = () => {
              img.naturalWidth = el.naturalWidth;
              img.naturalHeight = el.naturalHeight;
              resolve(true);
            };
            el.src = img.src;
          });
        })
      );
    };

    await preloadImages(fronts.value);

    // store aspectRatio for each image
    fronts.value.forEach((img, idx) => {
      positions.value[idx] = {
        ...(positions.value[idx] as any),
        aspectRatio: `${img.naturalWidth} / ${img.naturalHeight}`,
      };
    });

    const w = window.innerWidth;
    const h = (window.innerHeight * fronts.value.length) / (w < 480 ? 2.9 : 2);
    const baseSize = getResponsiveBaseSize();
    positions.value = generateMatterLayout(fronts.value, w, h, baseSize) as any;
    document.body.style.height = h + "px";

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio > 0) {
            entry.target.classList.add("in-view");
          }
        }
      },
      { rootMargin: "0px", threshold: 0.2 }
    );

    setTimeout(() => {
      let imgs = document.querySelectorAll(".repository__img-cover");
      imgs = imgs.length ? imgs : document.querySelectorAll(".repository__img");
      imgs.forEach((el) => observer.observe(el));
    }, 150);

    repository.value!.style.display = "visible";
  }
});

onBeforeUnmount(() => {
  document.body.style.height = "fit-content";
  observer?.disconnect?.();
});
</script>

<template>
  <section
    ref="repository"
    :class="['repository', { 'repository--chaotic': isChaoticView }]"
  >
    <ClientOnly>
      <div
        v-for="(front, key) in isChaoticView ? fronts : frontsWithLayout"
        :key="`item-${key}`"
        :class="['repository__grid', { 'repository__grid--zoom': canZoom }]"
      >
        <NuxtLink
          v-if="front?.alt && front.front"
          class="repository__link"
          :to="front.post"
        >
          <div class="repository__img-cover" :style="getLocation(key)">
            <h4 class="repository__img-title">
              {{
                front.post
                  .split("/")
                  .at(-1)
                  ?.toLocaleUpperCase()
                  .split("-")
                  .join(" ")
              }}
            </h4>
            <img class="repository__img" :src="front.src" :alt="front.alt" />
          </div>
        </NuxtLink>

        <!-- NON-CHAOTIC --ZOOM -->
        <div
          v-else-if="front?.alt"
          class="repository__img-wrapper"
          :style="getLocation(key)"
        >
          <img
            :class="['repository__img', { 'repository__img--zoom': canZoom }]"
            :src="front.src"
            :alt="front.alt"
          />
        </div>
      </div>
    </ClientOnly>
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
    pointer-events: none;

    &--zoom {
      pointer-events: all;

      &:hover {
        z-index: 10;
      }

      overflow: visible;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    position: relative;
    transition: transform 0.35s cubic-bezier(0.075, 0.82, 0.165, 1);
    transform-origin: center;
    image-rendering: auto;
    backface-visibility: hidden;

    &--zoom {
      height: 100% !important;
      object-fit: contain;
    }

    &--zoom:hover {
      transform: scale(1.4);
      z-index: 10;
    }

    &.in-view {
      transform: translateY(-100px);
    }
  }

  &__link {
    pointer-events: all;
  }

  &__img-cover {
    position: relative;
    transition: 0.3s;

    &.in-view {
      transform: translateY(-100px);
    }

    &::after {
      content: "";
      position: absolute;
      inset: 0;
      transition: 0.3s;
    }

    &:hover::after {
      -webkit-backdrop-filter: blur(8px);
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

  &__img-wrapper {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4; // fallback
    overflow: visible;

    .repository__img {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
