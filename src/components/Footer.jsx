export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-10">
      <div className="max-w-6xl mx-auto px-5 py-6 text-center">
        <p className="text-white/60 text-sm">
          © {new Date().getFullYear()} FCIT NoteHub | Built by FCIT students Abdulaziz Shaheen & Ayman Turkistani.
        </p>
      </div>
    </footer>
  );
}