/**
 * StatusBadge — forensic analysis status indicator pill.
 * Props:
 *   status: 'verified' | 'pending' | 'anomaly' | 'processing' | 'not-started'
 *   label: optional override text
 */
const STATUS_MAP = {
  verified: {
    icon: 'verified',
    text: 'Verified',
    classes: 'bg-primary-container/10 border border-primary/30 text-primary',
  },
  pending: {
    icon: 'pending',
    text: 'Human Verif. Needed',
    classes: 'bg-secondary-container/20 border border-secondary/30 text-secondary',
  },
  anomaly: {
    icon: 'warning',
    text: 'Anomaly Detected',
    classes: 'bg-error-container/20 border border-error/30 text-error',
  },
  processing: {
    icon: 'sync',
    text: 'Processing',
    classes: 'bg-primary/10 border border-primary/20 text-primary',
    animate: true,
  },
  'not-started': {
    icon: 'radio_button_unchecked',
    text: 'Not Started',
    classes: 'bg-surface-variant border border-outline-variant/30 text-outline',
  },
};

export default function StatusBadge({ status = 'pending', label }) {
  const cfg = STATUS_MAP[status] || STATUS_MAP.pending;
  return (
    <div className={`flex items-center gap-1 px-2 py-1 rounded font-data-label text-data-label ${cfg.classes}`}>
      <span
        className={`material-symbols-outlined text-[14px] ${cfg.animate ? 'animate-spin' : ''}`}
      >
        {cfg.icon}
      </span>
      <span>{label ?? cfg.text}</span>
    </div>
  );
}
