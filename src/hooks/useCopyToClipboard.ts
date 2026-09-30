import { useCallback, useEffect, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'failed';

const FEEDBACK_MS = 2000;

export function useCopyToClipboard() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');

  useEffect(() => {
    if (copyStatus === 'idle') return;
    const timer = window.setTimeout(() => setCopyStatus('idle'), FEEDBACK_MS);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  const copy = useCallback(async (text: string) => {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
      return true;
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (ok) {
          setCopyStatus('copied');
          return true;
        }
      } catch {
        /* fall through */
      }
      setCopyStatus('failed');
      return false;
    }
  }, []);

  return { copy, copyStatus };
}
