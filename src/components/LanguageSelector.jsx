import { useEffect } from 'react';

const ELEMENT_ID = 'hopehaven-language-selector';
const SCRIPT_ID = 'google-translate-element-script';

/**
 * Adds a full-page English/Sindhi translator. The Google widget translates
 * the visible content of every public page, including new pages added later.
 */
export default function LanguageSelector() {
  useEffect(() => {
    const initialize = () => {
      if (!window.google?.translate?.TranslateElement) return;

      const target = document.getElementById(ELEMENT_ID);
      if (target && !target.hasChildNodes()) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,sd',
            autoDisplay: false,
          },
          ELEMENT_ID,
        );
      }

      const combo = target?.querySelector('.goog-te-combo');
      if (combo && !combo.dataset.hopehavenLanguageListener) {
        const updateDocumentLanguage = () => {
          const isSindhi = combo.value === 'sd';
          document.documentElement.lang = isSindhi ? 'sd' : 'en';
          document.documentElement.dir = isSindhi ? 'rtl' : 'ltr';
        };

        combo.addEventListener('change', updateDocumentLanguage);
        combo.dataset.hopehavenLanguageListener = 'true';
        updateDocumentLanguage();
      }
    };

    window.googleTranslateElementInit = initialize;

    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      initialize();
      return undefined;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    return undefined;
  }, []);

  return (
    <div className="language-selector" title="Choose English or Sindhi">
      <span aria-hidden="true">🌐</span>
      <div id={ELEMENT_ID} />
    </div>
  );
}
