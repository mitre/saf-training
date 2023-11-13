import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  {
    icon: "creative",
    text: "User Class",
    prefix: "/courses/user/",
    link: "/courses/user/",
    children: "structure",
    collapsable: true
  },
  {
    icon: "creative",
    text: "Beginner Class",
    prefix: "/courses/beginner/",
    link: "/courses/beginner/",
    children: "structure",
    collapsable: true
  },
  {
    icon: "creative",
    text: "Advanced Class",
    prefix: "/courses/advanced/",
    link: "/courses/advanced/",
    children: "structure",
    collapsable: true
  },
  {
    icon: "creative",
    text: "Guidance Class",
    prefix: "/courses/guidance/",
    link: "/courses/guidance/",
    children: "structure",
    collapsable: true
  },
  {
    icon: "creative",
    text: "Vulcan User Guide",
    prefix: "/courses/vulcan/",
    link: "/courses/vulcan/",
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
