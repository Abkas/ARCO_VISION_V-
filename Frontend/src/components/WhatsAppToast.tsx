import { useEffect, useState } from "react";

export default function WhatsAppToast() {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("");
  const [digits, setDigits] = useState("");
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (e: any) => {
      const d = e.detail || {};
      setDisplay(d.display || "");
      setDigits(d.digits || "");
      setMessage(d.message || "");
      setCopied(false);
      setShow(true);
      // auto-hide after 6s
      setTimeout(() => setShow(false), 6000);
    };

    window.addEventListener("arcovision:whatsapp-toast", handler as EventListener);
    return () => window.removeEventListener("arcovision:whatsapp-toast", handler as EventListener);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(digits);
      setCopied(true);
      try { if ((window as any).gtag) (window as any).gtag('event', 'contact_whatsapp_copy', { method: 'clipboard' }); } catch(e) {}
      setTimeout(() => setShow(false), 1500);
    } catch (e) {
      console.error('copy failed', e);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed right-6 bottom-6 z-50 w-[320px] max-w-full">
      <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-lg">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-sans text-xs text-neutral-500">WhatsApp</p>
            <p className="font-medium mt-1 text-neutral-800">{display}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={copy}
              className="rounded-md bg-neutral-800 px-3 py-2 text-xs text-white"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
            <a
              href={`https://wa.me/${digits}?text=${encodeURIComponent(message || '')}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-neutral-200 px-3 py-2 text-xs text-neutral-800"
            >
              Open
            </a>
            <button
              onClick={() => setShow(false)}
              className="ml-1 text-neutral-400 hover:text-neutral-600"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
