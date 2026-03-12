export function BackgroundLayer({ theme }) {
  return (
    <div className="bg-layer">
      <div className="bg-orb orb-a" style={{ background: theme.orbA }} />
      <div className="bg-orb orb-b" style={{ background: theme.orbB }} />
      <div className="bg-orb orb-c" style={{ background: theme.orbC }} />
      <div className="bg-orb orb-d" style={{ background: theme.orbA }} />
    </div>
  );
}
