/**
 * sitemap-human.js
 * Fetches and parses /sitemap.xml to render a human-readable sitemap page
 * Repository: abdelkader-omran/trizel-AI
 * Branch: main
 */

(function() {
  'use strict';

  // Page metadata: maps URLs to descriptive labels
  const pageMetadata = {
    '/': { label: 'Home', group: 'core' },
    '/methodology/': { label: 'Methodology', group: 'core' },
    '/status/': { label: 'Status', group: 'core' },
    '/evidence/': { label: 'Evidence', group: 'core' },
    '/repositories/': { label: 'Repositories', group: 'core' },
    '/system-map/': { label: 'System Map', group: 'core' },
    '/applications/': { label: 'Applications', group: 'core' }
  };

  /**
   * Fetch and parse the sitemap.xml file
   */
  async function fetchSitemap() {
    try {
      const response = await fetch('/sitemap.xml');
      if (!response.ok) {
        throw new Error(`Failed to fetch sitemap: ${response.status}`);
      }
      const text = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');
      
      // Check for XML parsing errors
      const parseError = xmlDoc.querySelector('parsererror');
      if (parseError) {
        throw new Error('Failed to parse sitemap XML');
      }
      
      return xmlDoc;
    } catch (error) {
      console.error('Error fetching sitemap:', error);
      throw error;
    }
  }

  /**
   * Extract page data from XML document
   */
  function extractPages(xmlDoc) {
    const urls = xmlDoc.querySelectorAll('url');
    const pages = [];

    urls.forEach(urlNode => {
      const loc = urlNode.querySelector('loc');
      const priority = urlNode.querySelector('priority');
      
      if (loc) {
        const url = loc.textContent.trim();
        // Convert full URL to path
        const path = url.replace('https://trizel-ai.com', '').replace(/\/$/, '') || '/';
        const pathWithSlash = path === '/' ? '/' : path + '/';
        
        // Get metadata or use path as label
        const metadata = pageMetadata[pathWithSlash] || pageMetadata[path] || {};
        const label = metadata.label || path.split('/').filter(Boolean).pop() || 'Home';
        const group = metadata.group || 'additional';
        
        pages.push({
          url: pathWithSlash,
          label: label,
          priority: priority ? priority.textContent.trim() : null,
          group: group
        });
      }
    });

    return pages;
  }

  /**
   * Group pages by their group property
   */
  function groupPages(pages) {
    const groups = {
      core: [],
      additional: []
    };

    pages.forEach(page => {
      if (groups[page.group]) {
        groups[page.group].push(page);
      } else {
        groups.additional.push(page);
      }
    });

    return groups;
  }

  /**
   * Render a list of pages
   */
  function renderPageList(pages, showPriority = false) {
    if (pages.length === 0) {
      return '';
    }

    const items = pages.map(page => {
      const priorityBadge = showPriority && page.priority 
        ? `<span class="priority" aria-label="Priority ${page.priority}">p:${page.priority}</span>`
        : '';
      
      return `
        <li>
          <a href="${escapeHtml(page.url)}" aria-label="${escapeHtml(page.label)}">
            ${escapeHtml(page.label)}
            <span class="sitemap-url">${escapeHtml(page.url)}</span>
            ${priorityBadge}
          </a>
        </li>
      `;
    }).join('');

    return `<ul class="sitemap-list" role="list">${items}</ul>`;
  }

  /**
   * Render the complete sitemap
   */
  function renderSitemap(pages) {
    const grouped = groupPages(pages);
    
    let html = '';

    // Core pages section
    if (grouped.core.length > 0) {
      html += `
        <section class="sitemap-section">
          <h2>Core Pages</h2>
          ${renderPageList(grouped.core, true)}
        </section>
      `;
    }

    // Additional pages section (if any exist)
    if (grouped.additional.length > 0) {
      html += `
        <section class="sitemap-section">
          <h2>Additional Pages</h2>
          ${renderPageList(grouped.additional, true)}
        </section>
      `;
    }

    return html;
  }

  /**
   * Escape HTML to prevent XSS
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Display error message
   */
  function showError(message) {
    const container = document.getElementById('sitemap-content');
    if (container) {
      container.innerHTML = `
        <div class="error" role="alert">
          <strong>Error:</strong> ${escapeHtml(message)}
        </div>
        <p class="muted">Please try refreshing the page. If the problem persists, the sitemap may be temporarily unavailable.</p>
      `;
    }
  }

  /**
   * Initialize and render the sitemap
   */
  async function init() {
    const container = document.getElementById('sitemap-content');
    if (!container) {
      console.error('Sitemap container not found');
      return;
    }

    try {
      // Fetch and parse XML
      const xmlDoc = await fetchSitemap();
      const pages = extractPages(xmlDoc);

      if (pages.length === 0) {
        showError('No pages found in sitemap');
        return;
      }

      // Render the sitemap
      const html = renderSitemap(pages);
      container.innerHTML = html;
      container.setAttribute('aria-busy', 'false');

    } catch (error) {
      showError('Failed to load sitemap. Please try again later.');
      console.error('Sitemap initialization error:', error);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
