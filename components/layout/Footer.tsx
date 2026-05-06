import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-base">Tax Relief Finder Ireland</span>
            </div>
            <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
              We help Irish PAYE workers find and claim tax reliefs through Revenue themselves — no agent fees, keep 100% of your refund.
            </p>
            <p className="text-xs text-slate-500 mt-4">
              This tool provides guidance only. Final eligibility depends on Revenue rules. You are responsible for the information submitted.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Tool</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/quiz', label: 'Start Check' },
                { href: '/results', label: 'My Results' },
                { href: '/vault', label: 'Document Vault' },
                { href: '/checklist', label: 'Claim Checklist' },
                { href: '/walkthrough', label: 'Revenue Guide' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/login', label: 'Log in' },
                { href: '/register', label: 'Sign up' },
                { href: '/profile', label: 'Profile' },
                { href: '/pricing', label: 'Pricing' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Tax Relief Finder Ireland. Not affiliated with Revenue Commissioners.</span>
          <span>Not a tax agent. Not regulated financial advice.</span>
        </div>
      </div>
    </footer>
  );
}
