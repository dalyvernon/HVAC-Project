import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  CheckCircle2,
  AlertTriangle,
  Calendar
} from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/hvacData';
import { AustinServiceMap } from '../components/HvacVisuals';

export function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: 'ac-repair',
    urgency: 'standard',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRefId('MSG-' + Math.floor(100000 + Math.random() * 900000));
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Header */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Austin Dispatch Desk</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400">24/7 Response Active</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              Contact HVAC Express Contracting LLC
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Reach our local Austin team directly for emergency heating or air conditioning repairs, 
              scheduled maintenance, or complimentary new system installation estimates.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Details & Interactive Message/Dispatch Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office & Direct lines (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                  Austin Operations Center
                </span>
                <h2 className="text-2xl font-bold text-slate-950 mt-1">
                  How to Reach Us
                </h2>
              </div>

              {/* Direct Phone Highlight */}
              <div className="p-4 bg-sky-50 rounded-xl border border-sky-100 space-y-1">
                <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider">
                  24/7 Emergency Dispatch Phone
                </span>
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${BUSINESS_INFO.phoneRaw}`}
                    className="text-2xl font-black text-slate-950 hover:text-sky-600 transition-colors tracking-tight flex items-center gap-2"
                  >
                    <Phone className="w-5 h-5 text-sky-600" />
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
                <p className="text-[11px] text-sky-700">
                  Calls answered directly by local Central Texas dispatchers.
                </p>
              </div>

              {/* Physical Address */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Austin Office & Dispatch Hub:</strong>
                    <span>{BUSINESS_INFO.address}</span>
                    <span className="block">{BUSINESS_INFO.city}, {BUSINESS_INFO.state} {BUSINESS_INFO.zip}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Service Email:</strong>
                    <span>{BUSINESS_INFO.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">Hours of Operation:</strong>
                    <span>Emergency Service: 24/7 / 365 Days</span>
                    <span className="block text-slate-500">Office & Phone Lines: 7:00 AM – 8:00 PM</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-semibold">State License:</strong>
                    <span>TDLR TACLA #84921E</span>
                    <span className="block text-slate-500">Class A Combined Mechanical Contractor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Service radius vector map */}
            <AustinServiceMap />
          </div>

          {/* Right Column: Dispatch Request Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-950">Message Sent to Austin Dispatch</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Reference ID: <strong className="font-mono text-slate-900">{refId}</strong>.
                  A customer service coordinator will call you at <strong className="text-slate-900">{formData.phone}</strong> promptly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        address: '',
                        serviceType: 'ac-repair',
                        urgency: 'standard',
                        message: ''
                      });
                    }}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-lg transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-950">Send a Service Inquiry</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the details below and our service desk will respond within 15 minutes.
                  </p>
                </div>

                {/* Urgency selector */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: 'standard' })}
                    className={`py-2 text-xs font-semibold rounded-md transition-colors ${
                      formData.urgency === 'standard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Standard Service Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: 'emergency' })}
                    className={`py-2 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                      formData.urgency === 'emergency' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Immediate Emergency
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(512) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Service Address or Austin Zip Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 13900 N IH 35 or 78728"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Service Required
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                  >
                    {SERVICES_DATA.map((srv) => (
                      <option key={srv.id} value={srv.id}>
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Describe your HVAC issue or question
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what you're experiencing (e.g. AC running continuously without cooling, burning odor from heater, interest in an inverter heat pump estimate)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Service Request</span>
                  </button>
                </div>

                <div className="text-center text-[11px] text-slate-500">
                  By submitting, you agree to receive a direct confirmation call or SMS from HVAC Express Contracting LLC.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
