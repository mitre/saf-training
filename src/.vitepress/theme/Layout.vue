<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { onMounted } from 'vue'

const { Layout } = DefaultTheme

function showCookiePreferences() {
  const osano = (window as any).Osano?.cm
  if (osano) {
    osano.showDrawer('osano-cm-dom-info-dialog-open')
  }
}

onMounted(() => {
  const link = document.querySelector('.manage-cookies')
  if (link) {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      showCookiePreferences()
    })
  }
})
</script>

<template>
  <Layout>
    <template #doc-after>
      <div class="custom-footer">
        <div class="footer-links">
          <a href="/privacy-policy" class="footer-link">Privacy Policy</a>
          <span class="footer-sep">&bull;</span>
          <a href="javascript:void(0)" class="footer-link manage-cookies">Manage Cookies</a>
        </div>
        <p class="footer-meta">
          MITRE Security Automation Framework (MITRE SAF™) is a trademark of The MITRE Corporation.
          Released under the Apache 2.0 License.
        </p>
        <p class="footer-meta">Copyright &copy; 2026 The MITRE Corporation</p>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.custom-footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.footer-links {
  margin-bottom: 0.5rem;
}

.footer-link {
  color: var(--vp-c-text-2);
  text-decoration: none;
}

.footer-link:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

.footer-sep {
  margin: 0 0.5rem;
  color: var(--vp-c-text-3);
}

.footer-meta {
  margin: 0.25rem 0;
  line-height: 1.5;
}
</style>
