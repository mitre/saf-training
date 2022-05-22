export const data = {
  "key": "v-e52c881c",
  "path": "/article/",
  "title": "Articles",
  "lang": "en-US",
  "frontmatter": {
    "title": "Articles",
    "blog": {
      "type": "type",
      "key": "article"
    },
    "layout": "Blog",
    "summary": "",
    "head": [
      [
        "meta",
        {
          "property": "og:url",
          "content": "https://mitre.github.io/inspec-developer/article/"
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
          "content": "Articles"
        }
      ],
      [
        "meta",
        {
          "property": "og:type",
          "content": "website"
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
    "minutes": 0,
    "words": 0
  },
  "filePathRelative": null
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
