/** "From the same maker" — one list for the whole network; the current site is filtered out. */
export const SELF = 'csvtovcf.com';
export const NETWORK = [
  'ibangenerator.io',
  'metasnitch.com',
  'phototoascii.com',
  'airobotstxtgenerator.com',
  'csvtovcf.com',
  'woff2tottf.com',
  'vtttosrt.com',
  'filamentcostcalculator.com',
] as const;

export function networkLinks(): { domain: string; href: string }[] {
  return NETWORK.filter((d) => d !== SELF).map((domain) => ({
    domain,
    href: `https://${domain}/?utm_source=${SELF}&utm_medium=referral&utm_campaign=network-footer`,
  }));
}

export const SOURCE_URL = 'https://github.com/itensity-dev/csvtovcf';
export const CONTACT_EMAIL = 'hello@csvtovcf.com';
