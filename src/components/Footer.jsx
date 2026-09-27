import { useInstallPrompt } from '../hooks/useInstallPrompt';

export default function Footer({ t }) {
  const { canInstall, promptInstall } = useInstallPrompt();

  return (
    <footer className="app-footer">
      <div className="left-cell">
        {canInstall && (
          <button className="install-btn" onClick={promptInstall}>
            ⬇ {t.download}
          </button>
        )}
      </div>
      <div className="right-cell text-right">
        {t.authorWebsite}:{' '}
        <a href="https://juljan.by" target="_blank" rel="noopener noreferrer">
          juljan.by
        </a>
      </div>
    </footer>
  );
}
