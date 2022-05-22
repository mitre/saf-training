export const themeData = {
  "blog": {
    "description": "A FrontEnd programmer",
    "intro": "/intro.html",
    "medias": {}
  },
  "encrypt": {},
  "pure": false,
  "iconAssets": "//at.alicdn.com/t/font_2410206_h4r1xw8ppng.css",
  "iconPrefix": "iconfont icon-",
  "darkmode": "switch",
  "themeColor": {
    "red": "#e74c3c",
    "blue": "#3498db",
    "green": "#3eaf7c",
    "orange": "#f39c12",
    "purple": "#8e44ad"
  },
  "fullscreen": true,
  "locales": {
    "/": {
      "lang": "en-US",
      "navbarLocales": {
        "langName": "English",
        "selectLangText": "Language",
        "selectLangAriaLabel": "Select language"
      },
      "metaLocales": {
        "author": "Author",
        "date": "Writing Date",
        "origin": "Original",
        "views": "Page views",
        "category": "Category",
        "tag": "Tags",
        "readingTime": "Reading Time",
        "words": "Words",
        "toc": "On This Page",
        "prev": "Prev",
        "next": "Next",
        "lastUpdated": "Last update",
        "contributors": "Contributors",
        "editLink": "Edit this page"
      },
      "blogLocales": {
        "article": "Articles",
        "articleList": "Article List",
        "category": "Category",
        "tag": "Tags",
        "timeline": "Timeline",
        "timelineTitle": "Yesterday Once More!",
        "all": "All",
        "intro": "Personal Intro",
        "star": "Star",
        "slides": "Slides",
        "encrypt": "Encrypted"
      },
      "paginationLocales": {
        "prev": "Prev",
        "next": "Next",
        "navigate": "Jump to",
        "action": "Go",
        "errorText": "Please enter a number between 1 and $page !"
      },
      "outlookLocales": {
        "themeColor": "Theme Color",
        "darkmode": "Theme Mode",
        "fullscreen": "Full Screen"
      },
      "encryptLocales": {
        "title": "Page Encrypted",
        "placeholder": "Enter password",
        "remember": "Remember password",
        "errorHint": "Please enter the correct password!"
      },
      "routeLocales": {
        "404msg": [
          "There’s nothing here.",
          "How did we get here?",
          "That’s a Four-Oh-Four.",
          "Looks like we've got some broken links."
        ],
        "back": "Go back",
        "home": "Take me home",
        "openInNewWindow": "Open in new window"
      },
      "blog": {},
      "repoDisplay": true,
      "navbarIcon": true,
      "navbarAutoHide": "mobile",
      "hideSiteNameonMobile": true,
      "sidebar": [
        {
          "icon": "creative",
          "text": "Course",
          "prefix": "/course/",
          "link": "/course/",
          "children": "structure"
        }
      ],
      "sidebarIcon": true,
      "headerDepth": 2,
      "author": {
        "name": "MITRE SAF Team",
        "url": "https://saf.mitre.org"
      },
      "logo": "/logo.svg",
      "repo": "mitre/inspec-developer",
      "docsDir": "demo/src",
      "navbar": [
        "/",
        {
          "text": "Course",
          "icon": "creative",
          "link": "/course/"
        },
        {
          "text": "Resources",
          "icon": "note",
          "link": "/resources/"
        },
        {
          "text": "Installation",
          "icon": "note",
          "link": "/installation/"
        }
      ],
      "footer": "Apache-2.0 | Copyright © 2022 - The MITRE Corporation",
      "displayFooter": true,
      "pageInfo": [
        "Original",
        "Date",
        "Category",
        "Tag",
        "ReadingTime"
      ]
    }
  }
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
