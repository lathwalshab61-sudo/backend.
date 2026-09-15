import { useNavigate } from 'react-router-dom';
import GlassPanel from '../components/GlassPanel';
import StatusBadge from '../components/StatusBadge';
import Footer from '../components/Footer';

const quickActions = [
  {
    icon: 'troubleshoot',
    iconBg: 'bg-primary-container/20',
    iconColor: 'text-primary-container',
    title: 'Analyze Fingerprint',
    titleColor: 'text-primary-fixed-dim',
    desc: 'Upload single sample for minutiae extraction.',
    to: '/analysis',
  },
  {
    icon: 'compare_arrows',
    iconBg: 'bg-secondary-container/20',
    iconColor: 'text-secondary',
    title: 'Compare Two Samples',
    titleColor: 'text-secondary',
    desc: '1-to-1 match probability analysis.',
    to: '/comparison',
  },
  {
    icon: 'menu_book',
    iconBg: 'bg-tertiary-container/20',
    iconColor: 'text-tertiary',
    title: 'Learning Center',
    titleColor: 'text-tertiary',
    desc: 'Training modules and methodology documentation.',
    to: '/academy',
  },
];

const recentAnalyses = [
  {
    id: 'FS-2024-081',
    idx: '01',
    date: 'Oct 24, 2024 • 14:32 Z',
    tag: 'Right Thumb - Whorl',
    status: 'pending',
  },
  {
    id: 'FS-2024-080',
    idx: '02',
    date: 'Oct 24, 2024 • 11:15 Z',
    tag: 'Left Index - Loop',
    status: 'verified',
  },
  {
    id: 'FS-2024-079',
    idx: '03',
    date: 'Oct 23, 2024 • 09:45 Z',
    tag: 'Unknown - Arch',
    status: 'anomaly',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Abstract Ridge Background */}
      <div className="fixed inset-0 pointer-events-none bg-ridge-pattern z-0 opacity-50" />

      <main className="flex-grow pt-24 pb-32 md:pb-24 px-margin-page max-w-[1440px] mx-auto w-full z-10 flex flex-col gap-margin-page">
        {/* Hero */}
        <section className="flex flex-col gap-stack-md py-stack-md border-b border-outline-variant/20">
          <h1 className="font-display-lg text-display-lg">Dashboard</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            AI-Assisted Fingerprint Examination &amp; Comparison
          </p>
          <div className="mt-stack-sm p-4 border border-outline-variant/30 bg-surface-container-low rounded flex items-start gap-4">
            <span className="material-symbols-outlined text-primary-container mt-1">info</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <strong className="text-on-surface">AI Safety Disclaimer:</strong> FINGERSCOPE AI
              provides AI-assisted observations for educational and forensic support. Results require
              qualified human examiner verification.
            </p>
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Col — Quick Actions */}
          <div className="lg:col-span-4 flex flex-col gap-gutter">
            <h2 className="font-headline-sm text-headline-sm border-b border-outline-variant/10 pb-2 mb-2">
              Quick Actions
            </h2>
            {quickActions.map((action) => (
              <GlassPanel
                key={action.to}
                onClick={() => navigate(action.to)}
                className="p-container-padding flex flex-col gap-stack-sm transition-all hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded ${action.iconBg} flex items-center justify-center ${action.iconColor} mb-2`}>
                  <span className="material-symbols-outlined">{action.icon}</span>
                </div>
                <h3 className={`font-data-value text-data-value ${action.titleColor}`}>{action.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{action.desc}</p>
              </GlassPanel>
            ))}

            {/* System Status */}
            <div className="mt-auto p-4 border border-outline-variant/10 rounded">
              <h4 className="font-data-label text-data-label text-on-surface-variant mb-2 uppercase">
                System Status
              </h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-fixed-dim animate-pulse" />
                <span className="font-data-value text-data-value text-primary-fixed-dim">
                  Core Analysis Engine Online
                </span>
              </div>
            </div>
          </div>

          {/* Right Col — Recent Analyses */}
          <div className="lg:col-span-8 flex flex-col gap-gutter">
            <div className="flex items-center justify-between border-b border-outline-variant/10 pb-2 mb-2">
              <h2 className="font-headline-sm text-headline-sm">Recent Analyses</h2>
              <button
                onClick={() => navigate('/analysis')}
                className="font-data-label text-data-label text-primary hover:underline bg-transparent border-0 flex items-center gap-1"
              >
                View All{' '}
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {recentAnalyses.map((item) => (
                <GlassPanel
                  key={item.id}
                  className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-data-label text-data-label text-outline w-8">{item.idx}</span>
                    <div>
                      <h3 className="font-data-value text-data-value text-primary-fixed-dim font-bold">
                        {item.id}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <span className="px-2 py-1 bg-surface-variant rounded border border-outline-variant/30 font-data-label text-data-label text-on-surface">
                      {item.tag}
                    </span>
                    <StatusBadge status={item.status} />
                    <button
                      onClick={() => navigate('/analysis/result')}
                      className="ml-auto sm:ml-2 text-on-surface-variant hover:text-primary transition-colors bg-transparent border-0"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
