import { ImageResponse } from 'next/og'

export const size = { width: 56, height: 56 }
export const contentType = 'image/svg+xml'

export default function Icon() {
  const peak = '#F5EFE6'
  const accent = '#C17A5A'

  return new ImageResponse(
    (
      <svg width={56} height={56} viewBox="0 0 56 56">
        <ellipse cx="28" cy="44" rx="18" ry="5" stroke={accent} strokeWidth="1.8" />
        <line x1="10" y1="28" x2="10" y2="44" stroke={accent} strokeWidth="1.8" />
        <line x1="46" y1="28" x2="46" y2="44" stroke={accent} strokeWidth="1.8" />
        <path d="M10 36 Q28 41 46 36" stroke={accent} strokeWidth="1" strokeDasharray="2 2" opacity="0.45" />
        <ellipse cx="28" cy="28" rx="18" ry="5" stroke={peak} strokeWidth="1.8" />
        <path d="M20 28 L28 12 L36 28" stroke={peak} strokeWidth="1.8" strokeLinejoin="round" />
        <circle cx="28" cy="12" r="2.2" fill={accent} />
        <circle cx="17" cy="22" r="1.4" fill={accent} opacity="0.65" />
        <circle cx="39" cy="20" r="1.4" fill={accent} opacity="0.65" />
      </svg>
    ),
    size
  )
}
