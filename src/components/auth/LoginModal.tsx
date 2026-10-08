import React, { useState } from 'react';
import {
  Lock,
  Mail,
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  X,
  UserCheck,
  Building2,
  Sparkles,
} from 'lucide-react';
import { AuthorizedUser } from '../../types/auth';
import { validateCredentials, AUTHORIZED_CREDENTIALS } from '../../utils/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AuthorizedUser) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const user = validateCredentials(email, password);
      setIsSubmitting(false);

      if (user) {
        onLoginSuccess(user);
        onClose();
      } else {
        setErrorMessage(
          'Access Denied: The provided email or password does not match any authorised evaluator profile. Please use an authorised institutional account.'
        );
      }
    }, 400);
  };

  const handleSelectPresetAccount = (accEmail: string, accPass: string) => {
    setEmail(accEmail);
    setPassword(accPass);
    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Authorised Evaluator Login
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Clinical &amp; Institutional Credential Portal
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Regulatory Notice */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-2.5 text-xs text-slate-600">
            <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <span>
              Restricted portal for accredited clinicians, research investigators, and project
              supervisors. Data records are tamper-proof and permanently logged.
            </span>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Authorised Email / User ID
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@institution.edu or clinician id"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Secure Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-600 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 rounded-lg shadow-xs transition flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Verifying Credentials…</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>Authenticate &amp; Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Demo Credential Quick Selector */}
          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Authorised Demo Profiles (Quick Load)</span>
              </span>
            </div>

            <div className="space-y-1.5">
              {AUTHORIZED_CREDENTIALS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => handleSelectPresetAccount(acc.email, acc.password)}
                  className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50/50 transition group flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-slate-900 group-hover:text-teal-900 truncate">
                      {acc.user.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">{acc.email}</div>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 border border-teal-200/80 px-2 py-0.5 rounded shrink-0">
                    {acc.user.role}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
