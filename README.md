# Cryptocurrency Exchange

A modern cryptocurrency exchange platform built with Next.js, TypeScript, and Tailwind CSS. This application allows users to exchange cryptocurrencies and manage their crypto wallets.

## 🚀 Features

- Currency selection and comparison
- Real-time exchange rates
- Wallet integration and management
- Responsive and modern UI
- Type-safe development with TypeScript
- Stylish components using Tailwind CSS

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Package Manager:** npm

## 📁 Project Structure

```
cryptoexchange/
├── .next/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   └── exchange/
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       ├── globals.css
│   │       └── favicon.ico
│   ├── components/
│   │   ├── CryptoExchangeCard.tsx
│   │   ├── CryptoSelector.tsx
│   │   ├── TabSelector.tsx
│   │   └── walletModal.tsx
│   ├── services/
│   │   └── currencyService.ts
│   └── types/
│       ├── crypto.ts
│       └── currency.ts
├── .env.local
├── .gitignore
├── components.json
├── eslint.config.mjs
└── next-env.d.ts
```

## 🏃‍♂️ Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your environment variables:
```env
API_KEY=your_api_key
API_URL=your_api_url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
