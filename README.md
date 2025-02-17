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
```

The application will be available at `http://localhost:3000`

## 🔄 API Integration

The application integrates with two main API endpoints:

1. **get_all_currencies**
   - Fetches available cryptocurrencies
   - Used in the currency selection component

2. **create_exchange**
   - Handles currency exchange operations
   - Requires specific parameters and headers

## 💼 Wallet Integration

The wallet functionality is implemented through a modal interface that:
- Displays available wallet options
- Handles wallet connections
- Manages wallet states

## 🎨 Component Overview

- **CryptoExchangeCard**: Main exchange interface component
- **CryptoSelector**: Currency selection dropdown
- **TabSelector**: Navigation between different sections
- **WalletModal**: Wallet connection and management interface

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.