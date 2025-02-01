import { useSelector } from 'react-redux';
import HeroSection from '../components/HeroSection';
import FeaturedPizzas from '../components/FeaturedPizzas';
import WhyChooseUs from '../components/WhyChooseUs';
import CustomerTestimonials from '../components/CustomerTestimonials';
import HoursLocation from '../components/HoursLocation';
import Book from '../components/Book';
import About from '../components/About';

const Home = () => {
  // const cart = useSelector(state => state.cart.items);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeaturedPizzas />
      <WhyChooseUs />
      <About />
      <CustomerTestimonials />
      <Book />
      <HoursLocation />
    </div>
  );
};

export default Home;