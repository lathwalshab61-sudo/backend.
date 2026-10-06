export default function Footer({ note }) {
  return (
    <footer className="w-full py-stack-md px-margin-page flex flex-col md:flex-row justify-between items-center opacity-80 bg-surface-dim border-t border-outline-variant/20 mb-16 md:mb-0 z-10 relative">
      <p className="font-data-label text-data-label text-tertiary text-center md:text-left mb-4 md:mb-0 max-w-2xl">
        <span className="font-bold text-primary">© 2024 FINGERSCOPE AI.</span>{' '}
        {note || 'AI-assisted analysis: results require human verification for legal forensic standards.'}
      </p>
      <div className="flex gap-4">
        <a href="#" className="font-data-label text-data-label text-on-surface-variant hover:text-primary transition-colors">
          Privacy Protocol
        </a>
        <a href="#" className="font-data-label text-data-label text-on-surface-variant hover:text-primary transition-colors">
          Methodology
        </a>
        <a href="#" className="font-data-label text-data-label text-on-surface-variant hover:text-primary transition-colors">
          Support
        </a>
      </div>
    </footer>
  );
}
