import { useRoute } from "vue-router";
import { computed } from "vue";
import type { DynamicPath, PredefinedPath } from "../types/Path";
import { DYNAMIC_VIEWS, STATIC_VIEWS } from "~/configs/constants";

const AVAILABLE_PATHS: PredefinedPath[] = [...DYNAMIC_VIEWS, ...STATIC_VIEWS];

const usePath = () => {
  const route = useRoute();

  const view = computed<PredefinedPath | undefined>(() => {
    const current = route.path.split("/")[1] as PredefinedPath;

    if (AVAILABLE_PATHS.includes(current)) {
      return current;
    }

    return undefined;
  });

  const project = computed<string | undefined>(() => {
    const current = route.path.split("/")[2];

    if (!view.value || !DYNAMIC_VIEWS.includes(view.value as DynamicPath)) {
      return undefined;
    }

    return current.toLowerCase();
  });

  return { view, project };
};

export default usePath;
