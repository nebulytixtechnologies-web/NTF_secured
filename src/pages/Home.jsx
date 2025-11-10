// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";

// Import images from assets/images folder
import hero1 from "../assets/images/hero1.jpg";
import hero2 from "../assets/images/hero2.jpg";
import hero3 from "../assets/images/hero3.jpg";

export default function Home() {
  const images = [hero1, hero2, hero3];

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      <header className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Welcome to Nebulytix Technology
          </h1>
          <p className="text-gray-600 mt-3">
            Innovating cloud solutions for modern businesses.
          </p>
        </div>

        <div className="mt-8">
          <Carousel images={images} />
        </div>

        <section className="mt-12 bg-white rounded-lg p-6 shadow">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p className="mt-3 text-gray-700">
            Nebulytix Technology is a fast-growing software company focused on
            building scalable cloud and web solutions. We value innovation,
            collaboration, and continuous learning.
          </p>
        </section>
      </header>

      <Footer />
    </div>
  );
}
