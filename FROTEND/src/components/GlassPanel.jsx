/**
 * GlassPanel — reusable glassmorphism card container.
 * Props:
 *   className  — extra Tailwind classes
 *   hover      — bool, enable hover glow effect (default true)
 *   onClick    — optional click handler
 *   children
 */
export default function GlassPanel({ className = '', hover = true, onClick, children }) {
  return (
    <div
      onClick={onClick}
      className={`${hover ? 'glass-panel' : 'panel-glass'} rounded-lg ${className} ${onClick ? 'cursor-pointer' : ''}`}
    >
      {children}
    </div>
  );
}
