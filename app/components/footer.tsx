export default function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-secondary">
          <p>&copy; {new Date().getFullYear()} The Nagging Partner. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="mailto:waitlist@thenaggingpartner.com"
              className="hover:text-text-primary transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
