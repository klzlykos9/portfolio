import React from 'react';

const layers = [
  [{ x: 18, y: 18 }, { x: 18, y: 45 }, { x: 18, y: 72 }],
  [{ x: 55, y: 10 }, { x: 55, y: 30 }, { x: 55, y: 60 }, { x: 55, y: 80 }],
  [{ x: 92, y: 30 }, { x: 92, y: 60 }],
];

const nodeColors = [
  ['#06b6d4', '#06b6d4', '#8b5cf6'],
  ['#8b5cf6', '#06b6d4', '#8b5cf6', '#06b6d4'],
  ['#facc15', '#06b6d4'],
];

type Edge = { x1: number; y1: number; x2: number; y2: number; idx: number };
const edges: Edge[] = [];
layers.slice(0, -1).forEach((layer, li) => {
  layer.forEach((from, fi) => {
    layers[li + 1].forEach((to, ti) => {
      edges.push({ x1: from.x, y1: from.y, x2: to.x, y2: to.y, idx: li * 20 + fi * 5 + ti });
    });
  });
});

const pulseEdges = edges.filter((_, i) => i % 3 === 0);

const NeuralNetworkIcon: React.FC<{ size?: number }> = ({ size = 1 }) => (
  <svg
    width={110 * size}
    height={90 * size}
    viewBox="0 0 110 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ overflow: 'visible' }}
  >
    <defs>
      {/* Glow filter */}
      <filter id="nn-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
      </filter>

      {/* Edge paths for animateMotion */}
      {pulseEdges.map((e, i) => (
        <path key={i} id={`ep-${i}`} d={`M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}`} />
      ))}
    </defs>

    {/* Edges — fade in via CSS animation */}
    {edges.map((e, i) => (
      <line
        key={i}
        x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
        stroke="rgba(6,182,212,0.22)"
        strokeWidth="0.8"
        style={{
          opacity: 0,
          animation: `nn-edge-in 0.5s ease forwards ${i * 0.07}s`,
        }}
      />
    ))}

    {/* Pulse dots — native SVG animateMotion */}
    {pulseEdges.map((e, i) => (
      <circle key={i} r="2" fill="#06b6d4" filter="url(#nn-glow)">
        <animateMotion
          dur="1.8s"
          repeatCount="indefinite"
          begin={`${i * 0.65}s`}
        >
          <mpath href={`#ep-${i}`} />
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.1;0.85;1"
          dur="1.8s"
          repeatCount="indefinite"
          begin={`${i * 0.65}s`}
        />
      </circle>
    ))}

    {/* Nodes */}
    {layers.map((layer, li) =>
      layer.map((node, ni) => {
        const color = nodeColors[li][ni];
        const animDelay = `${li * 0.25 + ni * 0.1}s`;
        return (
          <g key={`n-${li}-${ni}`}>
            {/* Halo — pure SVG animate */}
            <circle cx={node.x} cy={node.y} r="6" fill={color} opacity="0">
              <animate attributeName="r" values="5;9;5" dur={`${2 + ni * 0.4}s`} repeatCount="indefinite" begin={animDelay} />
              <animate attributeName="opacity" values="0.15;0.3;0.15" dur={`${2 + ni * 0.4}s`} repeatCount="indefinite" begin={animDelay} />
            </circle>
            {/* Core node */}
            <circle
              cx={node.x} cy={node.y} r="4"
              fill={color}
              filter="url(#nn-glow)"
              style={{
                opacity: 0,
                animation: `nn-node-in 0.4s ease forwards ${animDelay}`,
              }}
            />
            {/* Specular */}
            <circle cx={node.x - 1} cy={node.y - 1} r="1.4" fill="rgba(255,255,255,0.55)" style={{ opacity: 0, animation: `nn-node-in 0.4s ease forwards ${animDelay}` }} />
          </g>
        );
      })
    )}
  </svg>
);

export default NeuralNetworkIcon;
