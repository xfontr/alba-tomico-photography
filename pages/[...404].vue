<script lang="ts" setup>
throw createError({
  statusCode: 404,
  statusMessage: useI18n().t("error.not_found") as string,
});
</script>
