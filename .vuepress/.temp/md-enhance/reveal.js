import { reveal, revealMarkdown, revealHighlight, revealMath, revealSearch, revealNotes, revealZoom } from "/Users/alippold/github/mitre/inspec-developer-2/node_modules/vuepress-plugin-md-enhance/lib/client/reveal";

export const useReveal = () => [reveal(), revealMarkdown(), revealHighlight(), revealMath(), revealSearch(), revealNotes(), revealZoom()
];