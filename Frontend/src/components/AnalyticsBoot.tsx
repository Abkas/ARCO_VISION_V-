import { useEffect } from 'react';
import { GA_MEASUREMENT_ID, GOOGLE_SEARCH_CONSOLE_VERIFICATION, SITE_URL } from '../lib/site';

export default function AnalyticsBoot() {
  useEffect(() => {
    if (GOOGLE_SEARCH_CONSOLE_VERIFICATION) {
      let meta = document.querySelector('meta[name="google-site-verification"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'google-site-verification');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', GOOGLE_SEARCH_CONSOLE_VERIFICATION);
    }

    if (!GA_MEASUREMENT_ID) return;

    const scriptId = 'ga4-loader';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: window.location.href,
      page_path: window.location.pathname,
      cookie_flags: 'SameSite=None;Secure',
      transport_type: 'beacon',
      send_page_view: true,
      debug_mode: import.meta.env.DEV,
      allow_google_signals: true,
      anonymize_ip: true,
    });

    // Expose the canonical URL for debugging in dev tools when needed.
    window.__ARCO_SITE_URL__ = SITE_URL;
  }, []);

  return null;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __ARCO_SITE_URL__?: string;
  }
}
