<script lang="ts" setup>
import * as d3 from "d3";
import type { ImgHTMLAttributes } from "vue";
import { CHAOTIC_VIEWS } from "~/configs/constants";
import { LAYOUT } from "~/configs/layout";
import useContentStore from "~/stores/content.store";
import type { Image } from "~/types/Image";
import type { DynamicPath } from "~/types/Path";

const baseSize = 150;
const scaleRange: [number, number] = [1, 2.6];
const margin = 60;

const { getFolders } = useContentStore(usePinia());
const path = usePath();

const fronts = computed<Image[]>(() =>
  getFolders(path.view.value!)
    ?.flatMap((child) => child.children?.filter(({ front }) => front))
    .flat()
);

const isChaoticView = computed<boolean>(() =>
  CHAOTIC_VIEWS.includes(path.view.value as DynamicPath)
);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!! AI GARBAGE CODE ALERT !!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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

const getPositions = (): Record<number, ImgHTMLAttributes["style"]> => {
  const width = window.innerWidth - 200;
  const height = window.innerHeight * 10;

  const nodes = fronts.value.map((_, i) => {
    const scale =
      Math.random() * (scaleRange[1] - scaleRange[0]) + scaleRange[0];
    const w = baseSize * scale;
    const h = baseSize * scale * (Math.random() * 0.6 + 0.8);

    return {
      id: i,
      width: w,
      height: h,
      x: Math.random() * (width - w - margin * 2) + margin,
      y: Math.random() * (height - h - margin * 2) + margin,
      vx: 0,
      vy: 0,
    };
  });

  const forceBoundingBox = ({
    width,
    height,
    margin,
  }: {
    width: number;
    height: number;
    margin: number;
  }) => {
    return () => {
      for (const node of nodes) {
        const maxX = width - node.width - margin;
        const maxY = height - node.height - margin;

        if (node.x < margin) node.x = margin;
        else if (node.x > maxX) node.x = maxX;

        if (node.y < margin) node.y = margin;
        else if (node.y > maxY) node.y = maxY;
      }
    };
  };

  const simulation = d3
    .forceSimulation(nodes)
    .force("x", d3.forceX(width / 2).strength(0.01))
    .force("y", d3.forceY(height / 2).strength(0.01))
    .force(
      "collide",
      d3.forceCollide(
        ({ width, height }) => Math.hypot(width, height) / 2 + margin
      )
    )
    .force("bounding", forceBoundingBox({ width, height, margin }))
    .velocityDecay(0.5)
    .stop();

  for (let i = 0; i < 600; ++i) simulation.tick();

  const pos: Record<number, ImgHTMLAttributes["style"]> = {};

  for (const { id, y, x, width, height } of nodes) {
    pos[id] = {
      position: "absolute",
      top: `${y}px`,
      left: `${x}px`,
      width: `${width}px`,
      height: `${height}px`,
    };
  }

  return pos;
};

const getLocation = (index: number) => positions.value[index] || {};

onMounted(() => {
  if (!isChaoticView.value) return;

  positions.value = getPositions();
});
</script>

<template>
  <section :class="['repository', { 'repository--chaotic': isChaoticView }]">
    <div
      v-for="(front, key) in isChaoticView ? fronts : frontsWithLayout"
      :key="`item-${key}`"
      class="repository__grid"
      :style="getLocation(key)"
    >
      <NuxtLink v-if="front?.alt" :to="front.post">
        <img class="repository__img" :src="front.src" :alt="front.alt" />
      </NuxtLink>
    </div>
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
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
