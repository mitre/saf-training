<template>
  <div v-if="lastUpdated" class="course-version">
    <span class="version-badge site-version">Site v{{ siteVersion }}</span>
    <span class="version-badge updated-badge">Updated: {{ formattedDate }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { site, frontmatter } = useData()

// Site version from config
const siteVersion = computed(() => site.value.version || '2.0.0')

// Last updated from frontmatter
const lastUpdated = computed(() => frontmatter.value.lastUpdated)

const formattedDate = computed(() => {
  if (!lastUpdated.value) return ''
  const date = new Date(lastUpdated.value)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
})
</script>

<style scoped>
.course-version {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0 1.5rem 0;
  flex-wrap: wrap;
}

.version-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

/* Site version - Orange/Warning theme */
.site-version {
  background-color: var(--vp-c-warning-soft);
  color: var(--vp-c-warning-1);
  border: 1px solid var(--vp-c-warning-2);
}

/* Updated date - Green/Tip theme */
.updated-badge {
  background-color: var(--vp-c-tip-soft);
  color: var(--vp-c-tip-1);
  border: 1px solid var(--vp-c-tip-2);
}

/* Dark mode automatically handled by VitePress CSS variables */
</style>
