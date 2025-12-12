import DefaultTheme from 'vitepress/theme'
import giscusTalk from 'vitepress-plugin-comment-with-giscus'
import { useData, useRoute } from 'vitepress'
import { toRefs, onMounted, watch, nextTick } from 'vue'
import mediumZoom from 'medium-zoom'

export default {
  extends: DefaultTheme,

  setup() {
    // Get frontmatter and route
    const { frontmatter } = toRefs(useData())
    const route = useRoute()

    // Image zoom functionality
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' })
    }

    onMounted(() => {
      initZoom()
    })

    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )

    // Giscus comments configuration
    // Settings from https://giscus.app/ - uses existing saf-training repo
    giscusTalk(
      {
        repo: 'mitre/saf-training',
        repoId: 'R_kgDOH3sAZQ',
        category: 'Ideas',
        categoryId: 'DIC_kwDOH3sAZc4CRApY',
        mapping: 'pathname',
        inputPosition: 'top',
        lang: 'en',
        homePageShowComment: false, // Don't show comments on home page
        lightTheme: 'light',
        darkTheme: 'transparent_dark',
      },
      {
        frontmatter,
        route
      },
      true // Enable comments on all pages by default (can disable per-page with comment: false)
    )
  }
}
