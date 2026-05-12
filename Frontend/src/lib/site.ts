const stripTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const SITE_URL = stripTrailingSlash(
  import.meta.env.VITE_SITE_URL || 'https://arco-studio.com',
);

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';
export const GOOGLE_SEARCH_CONSOLE_VERIFICATION = import.meta.env.VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION || '';
