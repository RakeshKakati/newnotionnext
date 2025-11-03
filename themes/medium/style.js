/* eslint-disable react/no-unknown-property */
/**
 * Medium.com inspired styles
 * Clean, minimalist typography and spacing
 */
const Style = () => {
  return <style jsx global>{`
    /* Medium.com inspired base styles */
    #theme-medium {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
      color: rgba(0, 0, 0, 0.84) !important;
      line-height: 1.58 !important;
      letter-spacing: -0.003em !important;
      background: #ffffff !important;
    }

    #theme-medium.dark {
      color: rgba(255, 255, 255, 0.84) !important;
      background-color: #000000 !important;
    }

    /* Clean navigation bar like Medium */
    #top-nav {
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    }

    .dark #top-nav {
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    }

    /* Article cards with Medium styling */
    #theme-medium article,
    #theme-medium #posts-wrapper > div {
      border-bottom: 1px solid rgba(0, 0, 0, 0.09);
      padding-bottom: 2rem;
    }

    .dark #theme-medium article,
    .dark #theme-medium #posts-wrapper > div {
      border-bottom: 1px solid rgba(255, 255, 255, 0.09);
    }

    /* Clean link styles */
    #theme-medium a {
      color: rgba(0, 0, 0, 0.84);
      text-decoration: none;
      transition: opacity 0.2s;
    }

    #theme-medium a:hover {
      opacity: 0.7;
    }

    .dark #theme-medium a {
      color: rgba(255, 255, 255, 0.84);
    }

    /* Medium-style headings */
    #theme-medium h1,
    #theme-medium h2 {
      font-weight: 700;
      letter-spacing: -0.016em;
      line-height: 1.04;
    }

    #theme-medium h2 {
      font-size: 1.875rem;
      margin-top: 0;
      margin-bottom: 0.5rem;
    }

    /* Paragraph spacing */
    #theme-medium p {
      margin-bottom: 1.5rem;
    }

    /* Article content dark mode styling */
    #theme-medium #article-wrapper {
      color: rgba(0, 0, 0, 0.84);
      background: transparent;
    }

    .dark #theme-medium #article-wrapper {
      color: rgba(255, 255, 255, 0.84) !important;
      background: transparent;
    }

    /* Notion article content styling */
    #theme-medium #notion-article {
      color: rgba(0, 0, 0, 0.84);
    }

    .dark #theme-medium #notion-article {
      color: rgba(255, 255, 255, 0.84) !important;
    }

    /* Notion rendered content - paragraphs, headings, etc */
    #theme-medium #notion-article p,
    #theme-medium #notion-article h1,
    #theme-medium #notion-article h2,
    #theme-medium #notion-article h3,
    #theme-medium #notion-article h4,
    #theme-medium #notion-article h5,
    #theme-medium #notion-article h6,
    #theme-medium #notion-article li,
    #theme-medium #notion-article span:not(.notion-inline-code),
    #theme-medium #notion-article div[class*="notion"] {
      color: rgba(0, 0, 0, 0.84);
    }

    .dark #theme-medium #notion-article p,
    .dark #theme-medium #notion-article h1,
    .dark #theme-medium #notion-article h2,
    .dark #theme-medium #notion-article h3,
    .dark #theme-medium #notion-article h4,
    .dark #theme-medium #notion-article h5,
    .dark #theme-medium #notion-article h6,
    .dark #theme-medium #notion-article li,
    .dark #theme-medium #notion-article span:not(.notion-inline-code),
    .dark #theme-medium #notion-article div[class*="notion"] {
      color: rgba(255, 255, 255, 0.84) !important;
    }

    /* Override Notion's default text colors for dark mode */
    .dark #theme-medium .notion-text,
    .dark #theme-medium .notion-h,
    .dark #theme-medium .notion-list-item,
    .dark #theme-medium .notion-toggle,
    .dark #theme-medium .notion-quote,
    .dark #theme-medium .notion-callout,
    .dark #theme-medium .notion-page-content,
    .dark #theme-medium .notion-page-content-inner,
    .dark #theme-medium [class*="notion-column"],
    .dark #theme-medium [class*="notion-list"],
    .dark #theme-medium [class*="notion-text"] {
      color: rgba(255, 255, 255, 0.84) !important;
    }

    /* Ensure all text in article respects dark mode - more specific selectors */
    .dark #theme-medium #article-wrapper .notion,
    .dark #theme-medium #article-wrapper .notion-page-content,
    .dark #theme-medium #article-wrapper .notion-page-content-inner {
      color: rgba(255, 255, 255, 0.84) !important;
    }

    /* Light mode - ensure text is dark */
    #theme-medium #article-wrapper .notion,
    #theme-medium #article-wrapper .notion-page-content,
    #theme-medium #article-wrapper .notion-page-content-inner {
      color: rgba(0, 0, 0, 0.84) !important;
    }

    /* Article section background */
    #theme-medium #article-wrapper,
    #theme-medium section {
      background: transparent;
    }

    /* Override Notion CSS variables for dark mode */
    .dark #theme-medium #notion-article {
      --fg-color: rgba(255, 255, 255, 0.84) !important;
      --fg-color-1: rgba(255, 255, 255, 0.16) !important;
      --fg-color-2: rgba(255, 255, 255, 0.4) !important;
      --fg-color-3: rgba(255, 255, 255, 0.6) !important;
      --fg-color-4: rgba(255, 255, 255, 0.84) !important;
      --fg-color-6: rgba(255, 255, 255, 0.8) !important;
    }

    /* Light mode - ensure dark text */
    #theme-medium #notion-article {
      --fg-color: rgba(0, 0, 0, 0.84) !important;
      --fg-color-1: rgba(0, 0, 0, 0.16) !important;
      --fg-color-2: rgba(0, 0, 0, 0.4) !important;
      --fg-color-3: rgba(0, 0, 0, 0.6) !important;
      --fg-color-4: rgba(0, 0, 0, 0.84) !important;
      --fg-color-6: rgba(0, 0, 0, 0.8) !important;
    }

    /* Remove unnecessary borders and shadows */
    #theme-medium .border-b {
      border-color: rgba(0, 0, 0, 0.09) !important;
    }

    .dark #theme-medium .border-b {
      border-color: rgba(255, 255, 255, 0.09) !important;
    }

    /* Clean buttons */
    #theme-medium button {
      font-family: inherit;
    }

    /* Sidebar styling */
    #theme-medium #container-wrapper ~ div {
      border-left: 1px solid rgba(0, 0, 0, 0.09);
    }

    .dark #theme-medium #container-wrapper ~ div {
      border-left: 1px solid rgba(255, 255, 255, 0.09);
    }

    /* Footer minimal styling */
    #theme-medium footer {
      border-top: 1px solid rgba(0, 0, 0, 0.09);
      color: rgba(0, 0, 0, 0.54);
    }

    .dark #theme-medium footer {
      border-top: 1px solid rgba(255, 255, 255, 0.09);
      color: rgba(255, 255, 255, 0.54);
    }
  `}</style>
}

export { Style }
