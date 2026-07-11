<template>
  <video :src="isDark ? darkSrc : lightSrc" autoplay loop playsinline />
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
