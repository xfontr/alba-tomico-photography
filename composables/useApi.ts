import type api from "~/services/api";

const useApi = () => useNuxtApp().$api as ReturnType<typeof api>;

export default useApi;
