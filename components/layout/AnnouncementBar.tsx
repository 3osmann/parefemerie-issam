import { Sparkles } from "lucide-react";

const messages = [
  "Free shipping on orders over $65",
  "30% off your first bundle — code GLOW30",
  "90-day money-back guarantee",
  "Free Glow Guide with the first 500 orders",
];

function Group() {
  return (
    <div className="flex shrink-0 items-center">
      {messages.map((message) => (
        <span key={message} className="flex items-center gap-3 px-5 sm:gap-4 sm:px-7">
          <Sparkles className="h-3 w-3 shrink-0 text-blush-600" strokeWidth={1.75} aria-hidden="true" />
          <span className="whitespace-nowrap text-[9.5px] font-semibold uppercase tracking-[0.22em] text-plum/80 sm:text-[10.5px]">
            {message}
          </span>
        </span>
      ))}
    </div>
  );
}

export function AnnouncementBar() {
  return (
    <div
      role="region"
      aria-label="Store announcements"
      className="relative flex h-9 items-center overflow-hidden border-b border-plum/10 bg-blush-100"
    >
      <div className="marquee-mask flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Group />
        <Group />
      </div>
    </div>
  );
}

export default AnnouncementBar;
