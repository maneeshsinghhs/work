# IT company website

React and Vite website with Home, Services, About, Contact, and Blog pages.

## Develop

Requires Node.js 22.12+ (validated with Node 24).

```sh
npm ci --cache /workspace/.npm-cache
npm run dev -- --host 0.0.0.0
```

## Validate

```sh
npm run lint
npm run build
```

Change `COMPANY_NAME` in `src/App.jsx` when the company name is decided. Also update the title and description in `index.html`. The contact form is a clearly labeled preview and does not deliver messages. Blog topics are coming-soon placeholders. No credentials or backend services are required.

Pages use browser history URLs. Production hosting must serve `index.html` for unknown routes such as `/services`, `/about`, `/contact`, and `/blog`.
