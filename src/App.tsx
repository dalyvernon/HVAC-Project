import React, { useState, useEffect } from 'react';
import { PageView } from './types';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { HomeView } from './views/HomeView';
import { ServicesHubView } from './views/ServicesHubView';
import { ServiceDetailView } from './views/ServiceDetailView';
import { CostEstimator } from './components/CostEstimator';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { Phone, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from './data/hvacData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>('ac-repair');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageView, serviceSlug?: string) => {
    setCurrentPage(page);
    if (serviceSlug) {
      setSelectedServiceSlug(serviceSlug);
      setPreselectedServiceId(serviceSlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setPreselectedServiceId(serviceId);
    } else if (currentPage === 'service-detail') {
      setPreselectedServiceId(selectedServiceSlug);
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-sky-500 selection:text-white">
      {/* 1. Emergency Austin Status Banner */}
      <EmergencyBanner onBookClick={() => handleOpenBooking()} />

      {/* 2. Top Bar Navigation (Strict 3-Zone Contract) */}
      <Navbar
        currentPage={currentPage}
        selectedServiceSlug={selectedServiceSlug}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 3. Main Page View Render */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'services' && (
          <ServicesHubView
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'service-detail' && (
          <ServiceDetailView
            serviceSlug={selectedServiceSlug}
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking(selectedServiceSlug)}
          />
        )}

        {currentPage === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <CostEstimator onOpenBooking={() => handleOpenBooking('ac-installation')} />
          </div>
        )}

        {currentPage === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentPage === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* 4. Professional Quiet Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 5. Booking & Emergency Dispatch Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
      />

      {/* Floating Emergency Call / Back to Top Controls */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5">
        {/* Floating Quick Call Button on Mobile */}
        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="lg:hidden flex items-center gap-2 px-4 py-3 bg-sky-500 text-slate-950 font-extrabold text-xs rounded-full shadow-2xl hover:bg-sky-400 transition-all border border-sky-400/40"
          aria-label="Call HVAC Express Dispatch"
        >
          <Phone className="w-4 h-4" />
          <span>(512) 967-1088</span>
        </a>

        {/* Back to top button */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2.5 rounded-full bg-slate-900/90 text-white shadow-lg hover:bg-slate-800 transition-all border border-slate-700/60"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
