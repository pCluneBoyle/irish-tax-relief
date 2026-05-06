import Link from 'next/link';
import { ExternalLink, AlertTriangle, CheckCircle, Monitor, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const STEPS = [
  {
    step: 1,
    title: 'Log in to Revenue myAccount',
    description: 'Go to myaccount.revenue.ie. Log in using your PPSN and password, or through MyGovID.',
    tip: 'If you have not registered, select "Register" and have your PPSN and a recent payslip or tax document ready.',
  },
  {
    step: 2,
    title: 'Go to PAYE Services',
    description: 'Once logged in, look for the "PAYE Services" card on your dashboard or in the left-hand menu.',
    tip: 'This is where all refund claims and credit reviews are managed for PAYE workers.',
  },
  {
    step: 3,
    title: 'Select "Review your tax"',
    description: 'Click "Review your tax" to see a list of tax years you can review or amend.',
    tip: 'You can review the current year and up to 4 previous tax years (2020–2024).',
  },
  {
    step: 4,
    title: 'Choose the tax year',
    description: 'Select the tax year you want to review. Work through each year you have identified in your results.',
    tip: 'Start with the oldest year first — refunds are processed per year.',
  },
  {
    step: 5,
    title: 'Complete your Income Tax Return (if prompted)',
    description: 'For some years, Revenue will ask you to complete a brief income tax return before you can add credits.',
    tip: 'Have your Employment Detail Summary (from myAccount) handy. This replaces the old P60.',
  },
  {
    step: 6,
    title: 'Go to "Tax Credits & Reliefs"',
    description: 'After reviewing your income, click "Tax Credits & Reliefs" to add or amend credits for the year.',
    tip: 'This is where you enter Rent Tax Credit, Health Expenses, Tuition Fees, and all other reliefs.',
  },
  {
    step: 7,
    title: 'Add each relevant credit',
    description:
      'For each relief identified in your checklist, find the relevant section and enter the required information. Refer to your claim checklist for what to enter.',
    tip: 'Some credits (like Rent Tax Credit) will ask for landlord details or RTB registration. Have these ready.',
  },
  {
    step: 8,
    title: 'Review and submit',
    description: 'Review all entries before submitting. Revenue will calculate your updated tax position.',
    tip: 'If you overpaid, you will see a refund amount. Confirm and submit.',
  },
  {
    step: 9,
    title: 'Save your confirmation',
    description:
      'After submitting, Revenue will confirm the claim and tell you when to expect your refund (usually within 5 business days for bank transfer).',
    tip: 'Screenshot or save the confirmation number for your records.',
  },
];

const FAQS = [
  {
    q: 'How long does a refund take?',
    a: 'Revenue typically processes refunds within 3–5 business days once a valid bank account is linked. First-time refunds may take longer.',
  },
  {
    q: 'Do I need to keep receipts?',
    a: 'Yes. Revenue may request receipts at any time, so keep all receipts for at least 6 years after the claim.',
  },
  {
    q: 'What if I made a mistake?',
    a: 'You can amend your return through the same PAYE Services > Review your tax workflow. There is no penalty for corrections.',
  },
  {
    q: 'Can I claim for my spouse or partner?',
    a: 'Yes, for jointly assessed couples. Some credits (like Rent Tax Credit) are doubled for couples.',
  },
  {
    q: 'Will claiming affect my tax credits next year?',
    a: 'Adding recurring credits like Rent Tax Credit will be applied forward. One-off claims for past expenses do not affect future credits.',
  },
];

export default function WalkthroughPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
            <Monitor className="w-4 h-4" />
            <span>Revenue myAccount guide</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Step-by-step Revenue Walkthrough</h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Follow these steps on Revenue myAccount to claim your reliefs. Keep your claim checklist open alongside this guide.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
          <div>
            <strong>Important:</strong> This guide provides general navigation guidance only. Revenue myAccount screens may change. Final eligibility depends on Revenue rules. You are responsible for the information submitted.
          </div>
        </div>

        {/* Before you start */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-8 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-3">Before you start — have these ready</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              'Your PPSN',
              'myAccount login or MyGovID',
              'Your claim checklist (from this app)',
              'Relevant receipts and documents',
              'Landlord PPSN or RTB details (for rent credit)',
              'Form Med 2 from dentist (for dental expenses)',
              'College receipts (for tuition)',
              'Utility bills (for WFH relief)',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <a
            href="https://www.myaccount.revenue.ie"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            Open Revenue myAccount <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-10">
          {STEPS.map(({ step, title, description, tip }) => (
            <div key={step} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {step}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-2">{description}</p>
                  {tip && (
                    <div className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2 text-xs text-blue-700">
                      <span className="font-bold shrink-0">Tip:</span>
                      <span>{tip}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Common questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="https://www.myaccount.revenue.ie" target="_blank" rel="noopener noreferrer">
            <Button>
              Open Revenue myAccount <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </a>
          <Link href="/checklist">
            <Button variant="outline">
              View claim checklist <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
