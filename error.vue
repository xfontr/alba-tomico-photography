<script setup lang="ts">
import { addBrackets } from "#imports";
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const { t } = useI18n();

const message = computed<string>(() =>
  props.error.statusCode === 404
    ? (t("error.not_found") as string)
    : props.error.statusMessage ?? (t("error.default") as string)
);
</script>

<template>
  <div class="main">
    <div id="teleports" />

    <header class="main__header">
      <NavigationMenu />
    </header>

    <main class="error">
      <h1 class="error__heading">{{ error.statusCode }}</h1>
      <span class="error__name">{{ message }}</span>
      <span class="error__cta-text">{{ t("error.cta") }}</span>
      <NuxtLink to="/" class="error__home">{{
        addBrackets(t("error.go_back_home") as string)
      }}</NuxtLink>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding: $distances-m;
  height: 70vh;

  &__header {
    margin-bottom: $distances-l;
  }
}

.error {
  height: 100%;
  color: $color-primary;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: $distances-m;

  &__heading {
    font-size: calc(1.5 * $font-size-xxl);
    font-weight: 900;
  }

  &__name {
    font-size: $font-size-l;
  }

  &__cta-text {
    font-size: $font-size-m;
  }

  &__home {
    margin-top: $distances-m;
  }
}
</style>
