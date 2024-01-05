import { LitElement, PropertyDeclaration } from 'lit';
/**
 * Widget element for giscus.
 */
export declare class GiscusWidget extends LitElement {
    private GISCUS_SESSION_KEY;
    private GISCUS_DEFAULT_HOST;
    private ERROR_SUGGESTION;
    private __session;
    private _iframeRef;
    private messageEventHandler;
    private hasLoaded;
    get iframeRef(): HTMLIFrameElement | undefined;
    static styles: import("lit").CSSResult;
    /**
     * Host of the giscus server.
     */
    host: string;
    get _host(): string;
    /**
     * Repo where the discussion is stored.
     */
    repo: Repo;
    /**
     * ID of the repo where the discussion is stored.
     */
    repoId?: string;
    /**
     * Category where the discussion will be searched.
     */
    category?: string;
    /**
     * ID of the category where new discussions will be created.
     */
    categoryId?: string;
    /**
     * Mapping between the parent page and the discussion.
     */
    mapping?: Mapping;
    /**
     * Search term to use when searching for the discussion.
     */
    term?: string;
    /**
     * Use strict title matching.
     */
    strict: BooleanString;
    /**
     * Enable reactions to the main post of the discussion.
     */
    reactionsEnabled: BooleanString;
    /**
     * Emit the discussion metadata periodically to the parent page.
     */
    emitMetadata: BooleanString;
    /**
     * Placement of the comment box (`top` or `bottom`).
     */
    inputPosition: InputPosition;
    /**
     * Theme that giscus will be displayed in.
     */
    theme: Theme;
    /**
     * Language that giscus will be displayed in.
     */
    lang: Lang;
    /**
     * Whether the iframe should be loaded lazily or eagerly.
     */
    loading: Loading;
    constructor();
    disconnectedCallback(): void;
    private _formatError;
    private setupSession;
    private signOut;
    private handleMessageEvent;
    private sendMessage;
    private updateConfig;
    firstUpdated(): void;
    requestUpdate(name?: PropertyKey, oldValue?: unknown, options?: PropertyDeclaration<unknown, unknown>): void;
    private getMetaContent;
    private _getCleanedUrl;
    private getTerm;
    private getNumber;
    private getIframeSrc;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'giscus-widget': GiscusWidget;
    }
}
type BooleanString = '0' | '1';
type InputPosition = 'top' | 'bottom';
type Repo = `${string}/${string}`;
type Mapping = 'url' | 'title' | 'og:title' | 'specific' | 'number' | 'pathname';
type GenericString = string & Record<never, never>;
type Theme = 'light' | 'light_high_contrast' | 'light_protanopia' | 'light_tritanopia' | 'dark' | 'dark_high_contrast' | 'dark_protanopia' | 'dark_tritanopia' | 'dark_dimmed' | 'preferred_color_scheme' | 'transparent_dark' | 'noborder_light' | 'noborder_dark' | 'cobalt' | `https://${string}` | GenericString;
type Lang = 'ar' | 'ca' | 'de' | 'en' | 'es' | 'fa' | 'fr' | 'he' | 'id' | 'it' | 'ja' | 'ko' | 'nl' | 'pl' | 'pt' | 'ro' | 'ru' | 'th' | 'tr' | 'vi' | 'uk' | 'zh-CN' | 'zh-TW' | GenericString;
type Loading = 'lazy' | 'eager';
export {};
