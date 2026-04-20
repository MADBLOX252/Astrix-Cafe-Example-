import Navbar from './components/Navbar';
import PageLoader from './components/PageLoader';
import HeroSection from './components/HeroSection';
import IntroSection from './components/IntroSection';
import HowItWorksSection from './components/HowItWorksSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="grain-overlay" />
      <PageLoader />
      <Navbar />
      
      <main>
        <HeroSection />
        <IntroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
