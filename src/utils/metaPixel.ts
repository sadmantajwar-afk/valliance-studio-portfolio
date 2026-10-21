declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
    __metaPixelInitialized?: boolean;
  }
}

const DEFAULT_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || '';

const CONSENT_STORAGE_KEY = 'valliance_cookie_consent';

export function getStoredConsent(): 'granted' | 'denied' | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(CONSENT_STORAGE_KEY);
    return val === 'granted' || val === 'denied' ? val : null;
  } catch {
    return null;
  }
}

function loadFbqScript(effectiveId: string) {
  if (typeof window === 'undefined') return;
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
    window.fbq('consent', 'grant');
    window.fbq('init', effectiveId);
    window.fbq('track', 'PageView');
    window.__metaPixelInitialized = true;
  }
}

/**
 * Initialize Meta (Facebook) Pixel only if prior consent was granted
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

  // UK GDPR & PECR Privacy Compliance:
  // Do NOT load fbevents.js before explicit consent is granted.
  const consent = getStoredConsent();
  if (consent === 'granted') {
    loadFbqScript(effectiveId);
  }
}

/**
 * Grant Meta Pixel tracking consent (e.g., when visitor opts in via cookie consent banner)
 */
export function grantMetaConsent() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'granted');
    } catch {
      // Ignore storage errors
    }

    const effectiveId = (DEFAULT_PIXEL_ID || '').trim();
    if (effectiveId && !effectiveId.includes('YOUR_')) {
      loadFbqScript(effectiveId);
    } else if (window.fbq) {
      window.fbq('consent', 'grant');
      window.fbq('track', 'PageView');
    }
  }
}

/**
 * Revoke Meta Pixel tracking consent (e.g., when visitor declines or withdraws consent)
 */
export function revokeMetaConsent() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, 'denied');
    } catch {
      // Ignore storage errors
    }
    if (window.fbq) {
      window.fbq('consent', 'revoke');
    }
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

  trackMetaEvent('Lead', {
    content_name: 'Valliance Studio Client Inquiry',
    content_category: details.services?.join(', ') || 'General Studio Inquiry',
    value: numericValue,
    currency: details.currency || 'USD',
  });
}
