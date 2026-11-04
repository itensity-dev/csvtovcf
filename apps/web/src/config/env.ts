/** Build-time settings from the environment (see .env.example). */
const env = (k: string, d = ''): string => (process.env[k] ?? d).trim();

export const SITE_URL = env('SITE_URL', 'https://csvtovcf.com').replace(/\/$/, '');
export const ANALYTICS_PROVIDER = env('ANALYTICS_PROVIDER', 'none') as 'none' | 'plausible';
export const PLAUSIBLE_DOMAIN = env('PLAUSIBLE_DOMAIN', 'csvtovcf.com');
export const PLAUSIBLE_SRC = env('PLAUSIBLE_SRC', 'https://plausible.io/js/script.js');
export const ADS_ENABLED = env('ADS_ENABLED', 'false') === 'true';
export const ADSENSE_CLIENT = env('ADSENSE_CLIENT');
/** Optional ad unit id for the reserved slots; without it AdSense Auto ads decide placement. */
export const ADSENSE_SLOT = env('ADSENSE_SLOT');
export const GSC_VERIFICATION = env('GSC_VERIFICATION');
export const BING_VERIFICATION = env('BING_VERIFICATION');
export const INDEXNOW_KEY = env('INDEXNOW_KEY');
export const BUILD_DATE = env('BUILD_DATE', new Date().toISOString().slice(0, 10));
