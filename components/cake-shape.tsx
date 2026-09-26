import type { CakeShape as Shape } from "@/lib/cake-builder";

/** Generated selector graphic: pink buttercream cake, round or heart, scaled by size. */
export function CakeShape({ shape, inches }: { shape: Shape; inches: 6 | 8 | 10 }) {
  const s = inches === 6 ? 0.74 : inches === 8 ? 0.87 : 1;
  const id = `${shape}-${inches}`;
  return (
    <svg viewBox="0 0 120 110" className="cake-shape" aria-hidden="true">
      <defs>
        <linearGradient id={`side-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#F5B9C8" />
          <stop offset=".45" stopColor="#FCDDE5" />
          <stop offset="1" stopColor="#F0A9BB" />
        </linearGradient>
        <radialGradient id={`top-${id}`} cx=".45" cy=".4" r=".7">
          <stop offset="0" stopColor="#FFF6F8" />
          <stop offset="1" stopColor="#F9CFDA" />
        </radialGradient>
      </defs>
      <g transform={`translate(60 102) scale(${s}) translate(-60 -102)`}>
        <ellipse cx="60" cy="100" rx="50" ry="7" fill="rgba(150,40,80,.14)" />
        {shape === "round" ? (
          <>
            <path d="M16 46v42c0 7 20 12 44 12s44-5 44-12V46Z" fill={`url(#side-${id})`} />
            <ellipse cx="60" cy="46" rx="44" ry="12" fill={`url(#top-${id})`} />
            <path
              d="M16 88c4 4 8-3 12 1s8-3 12 1 8-3 12 1 8-3 12 1 8-3 12 1 8-3 12 1 8-3 12 1"
              fill="none"
              stroke="#FFF3F6"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d="M18 50c5 5 9-2 14 2s9-3 14 1 9-3 14 1 9-3 14 1 9-3 14 1 9-3 10 0"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.6"
              strokeLinecap="round"
              opacity=".9"
            />
            <path d="M52 30c-4-6 4-10 8-4 4-6 12-2 8 4l-8 7Z" fill="#E8537F" />
          </>
        ) : (
          <>
            <path
              d="M60 96C36 84 14 70 14 50c0-6 6-12 16-12 14 0 22 8 30 16 8-8 16-16 30-16 10 0 16 6 16 12 0 20-22 34-46 46Z"
              fill={`url(#side-${id})`}
            />
            <path
              d="M60 70C38 60 16 50 16 38c0-7 7-12 16-12 13 0 21 7 28 14 7-7 15-14 28-14 9 0 16 5 16 12 0 12-22 22-44 32Z"
              fill={`url(#top-${id})`}
            />
            <path
              d="M22 60c4 4 8-3 12 1s8-3 12 1 8-3 14 3m8-2c4-4 8 2 12-2s8 2 12-2 8 2 10-1"
              fill="none"
              stroke="#FFF3F6"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path d="M52 34c-4-6 4-10 8-4 4-6 12-2 8 4l-8 7Z" fill="#E8537F" />
          </>
        )}
      </g>
    </svg>
  );
}
