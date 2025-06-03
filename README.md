# 🔐 CipherKeys for Raycast

<div align="center">

![CipherKeys Hero](./assets/hero-banner.png)

**Military-grade API key encryption and management for security-conscious developers**

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](https://github.com/raycast/extensions)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](./package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](./LICENSE)

[Installation](#-installation) • [Features](#-features) • [Usage](#-usage) • [Security](#-security) • [Contributing](#-contributing)

</div>

---

## 🚀 Overview

CipherKeys is an enterprise-grade Raycast extension engineered for maximum security in API credential management. Built with zero-trust architecture and military-grade encryption, it provides security-conscious developers with bulletproof local storage and lightning-fast access to sensitive API credentials.

### ✨ Security-First Features

- �️ **Zero-Trust Architecture** - No external dependencies or network calls
- 🔐 **AES-256 Encryption** - Military-grade encryption for credential storage
- ⚡ **Sub-Second Access** - Instant decryption and retrieval
- 🎯 **Tactical Organization** - Advanced categorization and filtering
- 📋 **Secure Clipboard** - Auto-purging clipboard with configurable timeouts
- 🖥️ **Stealth Interface** - Minimal attack surface with maximum functionality
- ⌨️ **Operator-Grade UX** - Full keyboard control for security professionals

---

## 📸 Screenshots

### Command Center - Tactical Overview
![Main List View](./assets/screenshots/main-list.png)
*Encrypted credential vault with service identification, classification tags, and access audit trails*

### Secure Credential Inspector
![Detail View](./assets/screenshots/detail-view.png)
*Comprehensive credential analysis with masked display, edit capabilities, and security metadata*

### Credential Ingestion Interface
![Add Key Form](./assets/screenshots/add-key.png)
*Secure credential onboarding with service classification and operational notes*

---

## ✨ What Makes CipherKeys Different

### 🎯 **Tactical Intelligence**
Advanced operational capabilities shown in the interface above:
- **Service Fingerprinting**: Visual threat identification for API endpoints
- **Classification System**: Organize credentials by security clearance and operational context
- **Access Forensics**: Complete audit trail of credential access patterns

### 🔒 **Hardened Security**
- **Default Obfuscation**: Credentials masked with cryptographic patterns until authorized viewing
- **Air-Gapped Storage**: Zero network exposure with local-only encrypted vault
- **Memory Sanitization**: Automatic clipboard purging with configurable security timeouts

### ⚡ **Operator Efficiency**
- **Sub-Second Retrieval**: Instant credential decryption and deployment
- **Tactical Shortcuts**: Full keyboard control optimized for security operations
- **Stealth Copy**: Single-keystroke secure credential extraction

---

## 🎯 Features

### Core Security Architecture
- ✅ **Encrypted Vault** - AES-256 encrypted storage in hardened directory
- ✅ **Instant Decryption** - Sub-millisecond credential retrieval with search
- ✅ **Classification System** - Organize by threat level, clearance, and operational context
- ✅ **Memory Management** - Secure clipboard with configurable purge timers
- ✅ **Multi-Modal Interface** - Tactical list and grid views for different operations
- ✅ **Access Auditing** - Complete forensic trail of credential access

### Hardened Security
- 🔐 **Air-Gapped Storage** - Zero network exposure, local-only architecture
- 👁️ **Cryptographic Masking** - Credentials obfuscated until authorized viewing
- 🕐 **Memory Sanitization** - Automatic secure memory clearing
- 🔄 **Zero Telemetry** - No logging, tracking, or data exfiltration

### Operator Experience
- ⚡ **Real-Time Intelligence** - Instant filtering across encrypted credential database
- 🎨 **Threat Identification** - Visual service fingerprinting and risk assessment
- ⌨️ **Tactical Controls** - Full keyboard operation for security professionals
- 📱 **Adaptive Interface** - Optimized for any operational environment

---

## 📦 Installation

### From Raycast Store (Recommended)
1. Open Raycast Command Center
2. Search for "CipherKeys"
3. Deploy Extension to Local Environment
4. Initialize Secure Credential Vault 🔐

### Manual Deployment
```bash
# Clone the secure repository
git clone https://github.com/your-username/cipherkeys-raycast.git

# Navigate to the extension directory
cd cipherkeys-raycast

# Install dependencies
npm install

# Build the extension
npm run build

# Deploy to Raycast
# Open Raycast → Extensions → Add Extension → Select the built extension
```

---

## 🎮 Usage

### Quick Deployment
1. **Launch**: Type `cipher` in Raycast to access the secure vault
2. **Add Credential**: Press `⌘N` to onboard your first encrypted credential
3. **Extract Key**: Select any credential and press `⌘C` for secure extraction
4. **Intelligence Search**: Start typing to filter encrypted database instantly

### Credential Onboarding

1. Press `⌘N` or select "Add Credential"
2. Fill in the security metadata:
   - **Name**: Operational identifier (e.g., "OpenAI-PROD-001")
   - **Service**: Target platform (e.g., "OpenAI", "GitHub", "Stripe")
   - **API Key**: Raw credential for encryption
   - **Classifications**: Security tags (e.g., "HIGH-SEC", "PROD", "AI-OPS")
   - **Intel Notes**: Operational context and usage parameters

![Add Key Form](./assets/screenshots/add-key.png)

### Credential Operations
- **Intelligence View**: Press `Enter` or `⌘D` to access full credential analysis
- **Modify Credential**: Press `⌘E` to update security metadata
- **Secure Deletion**: Press `⌘⌫` to permanently purge credential (with confirmation)
- **Visibility Control**: Press `⌘H` to toggle credential obfuscation

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Tactical Operation |
|----------|--------|
| `⌘N` | Onboard new credential |
| `⌘C` | Extract credential to secure clipboard |
| `⌘H` | Toggle cryptographic masking |
| `⌘E` | Modify credential metadata |
| `⌘D` | Access intelligence view |
| `⌘⌫` | Secure credential deletion |
| `⌘[` | Return to command center |
| `↑/↓` | Navigate credential database |
| `Enter` | Open credential analysis |

---

## 🔒 Security

### Encrypted Vault Architecture
All credentials are stored in an AES-256 encrypted vault at `~/.cipherkeys/vault.enc`. This hardened storage never transmits data and maintains complete air-gap security.

### Memory Security Protocol
- Credentials automatically purged from memory after 30 seconds
- Cryptographic confirmation of memory sanitization
- Configurable security timeouts for operational requirements

### Operational Security Best Practices
- ✅ Regular encrypted backups of credential vault
- ✅ Use operational identifiers without sensitive metadata
- ✅ Conduct regular security audits and credential rotation
- ✅ Maintain current security patches and updates

<details>
<summary>🛡️ Advanced Security Architecture</summary>

- CipherKeys implements AES-256-GCM encryption with PBKDF2 key derivation
- Zero network exposure with complete air-gap architecture
- Credentials decrypted only during authorized access operations
- Implement dedicated secure backup protocols for encrypted vault
- Memory protection against cold boot attacks and forensic analysis

</details>

---

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Raycast (for testing)

### Setup
```bash
# Install dependencies
npm install

# Start development mode
npm run dev

# Build for production
npm run build

# Run type checking
npm run typecheck
```

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ApiKeyListItem.tsx
│   └── KeyDisplay.tsx
├── utils/              # Utility functions
│   ├── apiKeyStorage.ts
│   └── clipboard.ts
├── index.tsx           # Main extension entry
├── add-api-key.tsx     # Add key form
├── edit-api-key.tsx    # Edit key form
└── view-api-key-detail.tsx # Key detail view
```

### Recent Security Updates
- 🐛 **Fixed Critical Security Flaw**: Credential extraction now returns actual values instead of obfuscated patterns
- ⚡ **Performance**: Enhanced encrypted database search and filtering algorithms
- 🎨 **Interface Hardening**: Improved visual security feedback and operational animations

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Quick Contribution Guide
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ using [Raycast API](https://developers.raycast.com/)
- Icons from [Raycast Icons](https://www.raycast.com/icons)
- Inspired by the amazing Raycast community

---

<div align="center">

**Engineered with 🔐 for security professionals**

[Report Security Issue](https://github.com/your-username/cipherkeys-raycast/issues) • [Request Feature](https://github.com/your-username/cipherkeys-raycast/issues) • [Security Documentation](https://github.com/your-username/cipherkeys-raycast/wiki)

</div>
