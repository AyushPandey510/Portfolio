import type { SVGProps } from "react";
import type { LayerId } from "@/data/profile";

// A small, hand-drawn icon set: 24px grid, 1.75 stroke, rounded joins.
// Paths carry class "ln" so CSS can draw them in on hover/active.
type P = SVGProps<SVGSVGElement> & { size?: number };

const Svg = ({ size = 24, children, ...rest }: P & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.75}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

// AI: a neuron — nucleus with three synapses that end in nodes
export const IconAI = (p: P) => (
  <Svg {...p}>
    <circle className="ln" cx="12" cy="12" r="3.2" />
    <path className="ln" d="M12 8.8V4.5M14.8 13.6l3.9 2.3M9.2 13.6l-3.9 2.3" />
    <circle cx="12" cy="3.4" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19.6" cy="16.5" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="4.4" cy="16.5" r="1.4" fill="currentColor" stroke="none" />
    <path className="ln" d="M7 7.5c1-1 2-1.4 3-1.6M17 7.5c-1-1-2-1.4-3-1.6" opacity=".55" />
  </Svg>
);

// Backend: a stack of service blades with status LEDs
export const IconBackend = (p: P) => (
  <Svg {...p}>
    <rect className="ln" x="3.5" y="4" width="17" height="5" rx="1.6" />
    <rect className="ln" x="3.5" y="10.5" width="17" height="5" rx="1.6" />
    <path className="ln" d="M8 19.5h8M12 15.5v4" />
    <circle cx="7" cy="6.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="7" cy="13" r="1" fill="currentColor" stroke="none" />
    <path className="ln" d="M11 6.5h6M11 13h4" opacity=".55" />
  </Svg>
);

// Web: a browser frame with a cursor entering it
export const IconWeb = (p: P) => (
  <Svg {...p}>
    <path className="ln" d="M20.5 11V6.2c0-.9-.7-1.7-1.7-1.7H5.2c-.9 0-1.7.8-1.7 1.7v11.6c0 .9.8 1.7 1.7 1.7H11" />
    <path className="ln" d="M3.5 8.5h17" />
    <path className="ln" d="M14 13.5l6.5 2.4-2.8 1-1 2.8z" />
  </Svg>
);

// Mobile: a phone with a signal arc
export const IconMobile = (p: P) => (
  <Svg {...p}>
    <rect className="ln" x="6" y="3" width="10" height="18" rx="2.4" />
    <path className="ln" d="M10 18h2" />
    <path className="ln" d="M18.6 8.5a4 4 0 0 1 0 5M20.8 6.5a7 7 0 0 1 0 9" opacity=".7" />
  </Svg>
);

// Data: a cylinder with a query line passing through
export const IconData = (p: P) => (
  <Svg {...p}>
    <ellipse className="ln" cx="11" cy="5.5" rx="7" ry="2.5" />
    <path className="ln" d="M4 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13" />
    <path className="ln" d="M4 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" opacity=".55" />
    <path className="ln" d="M15 9.5l6 0M19 7.5l2 2-2 2" />
  </Svg>
);

// Ship: a container with a shield lock — cloud, DevOps and security in one
export const IconShip = (p: P) => (
  <Svg {...p}>
    <path className="ln" d="M3 9.5l7-4 7 4v7l-7 4-7-4z" />
    <path className="ln" d="M3 9.5l7 4 7-4M10 13.5v7" opacity=".55" />
    <path className="ln" d="M18.5 12.5l3 1.2v2.4c0 1.9-1.3 3.3-3 3.9-1.7-.6-3-2-3-3.9v-2.4z" />
  </Svg>
);

export const layerIcon: Record<LayerId, (p: P) => JSX.Element> = {
  ai: IconAI,
  backend: IconBackend,
  web: IconWeb,
  mobile: IconMobile,
  data: IconData,
  ship: IconShip,
};

export const IconGithub = (p: P) => (
  <Svg {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </Svg>
);

export const IconLinkedin = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M8 10.5V16M8 7.6v.01M12 16v-5.5M12 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16" />
  </Svg>
);

export const IconMail = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
  </Svg>
);

export const IconLive = (p: P) => (
  <Svg {...p}>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M18 14v4.5c0 .8-.7 1.5-1.5 1.5h-11c-.8 0-1.5-.7-1.5-1.5v-11C4 6.7 4.7 6 5.5 6H10" />
  </Svg>
);

export const IconCopy = (p: P) => (
  <Svg {...p}>
    <rect x="8" y="8" width="12" height="12" rx="2.5" />
    <path d="M16 8V6.5C16 5.1 14.9 4 13.5 4h-7C5.1 4 4 5.1 4 6.5v7C4 14.9 5.1 16 6.5 16H8" />
  </Svg>
);

export const IconCheck = (p: P) => (
  <Svg {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);

export const IconMenu = (p: P) => (
  <Svg {...p}>
    <path d="M4 8h16M4 16h10" />
  </Svg>
);

export const IconClose = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);
