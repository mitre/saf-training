import { ensureEndingSlash } from "@vuepress/shared";
import { inferRouteLink, isAbsoluteUrl, resolveRouteWithRedirect, } from "vuepress-shared/client";
import { ArticleInfoType } from "../../shared/index.js";
export const resolvePrefix = (prefix = "", path = "") => isAbsoluteUrl(path) ? path : `${ensureEndingSlash(prefix)}${path}`;
/**
 * Resolve AutoLink props from string
 *
 */
export const resolveLinkInfo = (router, item, preferFull = false) => {
    let result = resolveRouteWithRedirect(router, inferRouteLink(encodeURI(item)));
    // the inferred path may be wrong, so we need to resolve the original path
    if (result.name === "404")
        result = resolveRouteWithRedirect(router, item);
    const { fullPath, meta, name } = result;
    return {
        text: !preferFull && meta[ArticleInfoType.shortTitle]
            ? meta[ArticleInfoType.shortTitle]
            : meta[ArticleInfoType.title] || item,
        link: name === "404" ? item : fullPath,
        ...(meta[ArticleInfoType.icon] ? { icon: meta[ArticleInfoType.icon] } : {}),
    };
};
//# sourceMappingURL=linkInfo.js.map