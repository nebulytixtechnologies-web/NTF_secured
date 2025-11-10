// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="font-semibold">
          © {new Date().getFullYear()} Nebulytix Technology
        </p>
      </div>
    </footer>
  );
}
