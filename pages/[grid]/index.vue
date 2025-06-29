<script lang="ts" setup>
import * as d3 from "d3";
import type { ImgHTMLAttributes } from "vue";
import { CHAOTIC_VIEWS } from "~/configs/constants";
import useContentStore from "~/stores/content.store";
import type { Entry } from "~/types/Entry";
import type { Image } from "~/types/Image";
import type { DynamicPath } from "~/types/Path";

const baseSize = 150;
const scaleRange: [number, number] = [1, 2.6];
const margin = 60;

const content = useContentStore(usePinia());
const path = usePath();

const fronts = computed<Image[]>(() =>
  new Array(50)
    .fill(
      content.content[path.view.value!]?.children?.flatMap((child) =>
        (child as Entry).children?.filter((image) => (image as Image).front)
      )
    )
    .flat()
);

const isChaoticView = computed<boolean>(() =>
  CHAOTIC_VIEWS.includes(path.view.value as DynamicPath)
);

const frontsWithEmptySpaces = computed<(Image | undefined)[]>(() => {
  const result: (Image | undefined)[] = [];
  let i = 0;
  while (i < fronts.value.length) {
    const roll = Math.random();
    if (roll < 0.3) {
      result.push(undefined);
    } else {
      result.push(fronts.value[i]);
      i += 1;
    }
    if (Math.random() < 0.2) result.push(undefined);
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
        const minX = margin;
        const maxX = width - node.width - margin;
        const minY = margin;
        const maxY = height - node.height - margin;

        if (node.x < minX) node.x = minX;
        else if (node.x > maxX) node.x = maxX;

        if (node.y < minY) node.y = minY;
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
    .velocityDecay(0.3)
    .stop();

  for (let i = 0; i < 600; ++i) simulation.tick();

  const pos: Record<number, ImgHTMLAttributes["style"]> = {};
  for (const node of nodes) {
    pos[node.id] = {
      position: "absolute",
      top: `${node.y}px`,
      left: `${node.x}px`,
      width: `${node.width}px`,
      height: `${node.height}px`,
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
      v-for="(front, key) in isChaoticView ? fronts : frontsWithEmptySpaces"
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
  grid-auto-rows: 200px;
  row-gap: $distances-l;
  column-gap: $distances-s;

  &--chaotic {
    display: block;
    position: relative;
  }

  &__grid {
    width: 100%;
    height: 100%;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>
