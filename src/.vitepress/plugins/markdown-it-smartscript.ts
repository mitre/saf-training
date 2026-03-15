/**
 * markdown-it SmartScript Plugin
 * Build-time typography transformations for VitePress
 *
 * Transforms patterns at build time (zero client-side cost):
 * - (tm) or (TM) → <span class="ss-tm">™</span>
 * - (r) or (R) → <span class="ss-reg">®</span>
 * - (c) or (C) → ©
 */

// @ts-expect-error -- markdown-it lacks type declarations
import type MarkdownIt from 'markdown-it'
// @ts-expect-error -- markdown-it lacks type declarations
import type StateCore from 'markdown-it/lib/rules_core/state_core.mjs'

export interface SmartScriptOptions {
  trademark?: boolean
  registered?: boolean
  copyright?: boolean
}

/**
 * Transform text with smart typography
 */
function transformText(text: string, options: SmartScriptOptions): string {
  let result = text

  // Trademark: (tm) or (TM) → <span class="ss-tm">™</span>
  if (options.trademark !== false) {
    result = result.replace(/\(tm\)/gi, '<span class="ss-tm">™</span>')
  }

  // Registered: (r) or (R) → <span class="ss-reg">®</span>
  if (options.registered !== false) {
    result = result.replace(/\(r\)/gi, '<span class="ss-reg">®</span>')
  }

  // Copyright: (c) or (C) → ©
  if (options.copyright !== false) {
    result = result.replace(/\(c\)/gi, '©')
  }

  return result
}

/**
 * Process inline tokens recursively
 */
function processInlineTokens(tokens: any[], options: SmartScriptOptions): void {
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    // Process nested children
    if (token.children && token.children.length > 0) {
      processInlineTokens(token.children, options)
    }

    // Transform text tokens (but skip code_inline)
    if (token.type === 'text') {
      const transformed = transformText(token.content, options)

      if (transformed !== token.content) {
        // Replace text token with html_inline token to preserve transformations
        token.type = 'html_inline'
        token.content = transformed
      }
    }
  }
}

/**
 * markdown-it plugin
 */
export function markdownItSmartScript(md: MarkdownIt, options: SmartScriptOptions = {}): void {
  // Track if we're inside a code block or fence
  let inCodeBlock = false

  md.core.ruler.after('inline', 'smartscript', (state: StateCore) => {
    const tokens = state.tokens

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      // Track code blocks and fences (skip processing inside these)
      if (token.type === 'fence' || token.type === 'code_block') {
        continue
      }

      // Process inline tokens
      if (token.type === 'inline' && token.children && !inCodeBlock) {
        processInlineTokens(token.children, options)
      }

      // Track code block boundaries
      if (token.nesting === 1 && (token.tag === 'code' || token.tag === 'pre')) {
        inCodeBlock = true
      }
      else if (token.nesting === -1 && (token.tag === 'code' || token.tag === 'pre')) {
        inCodeBlock = false
      }
    }

    return true
  })
}
