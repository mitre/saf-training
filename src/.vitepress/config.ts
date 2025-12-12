import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'
import { generateSidebar } from 'vitepress-sidebar'
import { fileURLToPath, URL } from 'node:url'

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: 'MITRE SAF Training - InSpec, STIG Development & Security Automation',
    description: 'Free comprehensive training for InSpec profile development, STIG creation, and security automation. Learn compliance as code, security testing, and infrastructure validation.',

    base: process.env.GITHUB_DEPLOY === 'true' ? '/saf-training/' : '/',

    // Ignore dead links for now (can enable later)
    ignoreDeadLinks: true,

    // Vite configuration for proper asset handling
    vite: {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../', import.meta.url))
        }
      }
    },

    // SEO: Meta tags
    head: [
      ['meta', { name: 'keywords', content: 'InSpec training, STIG development, security automation, compliance as code, InSpec tutorial, STIG automation, security testing, infrastructure testing, DoD compliance, FedRAMP' }],
      ['meta', { property: 'og:title', content: 'MITRE SAF Training - Free InSpec & Security Automation Courses' }],
      ['meta', { property: 'og:description', content: 'Master InSpec, STIG development, and security automation with hands-on training from MITRE.' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:url', content: 'https://mitre.github.io/saf-training/' }],
      ['meta', { property: 'og:image', content: 'https://mitre.github.io/saf-training/logo.svg' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['link', { rel: 'canonical', href: 'https://mitre.github.io/saf-training/' }]
    ],

    themeConfig: {
      logo: '/logo.svg',

      // SEO-Optimized Navigation
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Getting Started', link: '/getting-started/' },
        {
          text: 'InSpec Training',
          items: [
            { text: 'Beginner Tutorial', link: '/inspec-training/beginner/' },
            { text: 'Advanced Development', link: '/inspec-training/advanced/' },
            { text: 'Profile Development & Testing', link: '/inspec-training/profile-development/' },
          ]
        },
        {
          text: 'STIG Development',
          link: '/stig-development/'
        },
        {
          text: 'Security Automation',
          items: [
            { text: 'SAF Delta Tool', link: '/security-automation/delta/' },
            { text: 'OHDF Mapper Development', link: '/security-automation/mappers/' },
          ]
        },
        {
          text: 'Resources',
          items: [
            { text: 'Lab Environments', link: '/resources/02' },
            { text: 'Training Development', link: '/resources/03' },
            { text: 'Installation', link: '/installation/' },
          ]
        }
      ],

      // Auto-generated sidebars with proper titles
      sidebar: generateSidebar([
        {
          documentRootPath: 'src',
          scanStartPath: 'getting-started',
          resolvePath: '/getting-started/',
          useTitleFromFrontmatter: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: false,
          sortMenusOrderByDescending: false,
          collapsed: false,
          hyphenToSpace: true,
          excludeFiles: ['06-vitepress.md', 'index-vuepress.md'],
        },
        {
          documentRootPath: 'src',
          scanStartPath: 'inspec-training/beginner',
          resolvePath: '/inspec-training/beginner/',
          useTitleFromFrontmatter: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: false,
          sortMenusOrderByDescending: false,
          collapsed: false,
          hyphenToSpace: true,
          excludeFiles: ['06-vitepress.md'],
        },
        {
          documentRootPath: 'src',
          scanStartPath: 'inspec-training/advanced',
          resolvePath: '/inspec-training/advanced/',
          useTitleFromFrontmatter: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: false,
          sortMenusOrderByDescending: false,
          collapsed: false,
          hyphenToSpace: true,
        },
        {
          documentRootPath: 'src',
          scanStartPath: 'inspec-training/profile-development',
          resolvePath: '/inspec-training/profile-development/',
          useTitleFromFrontmatter: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: false,
          sortMenusOrderByDescending: false,
          collapsed: false,
          hyphenToSpace: true,
        },
        {
          documentRootPath: 'src',
          scanStartPath: 'stig-development',
          resolvePath: '/stig-development/',
          useTitleFromFrontmatter: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: false,
          sortMenusOrderByDescending: false,
          collapsed: false,
          hyphenToSpace: true,
        },
        {
          documentRootPath: 'src',
          scanStartPath: 'security-automation/delta',
          resolvePath: '/security-automation/delta/',
          useTitleFromFrontmatter: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: false,
          sortMenusOrderByDescending: false,
          collapsed: false,
          hyphenToSpace: true,
        },
        {
          documentRootPath: 'src',
          scanStartPath: 'security-automation/mappers',
          resolvePath: '/security-automation/mappers/',
          useTitleFromFrontmatter: true,
          useFolderTitleFromIndexFile: true,
          sortMenusByFrontmatterOrder: false,
          sortMenusOrderByDescending: false,
          collapsed: false,
          hyphenToSpace: true,
        }
      ]),

      socialLinks: [
        { icon: 'github', link: 'https://github.com/mitre/saf-training' }
      ],

      footer: {
        message: 'Apache-2.0 | Copyright © 2023 | The MITRE Corporation',
      },

      // Search
      search: {
        provider: 'local'
      }
    },

    // Markdown configuration
    markdown: {
      // Enable line numbers in code blocks
      lineNumbers: true,

      // Enable tabs plugin
      config: (md) => {
        md.use(tabsMarkdownPlugin)
      },

      // Math support (if needed)
      // math: true,
    },

    // Mermaid configuration
    mermaid: {
      // Mermaid config options
    },

    // Sitemap generation
    sitemap: {
      hostname: 'https://mitre.github.io/saf-training/'
    }
  })
)
