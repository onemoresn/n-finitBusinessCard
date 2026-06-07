interface Props {
  className?: string
}

export default function NFinitLogo({ className = '' }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="N-Finit"
    >
      <defs>
        <linearGradient id="nfinit-grad" x1="4" y1="4" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6c63ff" />
          <stop offset="1" stopColor="#00d4aa" />
        </linearGradient>
      </defs>

      <rect x="2" y="4" width="32" height="28" rx="8" fill="url(#nfinit-grad)" />
      <path
        d="M10 26V10h3.5l6.5 11V10H24v16h-3.4L14 15v11H10Z"
        fill="#fff"
      />

      <text
        x="42"
        y="24"
        fill="currentColor"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="15"
        fontWeight="700"
        letterSpacing="-0.02em"
      >
        N-Finit
      </text>
    </svg>
  )
}
