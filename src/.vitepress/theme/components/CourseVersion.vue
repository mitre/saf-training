<template>
  <div class="course-version">
    <span class="version-badge release-badge">
      Release v{{ siteVersion }}
    </span>
    <span class="version-badge date-badge" v-if="releaseDate">
      Released {{ formattedDate }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { site } = useData()

// Site version from config (package.json)
const siteVersion = computed(() => site.value.version || '2.0.0')

// Release date from config
const releaseDate = computed(() => site.value.releaseDate || '2025-12-13')

const formattedDate = computed(() => {
  if (!releaseDate.value) return ''
  const date = new Date(releaseDate.value)
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

/* Release version - Orange/Warning theme */
.release-badge {
  background-color: #f59e0b26;
  color: #d97706;
  border: 1px solid #f59e0b80;
}

/* Release date - Green theme */
.date-badge {
  background-color: #10b98126;
  color: #059669;
  border: 1px solid #10b98180;
}

/* Dark mode automatically handled by VitePress CSS variables */
</style>
