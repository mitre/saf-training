import { htmlEscape, resolveHeadersFromTokens, slugify } from '@mdit-vue/shared';

const createRenderHeaders = ({
  listTag,
  listClass,
  itemClass,
  linkTag,
  linkClass
}) => {
  const listTagString = htmlEscape(listTag);
  const listClassString = listClass ? ` class="${htmlEscape(listClass)}"` : "";
  const itemTagString = "li";
  const itemClassString = itemClass ? ` class="${htmlEscape(itemClass)}"` : "";
  const linkTagString = htmlEscape(linkTag);
  const linkClassString = linkClass ? ` class="${htmlEscape(linkClass)}"` : "";
  const linkTo = (link) => linkTag === "router-link" ? ` to="${link}"` : ` href="${link}"`;
  const renderHeaders = (headers) => `<${listTagString}${listClassString}>${headers.map(
    (header) => `<${itemTagString}${itemClassString}><${linkTagString}${linkClassString}${linkTo(header.link)}>${header.title}</${linkTagString}>${header.children.length > 0 ? renderHeaders(header.children) : ""}</${itemTagString}>`
  ).join("")}</${listTagString}>`;
  return renderHeaders;
};

const createTocBlockRule = ({
  pattern,
  containerTag,
  containerClass
}) => (state, startLine, endLine, silent) => {
  if (state.sCount[startLine] - state.blkIndent >= 4) {
    return false;
  }
  const pos = state.bMarks[startLine] + state.tShift[startLine];
  const max = state.eMarks[startLine];
  const lineFirstToken = state.src.slice(pos, max).split(" ")[0];
  if (!pattern.test(lineFirstToken))
    return false;
  if (silent)
    return true;
  state.line = startLine + 1;
  const tokenOpen = state.push("toc_open", containerTag, 1);
  tokenOpen.markup = "";
  tokenOpen.map = [startLine, state.line];
  if (containerClass) {
    tokenOpen.attrSet("class", containerClass);
  }
  const tokenBody = state.push("toc_body", "", 0);
  tokenBody.markup = lineFirstToken;
  tokenBody.map = [startLine, state.line];
  tokenBody.hidden = true;
  const tokenClose = state.push("toc_close", containerTag, -1);
  tokenClose.markup = "";
  tokenBody.map = [startLine, state.line];
  return true;
};

const tocPlugin = (md, {
  pattern = /^\[\[toc\]\]$/i,
  slugify: slugify$1 = slugify,
  format,
  level = [2, 3],
  shouldAllowNested = false,
  containerTag = "nav",
  containerClass = "table-of-contents",
  listTag = "ul",
  listClass = "",
  itemClass = "",
  linkTag = "a",
  linkClass = ""
} = {}) => {
  md.block.ruler.before(
    "heading",
    "toc",
    createTocBlockRule({
      pattern,
      containerTag,
      containerClass
    }),
    {
      alt: ["paragraph", "reference", "blockquote"]
    }
  );
  const renderHeaders = createRenderHeaders({
    listTag,
    listClass,
    itemClass,
    linkTag,
    linkClass
  });
  md.renderer.rules.toc_body = (tokens) => renderHeaders(
    resolveHeadersFromTokens(tokens, {
      level,
      shouldAllowHtml: true,
      shouldAllowNested,
      shouldEscapeText: true,
      slugify: slugify$1,
      format
    })
  );
};

export { createRenderHeaders, createTocBlockRule, tocPlugin };
