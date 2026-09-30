import React, { useState } from 'react';
import { X, CheckCircle, Phone, Calendar, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO, SERVICES_DATA } from '../data/hvacData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export function BookingModal({ isOpen, onClose, preselectedServiceId }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceId: preselectedServiceId || 'ac-repair',
    urgency: 'standard',
    preferredDate: '',
    preferredTime: 'morning',
    issueDetails: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = 'HX-' + Math.floor(100000 + Math.random() * 900000);
    setConfirmationCode(randomCode);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      serviceId: 'ac-repair',
      urgency: 'standard',
      preferredDate: '',
      preferredTime: 'morning',
      issueDetails: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Clock className="w-3.5 h-3.5" />
            Fast Austin Dispatch
          </div>
          <h3 className="text-xl font-bold tracking-tight">Schedule HVAC Service</h3>
          <p className="text-xs text-slate-300 mt-1">
            Need emergency dispatch? Call <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-sky-400 font-bold underline">{BUSINESS_INFO.phone}</a> for immediate priority queue.
          </p>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Dispatch Request Received
              </span>
              <h4 className="text-2xl font-bold text-slate-900 mt-3">You're On The Schedule!</h4>
              <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our Austin dispatch coordinator will call you at <strong className="text-slate-900">{formData.phone}</strong> within 15 minutes to confirm technician ETA.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Service Confirmation:</span>
                <span className="font-mono font-bold text-slate-900">{confirmationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Type:</span>
                <span className="font-semibold text-slate-800">
                  {SERVICES_DATA.find((s) => s.id === formData.serviceId)?.title || 'HVAC Service'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Address:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[200px]">{formData.address || 'Austin Metro Area'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Urgency:</span>
                <span className={`font-bold ${formData.urgency === 'emergency' ? 'text-amber-600' : 'text-slate-800'}`}>
                  {formData.urgency === 'emergency' ? '24/7 Immediate Emergency' : 'Standard Scheduled Visit'}
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Dispatch Directly
              </a>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Urgency selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, urgency: 'standard' })}
                className={`py-2 text-xs font-semibold rounded-md transition-colors ${
                  formData.urgency === 'standard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard Appointment
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, urgency: 'emergency' })}
                className={`py-2 text-xs font-semibold rounded-md transition-colors flex items-center justify-center gap-1.5 ${
                  formData.urgency === 'emergency' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                Urgent / Emergency Dispatch
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jordan Smith"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Service Address / Austin Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street & Zip (e.g. 78728)"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="jordan@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Service Required</label>
              <select
                value={formData.serviceId}
                onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              >
                {SERVICES_DATA.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    {srv.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Arrival Window</label>
                <select
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
                >
                  <option value="emergency">ASAP (Immediate 2-Hour Dispatch)</option>
                  <option value="morning">Morning (8:00 AM - 12:00 PM)</option>
                  <option value="afternoon">Afternoon (12:00 PM - 4:00 PM)</option>
                  <option value="evening">Evening (4:00 PM - 8:00 PM)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Describe the symptoms (optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. AC blowing lukewarm air, outdoor fan not spinning, strange buzzing noise, water dripping from ceiling..."
                value={formData.issueDetails}
                onChange={(e) => setFormData({ ...formData, issueDetails: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              />
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Flat-rate pricing guarantee. We never begin work without your explicit written approval.</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
              >
                Confirm Appointment Request
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
