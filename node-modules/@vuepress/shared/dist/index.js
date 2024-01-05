// src/utils/index.ts
import { isArray, isFunction, isString } from "@vue/shared";

// src/utils/resolveHeadIdentifier.ts
var resolveHeadIdentifier = ([
  tag,
  attrs,
  content
]) => {
  if (tag === "meta" && attrs.name) {
    return `${tag}.${attrs.name}`;
  }
  if (["title", "base"].includes(tag)) {
    return tag;
  }
  if (tag === "template" && attrs.id) {
    return `${tag}.${attrs.id}`;
  }
  return JSON.stringify([tag, attrs, content]);
};

// src/utils/dedupeHead.ts
var dedupeHead = (head) => {
  const identifierSet = /* @__PURE__ */ new Set();
  const result = [];
  head.forEach((item) => {
    const identifier = resolveHeadIdentifier(item);
    if (!identifierSet.has(identifier)) {
      identifierSet.add(identifier);
      result.push(item);
    }
  });
  return result;
};

// src/utils/ensureLeadingSlash.ts
var ensureLeadingSlash = (str) => str[0] === "/" ? str : `/${str}`;

// src/utils/ensureEndingSlash.ts
var ensureEndingSlash = (str) => str[str.length - 1] === "/" || str.endsWith(".html") ? str : `${str}/`;

// src/utils/formatDateString.ts
var formatDateString = (str, defaultDateString = "") => {
  const dateMatch = str.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/);
  if (dateMatch === null) {
    return defaultDateString;
  }
  const [, yearStr, monthStr, dayStr] = dateMatch;
  return [yearStr, monthStr.padStart(2, "0"), dayStr.padStart(2, "0")].join("-");
};

// src/utils/isLinkHttp.ts
var isLinkHttp = (link) => /^(https?:)?\/\//.test(link);

// src/utils/isLinkExternal.ts
var markdownLinkRegexp = /.md((\?|#).*)?$/;
var isLinkExternal = (link, base = "/") => {
  if (isLinkHttp(link)) {
    return true;
  }
  if (link.startsWith("/") && !link.startsWith(base) && !markdownLinkRegexp.test(link)) {
    return true;
  }
  return false;
};

// src/utils/isLinkWithProtocol.ts
var isLinkWithProtocol = (link) => /^[a-z][a-z0-9+.-]*:/.test(link);

// src/utils/isPlainObject.ts
var isPlainObject = (val) => Object.prototype.toString.call(val) === "[object Object]";

// src/utils/omit.ts
var omit = (obj, ...keys) => {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
};

// src/utils/removeEndingSlash.ts
var removeEndingSlash = (str) => str[str.length - 1] === "/" ? str.slice(0, -1) : str;

// src/utils/removeLeadingSlash.ts
var removeLeadingSlash = (str) => str[0] === "/" ? str.slice(1) : str;

// src/utils/resolveLocalePath.ts
var resolveLocalePath = (locales, routePath) => {
  const localePaths = Object.keys(locales).sort((a, b) => {
    const levelDelta = b.split("/").length - a.split("/").length;
    if (levelDelta !== 0) {
      return levelDelta;
    }
    return b.length - a.length;
  });
  for (const localePath of localePaths) {
    if (routePath.startsWith(localePath)) {
      return localePath;
    }
  }
  return "/";
};

// src/utils/resolveRoutePathFromUrl.ts
var resolveRoutePathFromUrl = (url, base = "/") => {
  const pathname = url.replace(/^(https?:)?\/\/[^/]*/, "");
  return pathname.startsWith(base) ? `/${pathname.slice(base.length)}` : pathname;
};
export {
  dedupeHead,
  ensureEndingSlash,
  ensureLeadingSlash,
  formatDateString,
  isArray,
  isFunction,
  isLinkExternal,
  isLinkHttp,
  isLinkWithProtocol,
  isPlainObject,
  isString,
  omit,
  removeEndingSlash,
  removeLeadingSlash,
  resolveHeadIdentifier,
  resolveLocalePath,
  resolveRoutePathFromUrl
};
