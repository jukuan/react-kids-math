export default function LanguageSwitcher({ language, onChange }) {
  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'by', label: 'BY' },
  ];

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