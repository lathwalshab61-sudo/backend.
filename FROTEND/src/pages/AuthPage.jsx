import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

export default function AuthPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState('Forensic Investigator');

  // Status
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const apiBase = (
    import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://forensic-1-2.onrender.com' : '')
  ).replace(/\/+$/, '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    const endpoint = isRegister ? `${apiBase}/api/auth/register` : `${apiBase}/api/auth/login`;
    const payload = isRegister ? { name, email, password, organization, role } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      // Save token and user details
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setSuccessMsg(data.message || 'Success! Redirecting...');
      setTimeout(() => {
        navigate('/profile');
      }, 800);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In Simulation / Integration
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    setLoading(true);

    try {
      // Prompt user or use profile
      const userEmail = prompt('Enter your Google Account email for Instant Sign-In:', 'investigator@gmail.com');
      if (!userEmail) {
        setLoading(false);
        return;
      }
      const userName = userEmail.split('@')[0].replace(/[._]/g, ' ');

      const res = await fetch(`${apiBase}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          name: userName.charAt(0).toUpperCase() + userName.slice(1),
          googleId: 'g-' + Date.now(),
          picture: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMAg7HuamN99ppaqHdkZHj-j_TXvs-iZgwBkuIJ1TomuSc6cCw1FaCHY1I2axRa_eZfg-5mvM7B1cpBr7wkMxZ8XYOx5cGP3mOqhTlI2QHNccUzeE-cV0c8I-w6dliGatvYoyVbuZjdwYrqygHRs0Fo6TWJcgpI4ozHsD5K3jque7tK4sbDeIIQayGAXXqvSsM6rPXFsSjlvURt1w24ZVz8MlD1R03dqsYTQdMN9QsTFGi0fbt3Oql',
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Google Sign-In failed.');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/profile');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col pt-16 pb-24 md:pb-0">
      <main className="flex-grow flex items-center justify-center px-margin-page py-container-padding">
        <div className="glass-panel p-6 sm:p-10 rounded-2xl w-full max-w-md flex flex-col gap-6 relative shadow-2xl">
          {/* Logo & Title */}
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-1">
              <span className="material-symbols-outlined text-3xl">fingerprint</span>
            </div>
            <h1 className="font-display-md text-display-md text-on-surface">
              {isRegister ? 'Create Profile' : 'Investigator Portal'}
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {isRegister
                ? 'Register your official forensic examiner profile'
                : 'Sign in to access secure case records and quizzes'}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex rounded-lg bg-surface-container-low p-1 border border-outline-variant/20">
            <button
              onClick={() => {
                setIsRegister(false);
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-md font-data-label text-data-label transition-colors cursor-pointer ${
                !isRegister ? 'bg-primary text-on-primary shadow' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setIsRegister(true);
                setErrorMsg('');
              }}
              className={`flex-1 py-2 rounded-md font-data-label text-data-label transition-colors cursor-pointer ${
                isRegister ? 'bg-primary text-on-primary shadow' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 bg-error/15 border border-error/30 rounded text-error text-sm font-data-value flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-primary/15 border border-primary/30 rounded text-primary text-sm font-data-value flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isRegister && (
              <div>
                <label className="font-data-label text-xs text-on-surface-variant block mb-1 uppercase">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Francis Galton"
                  className="w-full p-3 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md focus:border-primary focus:outline-none"
                />
              </div>
            )}

            <div>
              <label className="font-data-label text-xs text-on-surface-variant block mb-1 uppercase">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="investigator@forensics.org"
                className="w-full p-3 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="font-data-label text-xs text-on-surface-variant block mb-1 uppercase">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md focus:border-primary focus:outline-none"
              />
            </div>

            {isRegister && (
              <div>
                <label className="font-data-label text-xs text-on-surface-variant block mb-1 uppercase">
                  Organization / University
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="State Police Forensic Bureau"
                  className="w-full p-3 rounded bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md focus:border-primary focus:outline-none"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-primary text-on-primary rounded font-data-value text-data-value hover:bg-primary-fixed transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_0_rgba(76,215,246,0.3)] disabled:opacity-50"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">
                    {isRegister ? 'person_add' : 'login'}
                  </span>
                  <span>{isRegister ? 'Create Investigator Profile' : 'Sign In'}</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-grow border-t border-outline-variant/20" />
            <span className="font-data-label text-xs text-outline uppercase">OR</span>
            <div className="flex-grow border-t border-outline-variant/20" />
          </div>

          {/* Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-3 rounded border border-outline-variant/40 bg-surface-container-low hover:bg-surface-variant transition-colors flex items-center justify-center gap-3 font-data-value text-data-value text-on-surface cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
