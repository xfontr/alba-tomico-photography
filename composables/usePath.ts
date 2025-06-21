import { useRoute } from "vue-router";
import { computed } from "vue";
import { VALID_PATHS } from "../configs/constants";
import type { Path } from "../types/Path";

const usePath = () => {
  const route = useRoute();

  const current = computed((): Path => route.path.replaceAll("/", ""));

  const isValid = computed(() => VALID_PATHS.includes(current.value));

  return { current, isValid };
};

export default usePath;
