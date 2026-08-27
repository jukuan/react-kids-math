import { translations } from '../utils/translations';

export default function LanguageSwitcher({ language, onChange }) {
  const languages = Object.keys(translations).map((code) => ({
    code,
    label: code.toUpperCase(),
  }));

  return (
    <div className="language-switcher">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          className={`lang-btn ${language === code ? 'active' : ''}`}
          onClick={() => onChange(code)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
