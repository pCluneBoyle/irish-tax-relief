import Link from 'next/link';
import { CheckCircle, X, ArrowRight, Star, Shield } from 'lucide-react';
import Button from '@/components/ui/Button';

const FREE_FEATURES = [
  'Basic tax relief scan',
  'Estimated refund range',
  'Results for current tax year',
  'Revenue walkthrough guide',
  'No account required',
];

const FREE_MISSING = [
  'Full 4-year scan',
  'Detailed claim checklist',
  'Document vault',
  'Priority support',
];

const PRO_FEATURES = [
  'Full 4-year scan (2020–2024)',
  'Detailed step-by-step claim checklist',
  'Document vault — store & organise receipts',
  'Revenue screen-by-screen walkthrough',
  'Yearly reminder to re-check',
  'All 8+ reliefs checked',
  'Confidence & difficulty ratings',
  'Profile saved across sessions',
];

const YEARLY_FEATURES = [
  'Everything in Pro',
  'Automatic annual re-check',
  'New reliefs added as they launch',
  'Email reminder each year',
  'Priority support',
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
            Simple, transparent pricing
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            We charge a flat fee — never a percentage of your refund. You keep 100% of what Revenue gives you.
          </p>
          <div className="inline-flex items-center gap-2 mt-4 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-2 rounded-full border border-emerald-200">
            <Shield className="w-4 h-4" />
            No commission. No percentage. Your refund stays yours.
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Free</h2>
              <div className="text-4xl font-bold text-slate-900 mb-1">€0</div>
              <p className="text-sm text-slate-500">No account needed. Start immediately.</p>
            </div>
            <ul className="space-y-2 flex-1 mb-6">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
              {FREE_MISSING.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-400">
                  <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/quiz">
              <Button variant="outline" className="w-full">
                Start free check
              </Button>
            </Link>
          </div>

          {/* Pro */}
          <div className="bg-emerald-600 rounded-2xl border border-emerald-500 p-6 shadow-lg flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-900" /> Most popular
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-white mb-1">Pro</h2>
              <div className="text-4xl font-bold text-white mb-1">€19</div>
              <p className="text-sm text-emerald-200">One-time payment. No subscription.</p>
            </div>
            <ul className="space-y-2 flex-1 mb-6">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-white">
                  <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button className="w-full bg-white !text-emerald-700 hover:bg-emerald-50">
                Get Pro <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <p className="text-xs text-emerald-200 text-center mt-3">
              Covers all years 2020–2024 in one payment
            </p>
          </div>

          {/* Yearly */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Yearly</h2>
              <div className="text-4xl font-bold text-slate-900 mb-1">€29<span className="text-lg font-normal text-slate-500">/yr</span></div>
              <p className="text-sm text-slate-500">Annual subscription with auto-renewal.</p>
            </div>
            <ul className="space-y-2 flex-1 mb-6">
              {YEARLY_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button className="w-full">
                Get Yearly <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Value prop */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm text-center max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Why pay €19 instead of using a tax agent?</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Most tax agents charge <strong>10–15% of your refund</strong>. On an €800 refund that is €80–€120 in fees. Our Pro plan costs €19 flat and you claim through Revenue yourself — keeping every cent.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">€80–€120</div>
              <div className="text-slate-400 text-xs mt-1">Typical tax agent fee on €800 refund</div>
            </div>
            <div className="text-slate-200 font-light text-2xl">vs</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">€19</div>
              <div className="text-slate-400 text-xs mt-1">Tax Relief Finder Pro (one-time)</div>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-400 text-center mt-8">
          This tool provides guidance only. We do not act as a tax agent and do not submit claims to Revenue. Final refund amounts depend on your individual circumstances and Revenue rules.
        </p>
      </div>
    </div>
  );
}
