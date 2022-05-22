import { Vuepress } from '@vuepress/client'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"MITRE InSpec Profile Developers Course","icon":"home","type":"home","readingTime":{"minutes":0,"words":0},"excerpt":""},["/index.html","/README.md"]],
  ["v-184f4da6","/intro.html",{"title":"Intro Page","icon":"info","type":"article","readingTime":{"minutes":0.03,"words":8},"excerpt":"Intro Page Place your introducation and profile here."},["/intro","/intro.md"]],
  ["v-0e503981","/slide.html",{"title":"Slide page","icon":"slides","type":"slide","readingTime":{"minutes":3.22,"words":965},"excerpt":"@slidestart Slide Demo A simple slide demo and useful hints. \" By Mr.Hope. Please scroll mousewheel down to the next slide\" --- Marking Slides 👇 -- Marking Slides Use --- to mark "},["/slide","/slide.md"]],
  ["v-5fae495c","/course/02.html",{"title":"Starting the Journey","icon":"page","type":"article","readingTime":{"minutes":1.37,"words":412},"excerpt":"Starting the Journey InSpec Profiles InSpec organizes its work in what it calls Profiles. A profile is a set of automated tests that usually relates directly back to a Security Req","author":"Aaron Lippold"},["/course/02","/course/02.md"]],
  ["v-616321fb","/course/03.html",{"title":"Studying an InSpec Profile","icon":"page","type":"article","readingTime":{"minutes":2.59,"words":778},"excerpt":"Studying an InSpec profile Let's start by creating a profile that will contain NGINX tests. At your terminal, type: The terminal output should look like the following: Understandin","author":"Aaron Lippold"},["/course/03","/course/03.md"]],
  ["v-6317fa9a","/course/04.html",{"title":"Exploring the InSpec Shell","icon":"page","type":"article","readingTime":{"minutes":5.54,"words":1662},"excerpt":"Exploring the InSpec Shell Before we test our NGINX configuration, let's plan which resources and matchers we'll need. When writing InSpec code, many resources are available to you","author":"Aaron Lippold"},["/course/04","/course/04.md"]],
  ["v-64ccd339","/course/05.html",{"title":"Writing InSpec Controls","icon":"page","type":"article","readingTime":{"minutes":5.39,"words":1616},"excerpt":"Writing InSpec Controls Now that you understand which methods map to each requirement, you're ready to write InSpec controls. Security & Configuration Requirements Recall from Sect","author":"Aaron Lippold"},["/course/05","/course/05.md"]],
  ["v-6681abd8","/course/06.html",{"title":"Generating InSpec Results","icon":"page","type":"article","readingTime":{"minutes":1.21,"words":362},"excerpt":"Generating InSpec Results InSpec allows you to output your test results to one or more reporters. You can configure the reporter(s) using either the --json-config option or the --r","author":"Aaron Lippold"},["/course/06","/course/06.md"]],
  ["v-68368477","/course/07.html",{"title":"Viewing and Analyzing Results","icon":"page","type":"article","readingTime":{"minutes":0.25,"words":74},"excerpt":"Viewing and Analyzing Results Navigate to the web page for Heimdall Lite Click on the button Upload and navigate to your json output file that you saved from your previous step and","author":"Aaron Lippold"},["/course/07","/course/07.md"]],
  ["v-69eb5d16","/course/08.html",{"title":"InSpec Examples","icon":"page","type":"article","readingTime":{"minutes":1.51,"words":454},"excerpt":"Inspec Examples rSpec Explicit Subject Here we have a inspec test that lists out it's current directory. Our original test code looks like this If we would like to have a more Expl","author":"Aaron Lippold"},["/course/08","/course/08.md"]],
  ["v-6ba035b5","/course/09.html",{"title":"Profile Inheritance & Overlays","icon":"page","type":"article","readingTime":{"minutes":3.92,"words":1175},"excerpt":"Profile Inheritance and Overlays In addition to its own controls, an InSpec profile can bring in the controls from another InSpec profile. Additionally, when inheriting the control","author":"Aaron Lippold"},["/course/09","/course/09.md"]],
  ["v-ddaa5942","/course/10.html",{"title":"From STIG to Profile","icon":"page","type":"article","readingTime":{"minutes":3.41,"words":1024},"excerpt":"From STIG to Profile Download STIG Requirements Download the latest STIG Viewer located here STIG Viewer Download the Red Hat Enterprise Linux 8 STIG - Ver 1, Rel 5 located here RH","author":"Aaron Lippold"},["/course/10","/course/10.md"]],
  ["v-b9c2d34a","/course/",{"title":"Course Overview","icon":"page","type":"article","readingTime":{"minutes":0.67,"words":202},"excerpt":"InSpec 101 InSpec is an open-source, community-developed compliance validation framework; Provides a mechanism for defining machine-readable compliance and security requirements; E","author":"Aaron Lippold"},["/course/index.html","/course/README.md"]],
  ["v-2ae58894","/installation/LinuxInstall.html",{"title":"Installing InSpec on Linux","icon":"page","type":"article","readingTime":{"minutes":0.53,"words":159},"excerpt":"Install InSpec on Linux Option 1 (Package installer) The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at InSpec Downloads or insta","author":"Aaron Lippold"},["/installation/LinuxInstall","/installation/LinuxInstall.md"]],
  ["v-59a19ede","/installation/MacInstall.html",{"title":"Installing InSpec on MacOS","icon":"page","type":"article","readingTime":{"minutes":0.69,"words":208},"excerpt":"Install InSpec on Mac Option 1 (Package installer) The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at InSpec Downloads or install","author":"Aaron Lippold"},["/installation/MacInstall","/installation/MacInstall.md"]],
  ["v-08a5d2dc","/installation/",{"title":"Installing InSpec On Your Machine","icon":"page","type":"article","readingTime":{"minutes":0.14,"words":43},"excerpt":"Installing InSpec You can install InSpec in many ways on your system. Install on MacOS; Install on Linux; Install on Windows; Should you have any issues, take a look at the core do","author":"Aaron Lippold"},["/installation/index.html","/installation/README.md"]],
  ["v-4f4ac476","/installation/WindowsInstall.html",{"title":"Installing InSpec on Windows","icon":"page","type":"article","readingTime":{"minutes":0.84,"words":251},"excerpt":"Install InSpec on Windows Install Ruby Go to https://rubyinstaller.org/downloads/ and download and install the newest ruby that corresponds with your operating system, it will look","author":"Aaron Lippold"},["/installation/WindowsInstall","/installation/WindowsInstall.md"]],
  ["v-fffb8e28","/guide/",{"title":"Guides","icon":"creative","type":"article","readingTime":{"minutes":0.04,"words":13},"excerpt":"Guides Page Config; Markdown Enhance; Function Disable; Encryption Demo;","category":["Guide"]},["/guide/index.html","/guide/README.md"]],
  ["v-4c863446","/guide/disable.html",{"title":"Component disabled","icon":"config","type":"article","readingTime":{"minutes":0.14,"words":42},"excerpt":"<p>You can disable some functions on the page by setting the Frontmatter of the page.</p>\n","category":["Guide"],"tag":["disable"]},["/guide/disable","/guide/disable.md"]],
  ["v-bf720700","/guide/encrypt.html",{"title":"Encryption Article","icon":"lock","type":"article","readingTime":{"minutes":0.28,"words":84},"excerpt":"Encryption Article The actual article content. Paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 text paragraph 1 te","category":["Guide"],"tag":["encryption"]},["/guide/encrypt","/guide/encrypt.md"]],
  ["v-0978b044","/guide/markdown.html",{"title":"Markdown Enhance","icon":"markdown","type":"article","readingTime":{"minutes":2.27,"words":680},"excerpt":"<p>Every document page in VuePress is rendered by Markdown.</p>\n<p>You need to build your document or blog page by creating and writing Markdown in the corresponding path.</p>\n","category":["Guide"],"tag":["Markdown"]},["/guide/markdown","/guide/markdown.md"]],
  ["v-4eaf9f84","/guide/page.html",{"title":"page config","icon":"page","type":"article","readingTime":{"minutes":0.38,"words":115},"excerpt":"<p>Content before <code v-pre>more</code> comment is regarded as page excerpt.</p>\n","author":"Ms.Hope","date":"2020-01-01T00:00:00.000Z","category":["Guide"],"tag":["Page config","Guide"],"sticky":true,"star":true},["/guide/page","/guide/page.md"]],
  ["v-5a814a99","/posts/article10.html",{"title":"Article 10","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 10 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-10T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article10","/posts/article10.md"]],
  ["v-5c362338","/posts/article11.html",{"title":"Article 11","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 11 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-11T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article11","/posts/article11.md"]],
  ["v-5deafbd7","/posts/article12.html",{"title":"Article 12","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 12 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-12T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"],"star":true},["/posts/article12","/posts/article12.md"]],
  ["v-7beb5be1","/posts/article9.html",{"title":"Article 9","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 9 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-09T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article9","/posts/article9.md"]],
  ["v-7fe15663","/resources/",{"title":"Class Resources","type":"article","readingTime":{"minutes":1.33,"words":400},"excerpt":"Class Resources Code Background & Primers Ruby Tutorials and Documentation ; Ruby Video Tutorial; InSpec Documentation InSpec Docs; InSpec Profiles; InSpec Resources; InSpec Matche"},["/resources/index.html","/resources/README.md"]],
  ["v-03842690","/posts/article/article1.html",{"title":"Article 1","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 1 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-01T00:00:00.000Z","category":["CategoryA"],"tag":["tag A","tag B"]},["/posts/article/article1","/posts/article/article1.md"]],
  ["v-0538ff2f","/posts/article/article2.html",{"title":"Article 2","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 2 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-02T00:00:00.000Z","category":["CategoryA"],"tag":["tag A","tag B"],"star":true},["/posts/article/article2","/posts/article/article2.md"]],
  ["v-06edd7ce","/posts/article/article3.html",{"title":"Article 3","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 3 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-03T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article3","/posts/article/article3.md"]],
  ["v-08a2b06d","/posts/article/article4.html",{"title":"Article 4","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 4 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-04T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article4","/posts/article/article4.md"]],
  ["v-0a57890c","/posts/article/article5.html",{"title":"Article 5","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 5 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-05T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article5","/posts/article/article5.md"]],
  ["v-0c0c61ab","/posts/article/article6.html",{"title":"Article 6","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 6 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-06T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"],"star":10},["/posts/article/article6","/posts/article/article6.md"]],
  ["v-0dc13a4a","/posts/article/article7.html",{"title":"Article 7","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 7 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-07T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article7","/posts/article/article7.md"]],
  ["v-0f7612e9","/posts/article/article8.html",{"title":"Article 8","icon":"edit","type":"article","readingTime":{"minutes":0.05,"words":14},"excerpt":"Article 8 Heading 2 Here is the content. Heading 3 Here is the content.","date":"2022-01-08T00:00:00.000Z","category":["CategoryA","CategoryB"],"tag":["tag A","tag B"]},["/posts/article/article8","/posts/article/article8.md"]],
  ["v-3706649a","/404.html",{"title":"","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/404"]],
  ["v-5bc93818","/category/",{"title":"Category","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/index.html"]],
  ["v-744d024e","/tag/",{"title":"Tags","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/index.html"]],
  ["v-e52c881c","/article/",{"title":"Articles","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/article/index.html"]],
  ["v-75ed4ea4","/encrypted/",{"title":"Encrypted","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/encrypted/index.html"]],
  ["v-2897d318","/slides/",{"title":"Slides","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/slides/index.html"]],
  ["v-154dc4c4","/star/",{"title":"Star","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/star/index.html"]],
  ["v-01560935","/timeline/",{"title":"Timeline","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/timeline/index.html"]],
  ["v-ac0c2a6a","/category/guide/",{"title":"Guide Category","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/guide/index.html"]],
  ["v-c5a9e2d6","/tag/disable/",{"title":"disable Tags","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/disable/index.html"]],
  ["v-3e5b7b84","/category/categorya/",{"title":"CategoryA Category","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/categorya/index.html"]],
  ["v-cbedfc04","/tag/encryption/",{"title":"encryption Tags","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/encryption/index.html"]],
  ["v-3e5b7ba3","/category/categoryb/",{"title":"CategoryB Category","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/category/categoryb/index.html"]],
  ["v-484552dc","/tag/markdown/",{"title":"Markdown Tags","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/markdown/index.html"]],
  ["v-26f8293d","/tag/page-config/",{"title":"Page config Tags","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/page-config/index.html"]],
  ["v-30e296fe","/tag/guide/",{"title":"Guide Tags","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/guide/index.html"]],
  ["v-06bbb262","/tag/tag-a/",{"title":"tag A Tags","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/tag-a/index.html"]],
  ["v-06bbb224","/tag/tag-b/",{"title":"tag B Tags","type":"page","readingTime":{"minutes":0,"words":0},"excerpt":""},["/tag/tag-b/index.html"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: '404',
      path: '/:catchAll(.*)',
      component: Vuepress,
    }
  ]
)
