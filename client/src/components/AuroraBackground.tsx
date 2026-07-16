/**
 * AuroraBackground — completely static, stable, aesthetic dark background.
 * No animation. No JavaScript. No blobs. No circles.
 * The cursor aurora is handled separately by CursorEffect.tsx.
 */
const AuroraBackground: React.FC = () => (
  <div
    className="fixed inset-0 z-0 pointer-events-none"
    aria-hidden
    style={{ background: '#020c1b' }}
  >
    {/* Very faint atmospheric depth at top — like moonlight through dark clouds.
        Barely visible, just enough to feel like space rather than flat black. */}
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(ellipse 80% 45% at 50% -2%,
            rgba(8, 48, 110, 0.22) 0%,
            rgba(5, 28, 72, 0.10) 50%,
            transparent 80%),
          radial-gradient(ellipse 60% 30% at 18% 100%,
            rgba(4, 22, 55, 0.12) 0%,
            transparent 65%),
          radial-gradient(ellipse 50% 25% at 88% 90%,
            rgba(14, 10, 45, 0.10) 0%,
            transparent 60%)
        `,
      }}
    />

    {/* Animated grain — cinematic texture that makes it feel alive */}
    <div className="absolute inset-0 aurora-grain" />

    {/* Vignette — edges slightly darker to push attention toward center */}
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 100% 90% at 50% 50%, transparent 40%, rgba(1,5,14,0.55) 80%, rgba(1,4,12,0.80) 100%)',
      }}
    />
  </div>
);

export default AuroraBackground;
