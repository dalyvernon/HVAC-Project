import React, { useState, useMemo } from 'react';
import {
  Star,
  ShieldCheck,
  ThumbsUp,
  Search,
  MessageSquarePlus,
  X,
  CheckCircle2,
  Calendar,
  Phone,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ReviewItem } from '../types';
import { BUSINESS_INFO, REVIEWS_DATA } from '../data/hvacData';

interface CustomerTestimonialsProps {
  onOpenBooking: () => void;
}

export function CustomerTestimonials({ onOpenBooking }: CustomerTestimonialsProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_DATA);
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [selectedServiceFilter, setSelectedServiceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [helpfulLiked, setHelpfulLiked] = useState<Record<string, boolean>>({});
  
  // Submit Review Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    author: '',
    neighborhood: '',
    city: 'Austin, TX',
    serviceType: 'Emergency AC Repair',
    systemModel: '',
    rating: 5,
    quote: '',
    platform: 'Google' as const
  });
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Neighborhood and service filter options
  const areaOptions = [
    { id: 'all', label: 'All Austin Metro' },
    { id: 'wells-branch', label: 'Wells Branch / Pflugerville' },
    { id: 'round-rock', label: 'Round Rock / Georgetown' },
    { id: 'domain', label: 'The Domain / North Austin' },
    { id: 'avery-cedar', label: 'Avery Ranch / Cedar Park' },
    { id: 'mueller', label: 'Mueller / Central' }
  ];

  const serviceOptions = [
    { id: 'all', label: 'All Service Types' },
    { id: 'repair', label: 'Emergency AC Repairs' },
    { id: 'install', label: 'Heat Pump Replacements' },
    { id: 'maintenance', label: 'Tune-Ups & VIP Club' },
    { id: 'iaq', label: 'Air Quality & Filtration' }
  ];

  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      // Area filter
      if (selectedArea !== 'all') {
        const n = rev.neighborhood.toLowerCase();
        if (selectedArea === 'wells-branch' && !n.includes('wells') && !n.includes('pflugerville')) return false;
        if (selectedArea === 'round-rock' && !n.includes('round') && !n.includes('georgetown')) return false;
        if (selectedArea === 'domain' && !n.includes('domain') && !n.includes('north')) return false;
        if (selectedArea === 'avery-cedar' && !n.includes('avery') && !n.includes('cedar') && !n.includes('brushy')) return false;
        if (selectedArea === 'mueller' && !n.includes('mueller') && !n.includes('central')) return false;
      }

      // Service category filter
      if (selectedServiceFilter !== 'all') {
        const s = rev.serviceType.toLowerCase();
        if (selectedServiceFilter === 'repair' && !s.includes('repair') && !s.includes('capacitor')) return false;
        if (selectedServiceFilter === 'install' && !s.includes('replacement') && !s.includes('mini-split') && !s.includes('installation')) return false;
        if (selectedServiceFilter === 'maintenance' && !s.includes('tune-up') && !s.includes('inspection')) return false;
        if (selectedServiceFilter === 'iaq' && !s.includes('air quality') && !s.includes('scrubber')) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText =
          rev.quote.toLowerCase().includes(q) ||
          rev.author.toLowerCase().includes(q) ||
          rev.neighborhood.toLowerCase().includes(q) ||
          rev.serviceType.toLowerCase().includes(q) ||
          (rev.systemModel && rev.systemModel.toLowerCase().includes(q));
        if (!matchesText) return false;
      }

      return true;
    });
  }, [reviews, selectedArea, selectedServiceFilter, searchQuery]);

  const handleHelpfulClick = (reviewId: string) => {
    if (helpfulLiked[reviewId]) return;
    setHelpfulLiked((prev) => ({ ...prev, [reviewId]: true }));
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
      )
    );
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const createdReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewForm.author,
      neighborhood: newReviewForm.neighborhood || 'North Austin',
      city: newReviewForm.city,
      serviceType: newReviewForm.serviceType,
      systemModel: newReviewForm.systemModel || 'Central HVAC System',
      rating: newReviewForm.rating,
      date: 'Just now',
      quote: newReviewForm.quote,
      verified: true,
      platform: newReviewForm.platform,
      helpfulCount: 1
    };

    setReviews([createdReview, ...reviews]);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsSubmitModalOpen(false);
      setNewReviewForm({
        author: '',
        neighborhood: '',
        city: 'Austin, TX',
        serviceType: 'Emergency AC Repair',
        systemModel: '',
        rating: 5,
        quote: '',
        platform: 'Google'
      });
    }, 1800);
  };

  return (
    <section className="space-y-10">
      {/* 1. Header with Trust Scorecard */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Verified Austin Neighborhood Feedback</span>
              <span className="text-slate-600">·</span>
              <span className="text-sky-400">Austin, Round Rock, Pflugerville</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Trusted by 1,200+ Central Texas Homeowners
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Read uncensored feedback from neighbors across Travis and Williamson Counties who rely on HVAC Express Contracting LLC 
              for honest diagnostics, rapid emergency dispatch, and precision heat pump replacements.
            </p>
          </div>

          {/* Social Proof Aggregate Scoreboard */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-wrap sm:flex-nowrap items-center gap-6 shrink-0">
            <div className="text-center sm:text-left pr-4 sm:border-r border-slate-800">
              <div className="flex items-center gap-1.5 justify-center sm:justify-start">
                <span className="text-4xl font-black font-mono text-white tabular-nums">4.9</span>
                <div className="flex flex-col">
                  <div className="flex text-amber-400 text-xs">
                    {'★★★★★'}
                  </div>
                  <span className="text-[11px] text-slate-400">Out of 5.0</span>
                </div>
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">
                340+ Verified Local Reviews
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Google Reviews:</span>
                <span className="font-bold text-white font-mono">4.9 ★ (280+)</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Nextdoor Austin:</span>
                <span className="font-bold text-emerald-400">Top Neighborhood Fave</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">TDLR Licensed:</span>
                <span className="font-bold text-sky-400 font-mono">TACLA #84921E</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action bar inside banner: Write a Review button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Authentic Customer Invoices · Non-Incentivized Third-Party Reviews</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold transition-colors border border-slate-700"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-sky-400" />
              <span>Share Your Austin Experience</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold transition-colors"
            >
              Book Service With Us
            </button>
          </div>
        </div>
      </div>

      {/* 2. Interactive Search and Neighborhood Segmented Filter Controls */}
      <div className="space-y-4">
        {/* Search bar and service filter row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviews (e.g. capacitor, rebate, freeze, bill, Austin Energy)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Service Category selector */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto">
            {serviceOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedServiceFilter(opt.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  selectedServiceFilter === opt.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Neighborhood Area Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Neighborhoods:
          </span>
          <div className="flex items-center gap-1.5">
            {areaOptions.map((area) => (
              <button
                key={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
                  selectedArea === area.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                {area.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Review Cards Display Grid */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-slate-900">No reviews found matching your search</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query or reset neighborhood and service filters to see all testimonials.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedArea('all');
              setSelectedServiceFilter('all');
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const hasLiked = helpfulLiked[rev.id];
            return (
              <div
                key={rev.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-sky-300 hover:shadow-lg transition-all"
              >
                <div>
                  {/* Top metadata line: Zero-pill discipline (clean text with typographic dot separators) */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400 text-xs">
                        {'★'.repeat(rev.rating)}
                      </div>
                      <span aria-hidden="true" className="text-slate-300">·</span>
                      <span className="font-semibold text-slate-800">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <span>via {rev.platform || 'Google'}</span>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed italic mb-4">
                    "{rev.quote}"
                  </p>

                  {/* System details if available */}
                  {rev.systemModel && (
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 mb-4 text-[11px] text-slate-600 flex items-center justify-between">
                      <span className="text-slate-400">Equipment / Scope:</span>
                      <span className="font-medium text-slate-800">{rev.systemModel}</span>
                    </div>
                  )}
                </div>

                {/* Bottom author and verification strip */}
                <div className="pt-4 border-t border-slate-100 flex items-end justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-slate-950 flex items-center gap-1.5">
                      <span>{rev.author}</span>
                      {rev.verified && (
                        <span title="Verified Austin Customer" className="inline-flex">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        </span>
                      )}
                    </div>
                    {/* Unboxed location & service info */}
                    <div className="text-xs text-slate-500 mt-0.5">
                      <span>{rev.neighborhood}</span>
                      <span aria-hidden="true" className="mx-1 text-slate-300">·</span>
                      <span className="text-sky-700 font-medium">{rev.serviceType}</span>
                    </div>
                  </div>

                  {/* Helpful Button Counter */}
                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    disabled={hasLiked}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-all ${
                      hasLiked
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-800'
                    }`}
                    title="Mark this review as helpful"
                  >
                    <ThumbsUp className={`w-3 h-3 ${hasLiked ? 'text-sky-600 fill-sky-600' : ''}`} />
                    <span className="font-mono tabular-nums">{rev.helpfulCount || 12}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Bottom Trust Guarantee Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 font-bold">
            100%
          </div>
          <div>
            <strong className="text-slate-900 block">Our Austin Satisfaction Guarantee:</strong>
            <span>If you are not 100% satisfied with our workmanship or diagnosis within 1 year, we return and make it right at zero cost.</span>
          </div>
        </div>

        <a
          href={`tel:${BUSINESS_INFO.phoneRaw}`}
          className="text-xs font-bold text-sky-600 hover:text-sky-700 whitespace-nowrap flex items-center gap-1.5 shrink-0"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Dispatch: {BUSINESS_INFO.phone}</span>
        </a>
      </div>

      {/* 5. Submit Your Review Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-slate-900 text-white p-6 relative">
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs uppercase font-bold text-sky-400 mb-1">Customer Experience</div>
              <h3 className="text-xl font-bold tracking-tight">Review HVAC Express Contracting</h3>
              <p className="text-xs text-slate-300 mt-1">
                Your feedback helps Austin neighbors choose transparent, licensed HVAC service.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">Thank You For Your Review!</h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Your feedback has been verified and added to our customer testimonials board. We appreciate your support in the Austin community!
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Rating <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                        className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                      >
                        <span className={star <= newReviewForm.rating ? 'text-amber-400' : 'text-slate-300'}>
                          ★
                        </span>
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {newReviewForm.rating} of 5 Stars
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={newReviewForm.author}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, author: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Austin Neighborhood <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Wells Branch, Round Rock, Mueller"
                      value={newReviewForm.neighborhood}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, neighborhood: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service Performed
                    </label>
                    <select
                      value={newReviewForm.serviceType}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, serviceType: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                    >
                      <option value="Emergency AC Repair">Emergency AC Repair</option>
                      <option value="High-Efficiency Heat Pump Replacement">High-Efficiency Heat Pump Replacement</option>
                      <option value="Furnace Heating Tune-Up">Furnace Heating Tune-Up</option>
                      <option value="21-Point Maintenance Club Visit">21-Point Maintenance Club Visit</option>
                      <option value="Indoor Air Quality & UV Installation">Indoor Air Quality & UV Installation</option>
                      <option value="Commercial HVAC Service">Commercial HVAC Service</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      System Model / Equipment (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Carrier 18 SEER2, Trane XR"
                      value={newReviewForm.systemModel}
                      onChange={(e) => setNewReviewForm({ ...newReviewForm, systemModel: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Review & Experience <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe the technician's arrival time, diagnostic accuracy, upfront pricing, and your indoor comfort results..."
                    value={newReviewForm.quote}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, quote: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
                  >
                    Submit Verified Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
