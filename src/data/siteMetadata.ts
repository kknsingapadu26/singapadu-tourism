const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (
  configuredSiteUrl
    ? /^https?:\/\//.test(configuredSiteUrl)
      ? configuredSiteUrl
      : `https://${configuredSiteUrl}`
    : 'http://localhost:3000'
).replace(/\/+$/, '');
