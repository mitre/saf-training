export const data = {
  "key": "v-fffb8e28",
  "path": "/guide/",
  "title": "Guides",
  "lang": "en-US",
  "frontmatter": {
    "index": false,
    "icon": "creative",
    "category": [
      "Guide"
    ],
    "summary": "Guides Page Config; Markdown Enhance; Function Disable; Encryption Demo;",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://mitre.github.io/inspec-developer/guide/"
        }
      ],
      [
        "meta",
        {
          "property": "og:site_name",
          "content": "SAF InSpec Profile Developers"
        }
      ],
      [
        "meta",
        {
          "property": "og:title",
          "content": "Guides"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "article"
        }
      ],
      [
        "meta",
        {
          "property": "og:locale",
          "content": "en-US"
        }
      ]
    ]
  },
  "excerpt": "",
  "headers": [],
  "readingTime": {
    "minutes": 0.04,
    "words": 13
  },
  "filePathRelative": "guide/README.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
