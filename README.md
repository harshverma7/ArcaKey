# ArcaKey - Minimal Crypto Wallet Generator

Hey there! 👋 This is ArcaKey, a simple crypto wallet generator I built for Solana and Ethereum. I wanted something clean and minimal without all the bloat of existing wallet tools.

## What it does

- Generate wallets for **Solana** and **Ethereum** from seed phrases
- Works completely offline (no sketchy server calls)
- Dark/light theme because why not
- Nice particle background effect that I spent way too much time on
- HD wallet derivation following BIP39/BIP44 standards
- Copy addresses and private keys with one click

## Why I built this

I was tired of complex wallet interfaces and wanted something simple for development and testing. Plus, I wanted to learn more about crypto wallet generation and thought building one would be fun.

## Tech stack

Built with modern web tech:

- React 19 + Vite 6 (because fast is good)
- Tailwind CSS v4 for styling
- Manrope font (looks clean)
- Solana web3.js and ethers.js for the blockchain stuff
- Some particle animation library that makes it look cool

## Getting started

```bash
# Clone it
git clone <your-repo-url>
cd web-based-wallet

# Install stuff
npm install

# Run it
npm run dev
```

Then open `http://localhost:5173` and you're good to go.

## How to use

1. Pick your blockchain (Solana or Ethereum)
2. Either paste an existing seed phrase or let it generate one
3. Click "Generate Wallet" and boom - you've got addresses
4. Create multiple wallets from the same seed if you want
5. Copy addresses or private keys as needed

## Building for production

```bash
npm run build
```

The `dist` folder will have everything you need. You can throw it on any static host like Vercel, Netlify, or even GitHub Pages.

## Project structure

```
src/
├── components/          # UI components
├── hooks/              # Custom React hooks
├── App.jsx             # Main app
├── SolanaWallet.jsx    # Solana-specific stuff
├── EthereumWallet.jsx  # Ethereum-specific stuff
└── index.css           # Styles and animations
```

Nothing too fancy, just organized enough to stay sane.

## Security notes

⚠️ **Important**: This generates real private keys and addresses. I built this for development/testing, so please be careful:

- Everything runs in your browser (no data leaves your device)
- Private keys are never sent anywhere
- Still, don't use this for mainnet funds without proper testing
- Always backup your seed phrases properly
- I'm not responsible if you lose money (seriously)

## Browser support

Works on modern browsers. If you're using Internet Explorer... please don't.

## Contributing

Found a bug? Want to add something? Cool! Open an issue or send a PR. I'm pretty responsive.

## About me

I'm Harsh, a developer who likes building crypto tools and minimal UIs. You can find me on [GitHub](https://github.com/harshverma7) where I probably have too many unfinished projects.

## License

MIT License - use it however you want.

---
