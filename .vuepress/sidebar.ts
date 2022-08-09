import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  {
    icon: "creative",
    text: "Operator Course",
    prefix: "/courses/assessor/",
    link: "/courses/assessor/",
    children: "structure",
    collapsable: true
    // activeMatch: "^/courses/(?:(?!beginner/|advanced/).*)?$"
  },
  {
    icon: "creative",
    text: "Beginner InSpec Course",
    prefix: "/courses/beginner/",
    link: "/courses/beginner/",
    children: "structure",
    collapsable: true
    // activeMatch: "^/courses/(?:(?!beginner/|advanced/).*)?$"
  },
  {
    icon: "creative",
    text: "Advanced InSpec Course",
    prefix: "/courses/advanced/",
    link: "/courses/advanced/",
    // activeMatch: "^/courses/(?:(?!beginner/|advanced/).*)?$"
    children: "structure",
    collapsable: true
  },
  {
    icon: "note",
    text: "Resources",
    prefix: "/resources/",
    link: "/resources/",
    children: "structure",
    collapsable: true
  },
  {
    icon: "note",
    text: "Installation",
    prefix: "/installation/",
    link: "/installation/",
    children: "structure",
    collapsable: true
  }
  // {
  //   icon: "document",
  //   text: "Installation",
  //   prefix: "/installation/",
  //   link: "/installation/",
  //   children: "structure",
  // },
  // {
  //   text: "Articles",
  //   icon: "note",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "Articles 1-4",
  //       icon: "note",
  //       collapsable: true,
  //       prefix: "article/",
  //       children: ["article1", "article2", "article3", "article4"],
  //     },
  //     {
  //       text: "Articles 5-12",
  //       icon: "note",
  //       children: [
  //         {
  //           text: "Articles 5-8",
  //           icon: "note",
  //           collapsable: true,
  //           prefix: "article/",
  //           children: ["article5", "article6", "article7", "article8"],
  //         },
  //         {
  //           text: "Articles 9-12",
  //           icon: "note",
  //           children: ["article9", "article10", "article11", "article12"],
  //         },
  //       ],
  //     },
  //   ],
  // },
]);
