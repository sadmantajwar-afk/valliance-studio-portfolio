declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __metaPixelInitialized?: boolean;
  }
}

const DEFAULT_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

/**
 * Initialize Meta (Facebook) Pixel
 */
export function initMetaPixel(pixelId: string = DEFAULT_PIXEL_ID) {
  if (typeof window === 'undefined') return;

  // Check if pixel ID is configured
  const effectiveId = pixelId.trim();
  if (!effectiveId || effectiveId.includes('YOUR_')) {
    if (import.meta.env.DEV) {
      console.info(
        '[Meta Pixel] Pixel ID not configured yet. Set VITE_META_PIXEL_ID in your .env.local to activate live Meta Ads tracking.'
      );
    }
    return;
  }

  // Prevent duplicate initialization
  if (window.__metaPixelInitialized) return;

  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  if (window.fbq) {
    // UK GDPR & PECR Privacy Compliance: Revoke consent by default until user interaction/consent
    window.fbq('consent', 'revoke');
    window.fbq('init', effectiveId);
    window.__metaPixelInitialized = true;
  }
}

/**
 * Grant Meta Pixel tracking consent (e.g., when visitor opts in or engages with lead inquiry)
 */
export function grantMetaConsent() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('consent', 'grant');
    window.fbq('track', 'PageView');
  }
}

/**
 * Revoke Meta Pixel tracking consent
 */
export function revokeMetaConsent() {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('consent', 'revoke');
  }
}

/**
 * Track custom or standard Meta events safely
 */
export function trackMetaEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName, params);
      if (import.meta.env.DEV) {
        console.log(`[Meta Pixel Event: ${eventName}]`, params);
      }
    } catch (err) {
      console.warn('[Meta Pixel] Event tracking failed:', err);
    }
  } else if (import.meta.env.DEV) {
    console.log(`[Meta Pixel Event (Dev Simulated): ${eventName}]`, params);
  }
}

/**
 * Track high-value Lead conversion event when inquiry form is submitted
 */
export function trackMetaLead(details: {
  value?: string;
  currency?: string;
  services?: string[];
  organization?: string;
}) {
  // Parse approximate numeric value from budget tier (e.g. "$1,500 – $3,000" -> 1500)
  let numericValue = 1500;
  if (details.value) {
    if (details.value.includes('k') || details.value.includes('K')) {
      const match = details.value.match(/(\d+)[kK]/);
      if (match) numericValue = parseInt(match[1], 10) * 1000;
    } else {
      const clean = details.value.replace(/[^0-9]/g, ' ').trim().split(/\s+/)[0];
      if (clean) numericValue = parseInt(clean, 10);
    }
  }

  grantMetaConsent();
  trackMetaEvent('Lead', {
    content_name: 'Valliance Studio Client Inquiry',
    content_category: details.services?.join(', ') || 'General Studio Inquiry',
    value: numericValue,
    currency: details.currency || 'USD',
  });
}
