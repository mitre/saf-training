const TAG_NAME_SCRIPT = "script";
const TAG_NAME_STYLE = "style";
const TAG_NAME_TEMPLATE = "template";

const SCRIPT_SETUP_TAG_OPEN_REGEXP = /^<script\s+.*?\bsetup\b.*?>$/is;
const createSfcRegexp = ({
  customBlocks
}) => {
  const sfcTags = Array.from(
    /* @__PURE__ */ new Set([TAG_NAME_SCRIPT, TAG_NAME_STYLE, ...customBlocks])
  ).join("|");
  return new RegExp(
    `^\\s*(?<content>(?<tagOpen><(?<type>${sfcTags})\\s?.*?>)(?<contentStripped>.*)(?<tagClose><\\/\\k<type>\\s*>))\\s*$`,
    "is"
  );
};

const sfcPlugin = (md, { customBlocks = [] } = {}) => {
  const sfcRegexp = createSfcRegexp({ customBlocks });
  const render = md.render.bind(md);
  md.render = (src, env = {}) => {
    env.sfcBlocks = {
      template: null,
      script: null,
      scriptSetup: null,
      scripts: [],
      styles: [],
      customBlocks: []
    };
    const rendered = render(src, env);
    env.sfcBlocks.template = {
      type: TAG_NAME_TEMPLATE,
      content: `<${TAG_NAME_TEMPLATE}>${rendered}</${TAG_NAME_TEMPLATE}>`,
      contentStripped: rendered,
      tagOpen: `<${TAG_NAME_TEMPLATE}>`,
      tagClose: `</${TAG_NAME_TEMPLATE}>`
    };
    return rendered;
  };
  const htmlBlockRule = md.renderer.rules.html_block;
  md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
    if (!env.sfcBlocks) {
      return htmlBlockRule(tokens, idx, options, env, self);
    }
    const token = tokens[idx];
    const content = token.content;
    const match = content.match(sfcRegexp);
    if (!match) {
      return htmlBlockRule(tokens, idx, options, env, self);
    }
    const sfcBlock = match.groups;
    if (sfcBlock.type === TAG_NAME_SCRIPT) {
      env.sfcBlocks.scripts.push(sfcBlock);
      if (SCRIPT_SETUP_TAG_OPEN_REGEXP.test(sfcBlock.tagOpen)) {
        env.sfcBlocks.scriptSetup = sfcBlock;
      } else {
        env.sfcBlocks.script = sfcBlock;
      }
    } else if (sfcBlock.type === TAG_NAME_STYLE) {
      env.sfcBlocks.styles.push(sfcBlock);
    } else {
      env.sfcBlocks.customBlocks.push(sfcBlock);
    }
    return "";
  };
};

export { SCRIPT_SETUP_TAG_OPEN_REGEXP, TAG_NAME_SCRIPT, TAG_NAME_STYLE, TAG_NAME_TEMPLATE, createSfcRegexp, sfcPlugin };
