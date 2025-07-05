<script lang="ts" setup>
import useEffectStore from "~/stores/effect.store";

const effect = useEffectStore(usePinia());
</script>

<template>
  <div :class="['invert-effect', { 'invert-effect--on': effect.isOn }]">
    <button class="invert-effect__toggle" @click="effect.toggle">⚡️</button>
  </div>
</template>

<style lang="scss" scoped>
.invert-effect {
  position: fixed;
  inset: 0;
  z-index: 99;
  height: 100vh;
  width: 100vw;
  pointer-events: none;

  &--on {
    backdrop-filter: invert(1);
  }

  &__toggle {
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    width: 44px;
    z-index: 11;
    position: absolute;
    bottom: 1.5rem;
    right: 2rem;
    cursor: pointer;
    pointer-events: all;
    filter: grayscale(1) brightness(100);
  }
}
</style>
