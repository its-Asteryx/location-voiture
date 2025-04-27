import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef } from 'react';
import ImgSlider from './imgslider';

function ScrollSection({ children, delay = 0 }) {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function Home() {
  const carPages = [
    { src: "https://res.cloudinary.com/dv4fkqnbd/image/upload/v1745614398/car_images/db546d618ac5f2cf0cf4e3fa6cda5ce5.webp", label: "Sedan", path: "/Categorie" },
    { src: "https://res.cloudinary.com/dv4fkqnbd/image/upload/v1745614701/car_images/91b011899f7586976d9c18c1e237f712.webp", label: "SUV", path: "/Categorie" },
    { src: "https://res.cloudinary.com/dv4fkqnbd/image/upload/v1745614877/car_images/7f5b6697d1bbdc32f7e80a6a67ca7244.webp", label: "Sports Car", path: "/Categorie" },
  ];

  return (
    <>
      <main className="relative block min-h-[calc(100vh-250px)] overflow-x-hidden top-[72px] px-[calc(3.5vw+5px)] after:content-[''] after:absolute after:inset-0 after:bg-[center_center/cover_no-repeat_fixed] after:bg-white after:opacity-100 after:-z-10">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ImgSlider />
        </motion.div>

        <ScrollSection delay={0.3}>
          <div className="text-center mt-12">
            <Link to="/voiture" className="no-underline hover:underline text-4xl font-bold mb-4 text-gray-800">
              See All Cars
            </Link>
          </div>
        </ScrollSection>

        <ScrollSection delay={0.5}>
          <section className="text-center mt-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Drive Your Dream Car Today</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Welcome to WadhahRentals – your go-to car rental service offering a wide range of vehicles at unbeatable prices.
              Whether you're traveling for business or leisure, we’ve got the perfect ride for you.
            </p>
          </section>
        </ScrollSection>

        <ScrollSection delay={0.6}>
          <h2 className="mt-20 text-4xl font-bold mb-4 text-gray-800">Our Category</h2>
        </ScrollSection>

        <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {carPages.map((car, idx) => (
            <ScrollSection key={idx} delay={0.3 + idx * 0.2}>
              <Link
                to={car.path}
                className=" rounded-[4px] shadow-[0_26px_30px_-10px_rgba(0,0,0,0.69),0_16px_10px_-10px_rgba(0,0,0,0.73)] cursor-pointer block relative p-[4px] hover:p-0 hover:border-2 hover:border-[rgba(255,255,255,0.6)] transition-[300ms]"
              >
                <img src={car.src} alt={car.label} className="w-full h-60 object-cover" />
                <div className="p-4 bg-white">
                  <h3 className="text-xl font-semibold text-gray-700">{car.label}</h3>
                </div>
              </Link>
            </ScrollSection>
          ))}
        </section>
      </main>

      <ScrollSection delay={1}>
        <footer className="bg-gray-800 text-white text-center py-6 mt-20">
          <p>&copy; {new Date().getFullYear()} WadhahRentals. All rights reserved.</p>
          <p className="text-sm mt-2">
            Follow us on
            <a href="https://www.instagram.com/vvadhah/" className="text-blue-400 ml-1 underline hover:text-blue-600"> Instagram</a> |
            <a href="https://www.facebook.com/wadah.benamara568" className="text-blue-400 ml-1 underline hover:text-blue-600"> Facebook</a>
          </p>
        </footer>
      </ScrollSection>
    </>
  );
}

export default Home;
