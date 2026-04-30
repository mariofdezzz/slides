<template>
  <img :src="isDark ? darkSrc : lightSrc" />
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  lightSrc: String,
  darkSrc: String,
});

const isDark = ref(false);

onMounted(() => {
  isDark.value = document.documentElement.classList.contains("dark");

  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains("dark");
  });
  observer.observe(document.documentElement, { attributes: true });
});
</script>
