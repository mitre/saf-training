export const data = {
  "key": "v-184f4da6",
  "path": "/intro.html",
  "title": "Intro Page",
  "lang": "en-US",
  "frontmatter": {
    "icon": "info",
    "summary": "Intro Page Place your introducation and profile here.",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://mitre.github.io/inspec-developer/intro.html"
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
          "content": "Intro Page"
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
    "minutes": 0.03,
    "words": 8
  },
  "filePathRelative": "intro.md"
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
