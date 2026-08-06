# shhyydh

A personal portfolio — the journey, the projects, and how to get in touch.

Built with [Nuxt 3](https://nuxt.com), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

## Tech Stack

- Nuxt 3 + Vue 3
- Tailwind CSS 4
- Nitro (Cloudflare Pages preset)
- Wrangler (Cloudflare CLI)

## Development

```sh
npm install
npm run dev
```

## Build & Preview

```sh
npm run build              # build for production (outputs to dist/)
npx wrangler pages dev dist   # preview the build locally in the Workers runtime
```

## Deploy

```sh
npm run deploy             # npm ci + build + wrangler pages deploy dist
```

Or connect the GitHub repository to a Cloudflare Pages project (build command
`npm run build`, build directory `dist`) for automatic deploys on every push.

Live at: <https://shhyydh.pages.dev>

## License

Proprietary. All rights reserved. See [LICENSE](./LICENSE).
