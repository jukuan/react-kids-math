import StarDisplay from './StarDisplay';
import LanguageSwitcher from './LanguageSwitcher';

export default function StartScreen({
  t,
  language,
  onLanguageChange,
  totalStars,
  onStart,
}) {
  return (
    <div className="screen start-screen">
      <div className="mascot">🦊</div>
      <h1 className="app-title">{t.appTitle}</h1>
      <StarDisplay totalStars={totalStars} />
      <LanguageSwitcher language={language} onChange={onLanguageChange} />
      <button className="primary-btn" onClick={onStart}>
        {t.start}
      </button>
    </div>
  );
}
