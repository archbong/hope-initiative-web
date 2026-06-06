# Internationalization (i18n) Documentation

## 🌍 Supported Languages

Hope for the Hopeless Initiative website supports **10 languages** covering all major African regions, with English as the default fallback.

| # | Language | Code | Flag | Regions Covered | Native Speakers |
|---|----------|------|------|-----------------|-----------------|
| 1 | **English** | `en` | 🇬🇧 | Nigeria, Ghana, Kenya, South Africa, Uganda, Tanzania, Zambia, Zimbabwe, Botswana, Namibia, Malawi, Rwanda, South Sudan, Sierra Leone, Liberia, Gambia | 200M+ |
| 2 | **Français** | `fr` | 🇫🇷 | Benin, Burkina Faso, Cameroon, Chad, Congo, Côte d'Ivoire, DRC, Gabon, Guinea, Madagascar, Mali, Niger, Rwanda, Senegal, Togo, Tunisia | 150M+ |
| 3 | **العربية** | `ar` | 🇸🇦 | Egypt, Libya, Sudan, Tunisia, Algeria, Morocco, Mauritania, Somalia, Comoros, Djibouti | 150M+ |
| 4 | **Kiswahili** | `sw` | 🇹🇿 | Tanzania, Kenya, Uganda, DRC, Rwanda, Burundi, Mozambique, Comoros | 100M+ |
| 5 | **Hausa** | `ha` | 🇳🇬 | Nigeria, Niger, Ghana, Chad, Cameroon | 70M+ |
| 6 | **Yorùbá** | `yo` | 🇳🇬 | Nigeria, Benin, Togo | 45M+ |
| 7 | **Igbo** | `ig` | 🇳🇬 | Nigeria | 30M+ |
| 8 | **Português** | `pt` | 🇵🇹 | Angola, Mozambique, Cape Verde, Guinea-Bissau, Equatorial Guinea, São Tomé and Príncipe | 30M+ |
| 9 | **Español** | `es` | 🇪🇸 | Equatorial Guinea | 1M+ |
| 10 | **አማርኛ** | `am` | 🇪🇹 | Ethiopia | 25M+ |

## 🌍 Language Coverage by African Region

### West Africa
| Country | Languages Supported |
|---------|---------------------|
| Nigeria | English, Hausa, Yoruba, Igbo |
| Ghana | English, Hausa |
| Côte d'Ivoire | French |
| Senegal | French |
| Mali | French |
| Burkina Faso | French |
| Niger | French, Hausa |
| Benin | French, Yoruba |
| Togo | French, Yoruba |
| Guinea | French |
| Liberia | English |
| Sierra Leone | English |
| Gambia | English |
| Cape Verde | Portuguese |
| Guinea-Bissau | Portuguese |

### East Africa
| Country | Languages Supported |
|---------|---------------------|
| Kenya | English, Swahili |
| Tanzania | English, Swahili |
| Uganda | English, Swahili |
| Rwanda | English, French, Swahili |
| Burundi | French, Swahili |
| Ethiopia | Amharic |
| Somalia | Arabic |
| South Sudan | English, Arabic |
| Sudan | Arabic |
| Djibouti | French, Arabic |
| Comoros | French, Arabic, Swahili |
| Mauritius | French, English |

### Central Africa
| Country | Languages Supported |
|---------|---------------------|
| DRC | French, Swahili |
| Cameroon | French, English |
| Chad | French, Arabic |
| Congo | French |
| Gabon | French |
| Equatorial Guinea | Spanish, French, Portuguese |
| Central African Republic | French, Sango |
| São Tomé and Príncipe | Portuguese |

### Southern Africa
| Country | Languages Supported |
|---------|---------------------|
| South Africa | English |
| Angola | Portuguese |
| Mozambique | Portuguese |
| Zambia | English |
| Zimbabwe | English |
| Botswana | English |
| Namibia | English |
| Malawi | English |

### North Africa
| Country | Languages Supported |
|---------|---------------------|
| Egypt | Arabic |
| Libya | Arabic |
| Tunisia | Arabic, French |
| Algeria | Arabic, French |
| Morocco | Arabic, French |
| Mauritania | Arabic, French |

## 📁 Translation File Structure

```
src/i18n/
├── index.ts                    # i18n configuration
├── locales/
│   ├── en.json                 # English (Default)
│   ├── fr.json                 # Français
│   ├── ar.json                 # العربية
│   ├── sw.json                 # Kiswahili
│   ├── ha.json                 # Hausa
│   ├── yo.json                 # Yorùbá
│   ├── ig.json                 # Igbo
│   ├── pt.json                 # Português
│   ├── es.json                 # Español
│   └── am.json                 # አማርኛ
```

## 🚀 How to Add a New Language

### Step 1: Create Translation File

Create a new JSON file in `src/i18n/locales/` with the language code:

```json
// src/i18n/locales/xx.json
{
  "common": {
    "loading": "...",
    "error": "...",
    // ... all translation keys
  }
}
```

### Step 2: Register Language in Configuration

Update `src/i18n/index.ts`:

```typescript
// Import new language
import xx from './locales/xx.json'

// Add to resources
const resources = {
  // ... existing languages
  xx: { translation: xx }
}
```

### Step 3: Add to Language Switcher

Update `src/components/LanguageSwitcher.tsx`:

```typescript
const languages = [
  // ... existing languages
  { code: 'xx', name: 'Language Name', flag: '🇽🇽', region: 'Region' }
]
```

## 📝 Translation Key Structure

```json
{
  "common": {
    "loading": "...",
    "error": "..."
  },
  "nav": {
    "home": "...",
    "about": "..."
  },
  "home": {
    "heroTitle": "...",
    "heroSubtitle": "..."
  },
  "donate": {
    "title": "...",
    "subtitle": "..."
  },
  "financial": {
    "title": "...",
    "transactionLedger": "..."
  },
  "footer": {
    "quickLinks": "...",
    "contactUs": "..."
  }
}
```

## 🔧 How to Use Translations

### In React Components

```typescript
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('home.heroTitle')}</h1>
      <p>{t('home.heroSubtitle')}</p>
      <button>{t('common.submit')}</button>
    </div>
  )
}
```

### In HTML Attributes

```tsx
<input 
  placeholder={t('donate.fullName')}
  aria-label={t('common.search')}
/>
```

## 🌐 Language Detection Priority

The language detector checks in this order:

1. **URL Query String** - `?lang=fr`
2. **Cookie** - `i18next` cookie
3. **localStorage** - `preferred-language` key
4. **Browser Language** - `navigator.language`
5. **HTML lang Attribute** - `<html lang="">`
6. **Fallback** - English (`en`)

## 🔄 Changing Language Programmatically

```typescript
import { useTranslation } from 'react-i18next'

const { i18n } = useTranslation()
i18n.changeLanguage('fr')  // Switch to French
```

## 📊 Translation Coverage

| Category | Keys | Status |
|----------|------|--------|
| Common UI | 20+ | ✅ Complete |
| Navigation | 11 | ✅ Complete |
| Home Page | 8 | ✅ Complete |
| Donate Page | 13 | ✅ Complete |
| Financial Page | 17 | ✅ Complete |
| Footer | 8 | ✅ Complete |

## 🧪 Testing Translations

### Test Language Switching

```bash
# Via URL parameter
http://localhost:3000?lang=fr

# Via localStorage
localStorage.setItem('preferred-language', 'ar')

# Via browser language
# Change your browser's preferred language
```

## 📈 Future Language Roadmap

| Phase | Languages | Target Countries | Expected |
|-------|-----------|-----------------|----------|
| Phase 2 | Zulu (zu), Afrikaans (af) | South Africa | Q3 2024 |
| Phase 2 | Somali (so) | Somalia | Q3 2024 |
| Phase 3 | Oromo (om), Tigrinya (ti) | Ethiopia, Eritrea | Q4 2024 |
| Phase 3 | Berber (ber) | Morocco, Algeria, Tunisia | Q4 2024 |

## 🛠️ Tools for Translation Management

### For Developers
- **i18next** - Core i18n library
- **react-i18next** - React bindings
- **i18next-browser-languagedetector** - Auto language detection
- **i18next-http-backend** - Load translations (optional)

### For Translators
- Use JSON files directly
- Recommended tools:
  - [POEditor](https://poeditor.com/) - Collaborative translation
  - [Crowdin](https://crowdin.com/) - Open source translation
  - [Lokalise](https://lokalise.com/) - Professional translation

## 📝 Adding Missing Translations

If a translation key is missing for a specific language, the system will:
1. Log a warning in console (development only)
2. Fallback to the key name
3. Eventually fallback to English

## 🔍 Debugging Translations

Enable debug mode in development:

```typescript
// src/i18n/index.ts
i18n.init({
  debug: true,  // Shows missing keys in console
  // ...
})
```

## 📚 Resources

- [i18next Documentation](https://www.i18next.com/)
- [react-i18next Documentation](https://react.i18next.com/)
- [Language Detector](https://github.com/i18next/i18next-browser-languageDetector)

---

**Last Updated:** June 2026  
**Maintained by:** Architech Nigeria  
**Translation Status:** Core pages complete, ready for deployment