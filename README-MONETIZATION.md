# Tool network and AdSense preparation

This monorepo contains two shared packages for cross-promotion and ads:

- `@tools/network` — top bar with links between all five tools. The current locale is preserved. Desktop hover/focus shows a short description; mobile keeps the links horizontally scrollable.
- `@tools/ads` — reusable AdSense script, responsive ad slots, development placeholders, and `ads.txt` helper.

## Cross-tool URLs

Set all five public URLs in every app build:

```env
NEXT_PUBLIC_CLEARFRAME_URL=https://clearframe.example.com
NEXT_PUBLIC_SKYCONVERT_URL=https://skyconvert.example.com
NEXT_PUBLIC_LEAFSIZE_URL=https://leafsize.example.com
NEXT_PUBLIC_WAVECUT_URL=https://wavecut.example.com
NEXT_PUBLIC_SOUNDSHIFT_URL=https://soundshift.example.com
```

In `next dev`, missing URLs automatically fall back to ports `3000`–`3004`. In production, an unconfigured destination is intentionally rendered without a link instead of pointing users to localhost.

## AdSense

The layout deliberately keeps ads away from upload, play and download controls. Two responsive positions are prepared:

1. `primary` — after the working tool area.
2. `secondary` — between informational content and the FAQ.

Create two responsive display ad units in AdSense and set:

```env
NEXT_PUBLIC_ADSENSE_ENABLED=true
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1234567890123456
NEXT_PUBLIC_ADSENSE_SLOT_PRIMARY=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_SECONDARY=0987654321
```

Live ad requests are an explicit opt-in: the script loads only in a production build when `NEXT_PUBLIC_ADSENSE_ENABLED=true` and the publisher ID is valid. When these values are missing, no AdSense script is loaded in production. During local development, neutral placeholders are shown so the layout can be reviewed without making ad requests.

Each app also exposes `/ads.txt`. Once a valid AdSense client ID is configured it returns:

```text
google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0
```

Without a configured client ID, `/ads.txt` returns 404 rather than publishing a fake publisher ID.

## Before enabling ads in production

- Add every deployed domain to AdSense and wait for site approval.
- Use the real publisher ID and ad-unit IDs; do not click your own ads while testing.
- Review the final layout on desktop and mobile so ads cannot be mistaken for navigation, upload, play, or download controls.
- If serving personalised ads to visitors in the EEA, UK, or Switzerland, configure a Google-certified CMP/TCF consent flow before enabling those ads.
- Keep the tool itself useful and prominent; ads should remain secondary to the actual page content.
