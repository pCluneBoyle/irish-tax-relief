import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  Euro,
  FileText,
  Home,
  Stethoscope,
  GraduationCap,
  Laptop,
  Briefcase,
  Shield,
  Star,
  ChevronRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const RELIEFS = [
  {
    icon: Home,
    title: 'Rent Tax Credit',
    desc: 'Up to €1,000/year for private renters',
    tag: 'Very common',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: Stethoscope,
    title: 'Medical Expenses',
    desc: '20% back on out-of-pocket GP, specialist & hospital costs',
    tag: 'Easy to claim',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: GraduationCap,
    title: 'Tuition Fees',
    desc: 'Tax relief on approved third-level fees over €3,000',
    tag: 'Students & parents',
    color: 'text-purple-600 bg-purple-50',
  },
  {
    icon: Laptop,
    title: 'Remote Working Relief',
    desc: '30% of qualifying home utility costs on WFH days',
    tag: 'Hybrid workers',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: Briefcase,
    title: 'Emergency Tax Refund',
    desc: 'Reclaim overpaid tax from job changes or emergency tax',
    tag: 'Check payslips',
    color: 'text-red-600 bg-red-50',
  },
  {
    icon: Euro,
    title: 'Flat-Rate Expenses',
    desc: 'Fixed annual relief if you buy uniforms or tools for work',
    tag: 'Trade workers',
    color: 'text-teal-600 bg-teal-50',
  },
];

const STEPS = [
  { step: '1', title: 'Answer 5-minute quiz', desc: 'Tell us about your work, rent, and expenses — no jargon.' },
  { step: '2', title: 'See your reliefs', desc: 'We identify what you likely qualify for and estimate your refund.' },
  { step: '3', title: 'Gather your proof', desc: 'We tell you exactly which documents you need.' },
  { step: '4', title: 'Claim it yourself', desc: 'Follow our step-by-step guide on Revenue myAccount. Free. No agent fees.' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-3 py-1.5 rounded-full mb-6 border border-white/20">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
              Free to use · No agent fees · Keep 100% of your refund
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find Irish tax reliefs in 5 minutes.{' '}
              <span className="text-emerald-200">Claim through Revenue yourself.</span>
            </h1>
            <p className="text-lg sm:text-xl text-emerald-100 mb-8 leading-relaxed max-w-2xl">
              Revenue gives back money to PAYE workers who claim their credits — but the process is confusing.
              We guide you through it step by step. No agent. No percentage fee. Just your full refund.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/quiz">
                <Button size="lg" className="bg-white !text-emerald-700 hover:bg-emerald-50 w-full sm:w-auto">
                  Start free check <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="!border-white/40 !text-white hover:!bg-white/10 w-full sm:w-auto">
                  See pricing
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 mt-8 text-sm text-emerald-200">
              {['Free basic scan', 'No sign-up needed to start', 'Covers 2020–2024'].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-300" /> {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-red-50">
              <div className="text-3xl font-bold text-red-600 mb-2">€800+</div>
              <div className="text-sm font-semibold text-slate-700">Average unclaimed refund per year</div>
              <div className="text-xs text-slate-500 mt-1">For PAYE workers in Ireland</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-amber-50">
              <div className="text-3xl font-bold text-amber-600 mb-2">4 years</div>
              <div className="text-sm font-semibold text-slate-700">How far back you can claim</div>
              <div className="text-xs text-slate-500 mt-1">Do not leave previous years unclaimed</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-emerald-50">
              <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-sm font-semibold text-slate-700">Of your refund stays with you</div>
              <div className="text-xs text-slate-500 mt-1">No agent percentage. Claim through Revenue directly.</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">How it works</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Four steps. No accountant. No mystery.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg mb-4">
                  {step}
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/quiz">
              <Button size="lg">
                Start free check <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reliefs */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Reliefs we check for you</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              These are the most commonly missed credits for Irish PAYE workers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RELIEFS.map(({ icon: Icon, title, desc, tag, color }) => (
              <div
                key={title}
                className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:shadow-sm transition-shadow"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-slate-900">{title}</h3>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full shrink-0">{tag}</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-emerald-50 border-t border-emerald-100 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Shield className="w-10 h-10 text-emerald-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-3">We guide. You claim. Revenue pays you.</h2>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed mb-6">
            We do not submit any claims to Revenue on your behalf. We do not act as a tax agent.
            We provide guidance to help you make the claim yourself through Revenue myAccount — so you keep every cent of your refund.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-emerald-700 font-medium">
            {[
              'No Revenue access required from us',
              'No agent fees ever',
              'No percentage of your refund',
              'You stay in full control',
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-500" /> {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-3">Ready to find what Revenue owes you?</h2>
          <p className="text-slate-400 mb-8 text-lg">Takes 5 minutes. Completely free to start.</p>
          <Link href="/quiz">
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white">
              Start free tax relief check <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
