import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

type ArtProduct = Pick<
  Product,
  "slug" | "name" | "flavor" | "accentFrom" | "accentTo" | "lidColor" | "labelColor" | "artVariant"
> & { isBundle?: boolean };

function wrapName(name: string): string[] {
  const cleaned = name.replace(/\s+/g, " ").trim();
  const words = cleaned.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
    } else if (`${current} ${word}`.length <= 12) {
      current = `${current} ${word}`;
    } else {
      lines.push(current);
      current = word;
    }
    if (lines.length === 2) break;
  }
  if (lines.length < 2 && current) lines.push(current);
  return lines.slice(0, 2);
}

function Jar({
  x,
  y,
  scale = 1,
  product,
  showText = true,
  textScale = 1,
}: {
  x: number;
  y: number;
  scale?: number;
  product: ArtProduct;
  showText?: boolean;
  textScale?: number;
}) {
  const lines = wrapName(product.name);
  const gradientId = `jar-${product.slug.replace(/[^a-z0-9]/gi, "")}-${x}-${scale}`;

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="6" rx="62" ry="9" fill="#4A1525" opacity="0.12" />

      {/* Glass body */}
      <rect x="-62" y="-178" width="124" height="174" rx="28" fill={`url(#${gradientId})`} />
      <rect x="-62" y="-178" width="124" height="174" rx="28" fill="white" opacity="0.06" />
      <rect x="-46" y="-158" width="15" height="128" rx="7.5" fill="white" opacity="0.32" />
      <rect x="37" y="-160" width="8" height="120" rx="4" fill="#4A1525" opacity="0.08" />

      {/* Label */}
      <rect x="-48" y="-144" width="96" height="106" rx="13" fill={product.labelColor} />
      <rect x="-48" y="-144" width="96" height="106" rx="13" fill="none" stroke="#4A1525" strokeOpacity="0.08" />
      {showText ? (
        <>
          <text
            x="0"
            y="-122"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="9.5"
            letterSpacing="0.2"
            fill="#4A1525"
            fontWeight="600"
          >
            Nutriiva
          </text>
          <line x1="-22" y1="-116" x2="22" y2="-116" stroke="#D81B60" strokeOpacity="0.35" strokeWidth="0.75" />
          <text
            x="0"
            y="-100"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize={lines[0]?.length > 11 ? 7.5 : 9}
            fill="#4A1525"
            fontWeight="600"
          >
            {lines[0]}
          </text>
          {lines[1] ? (
            <text
              x="0"
              y="-89"
              textAnchor="middle"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={lines[1]?.length > 11 ? 7.5 : 9}
              fill="#4A1525"
              fontWeight="600"
            >
              {lines[1]}
            </text>
          ) : null}
          <text
            x="0"
            y="-73"
            textAnchor="middle"
            fontFamily="Helvetica, Arial, sans-serif"
            fontSize="5"
            letterSpacing="0.9"
            fill="#4A1525"
            opacity="0.55"
          >
            {product.flavor.toUpperCase()}
          </text>
          <line x1="-24" y1="-63" x2="24" y2="-63" stroke="#4A1525" strokeOpacity="0.12" strokeWidth="0.75" />
          <text
            x="0"
            y="-52"
            textAnchor="middle"
            fontFamily="Helvetica, Arial, sans-serif"
            fontSize="4.5"
            letterSpacing="0.8"
            fill="#4A1525"
            opacity="0.45"
          >
            DIETARY SUPPLEMENT · 30 SERVINGS
          </text>
        </>
      ) : (
        <>
          <text
            x="0"
            y="-96"
            textAnchor="middle"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="10"
            fill="#4A1525"
            fontWeight="600"
          >
            Nutriiva
          </text>
          <text
            x="0"
            y="-80"
            textAnchor="middle"
            fontFamily="Helvetica, Arial, sans-serif"
            fontSize="4.5"
            letterSpacing="0.8"
            fill="#4A1525"
            opacity="0.45"
          >
            DAILY ESSENTIAL
          </text>
        </>
      )}

      {/* Lid */}
      <rect x="-58" y="-203" width="116" height="28" rx="9" fill={product.lidColor} />
      <ellipse cx="0" cy="-203" rx="58" ry="7" fill={product.lidColor} />
      <ellipse cx="0" cy="-203" rx="50" ry="4.5" fill="#FFFFFF" opacity="0.14" />
      <line x1="-48" y1="-193" x2="48" y2="-193" stroke="#FFFFFF" strokeOpacity="0.12" />
      <line x1="-48" y1="-187" x2="48" y2="-187" stroke="#FFFFFF" strokeOpacity="0.09" />
      <line x1="-48" y1="-181" x2="48" y2="-181" stroke="#FFFFFF" strokeOpacity="0.06" />

      <defs>
        <linearGradient id={gradientId} x1="-62" y1="-178" x2="62" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor={product.accentFrom} />
          <stop offset="1" stopColor={product.accentTo} />
        </linearGradient>
      </defs>
      <title>{`${product.name} — ${product.flavor}`}</title>
    </g>
  );
}

function Decoration({ variant, accentTo, accentFrom }: { variant: string; accentTo: string; accentFrom: string }) {
  switch (variant) {
    case "berry":
      return (
        <g>
          <circle cx="196" cy="236" r="10" fill={accentTo} opacity="0.85" />
          <circle cx="208" cy="226" r="7" fill={accentFrom} />
          <circle cx="188" cy="222" r="6" fill={accentFrom} />
          <path d="M196 212c4-14 14-20 26-22-2 12-10 20-22 23" fill="#7BAA6E" opacity="0.7" />
        </g>
      );
    case "greens":
      return (
        <g opacity="0.85">
          <path d="M44 244c-2-22 8-38 28-46 2 20-8 36-28 46Z" fill="#7BAA6E" />
          <path d="M58 250c8-18 22-26 40-26-6 16-20 24-40 26Z" fill="#A9C89F" />
          <path d="M194 220c12-6 24-4 34 4-10 8-22 10-34 2Z" fill="#7BAA6E" opacity="0.6" />
        </g>
      );
    case "bundle":
      return (
        <g>
          <path d="M196 96c3-10 9-16 18-18-1 10-7 16-18 18Z" fill="#D81B60" opacity="0.45" />
          <path d="M40 118c0-12 6-22 18-28 0 12-6 22-18 28Z" fill="#7BAA6E" opacity="0.5" />
          <path d="M188 108v10M183 113h10" stroke="#D81B60" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
        </g>
      );
    case "peach":
      return (
        <g>
          <circle cx="198" cy="234" r="17" fill="#F6B393" />
          <circle cx="198" cy="234" r="17" fill="url(#peach-shade)" opacity="0.7" />
          <path d="M198 217c0-12 8-20 20-22-2 12-9 20-20 22Z" fill="#7BAA6E" />
        </g>
      );
    case "caramel":
      return (
        <g opacity="0.8">
          <ellipse cx="196" cy="232" rx="15" ry="10" transform="rotate(-18 196 232)" fill="#B88A5E" />
          <path d="M186 222c8-10 18-12 28-8" stroke="#5B3A26" strokeWidth="1" fill="none" opacity="0.5" />
        </g>
      );
    case "rose":
      return (
        <g opacity="0.8">
          <path d="M196 214c10-2 18 2 22 12-10 4-19 0-22-12Z" fill="#C46B5E" />
          <path d="M188 234c8-6 16-6 24 0-8 6-16 6-24 0Z" fill="#E7A79B" />
          <path d="M42 226c8-8 18-10 28-4-6 10-16 12-28 4Z" fill="#7BAA6E" opacity="0.5" />
        </g>
      );
    case "cream":
      return (
        <g opacity="0.8">
          <circle cx="198" cy="230" r="7" fill="#FFF6E2" />
          <circle cx="208" cy="224" r="7" fill="#FFF6E2" />
          <circle cx="203" cy="238" r="7" fill="#FFF6E2" />
          <ellipse cx="203" cy="233" rx="18" ry="6" fill="#D9B872" opacity="0.35" />
        </g>
      );
    case "lavender":
      return (
        <g opacity="0.8">
          <path d="M196 240c-2-16 2-28 12-36" stroke="#7E6A9E" strokeWidth="2" fill="none" />
          <ellipse cx="202" cy="218" rx="4" ry="9" transform="rotate(24 202 218)" fill="#9B85C7" />
          <ellipse cx="194" cy="226" rx="4" ry="8" transform="rotate(-28 194 226)" fill="#B9A9D9" />
          <ellipse cx="208" cy="206" rx="3.5" ry="7" transform="rotate(34 208 206)" fill="#9B85C7" />
        </g>
      );
    case "bronze":
      return (
        <g opacity="0.85">
          <path d="M196 220l3 10 10 3-10 3-3 10-3-10-10-3 10-3 3-10Z" fill="#B08868" />
          <path d="M42 236l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" fill="#B08868" opacity="0.7" />
        </g>
      );
    default:
      return null;
  }
}

export function ProductArt({
  product,
  className,
  decoration = true,
}: {
  product: ArtProduct;
  className?: string;
  decoration?: boolean;
}) {
  const gradientId = `bg-${product.slug.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg
      viewBox="0 0 240 300"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={`${product.name} jar`}
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="42%" r="58%">
          <stop stopColor={product.accentFrom} stopOpacity="0.55" />
          <stop offset="0.65" stopColor={product.accentFrom} stopOpacity="0.18" />
          <stop offset="1" stopColor={product.accentFrom} stopOpacity="0" />
        </radialGradient>
        <linearGradient id="peach-shade" x1="181" y1="217" x2="215" y2="251" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBD4BF" />
          <stop offset="1" stopColor="#EE9A76" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="156" r="118" fill={`url(#${gradientId})`} />

      <g transform="translate(120 270)">
        {product.isBundle ? (
          <>
            <Jar x={-52} y={-6} scale={0.58} product={product} showText={false} />
            <Jar x={52} y={-6} scale={0.58} product={product} showText={false} />
            <Jar x={0} y={0} scale={0.76} product={product} />
          </>
        ) : (
          <Jar x={0} y={0} scale={1} product={product} />
        )}
      </g>

      {decoration ? (
        <>
          <Decoration variant={product.artVariant} accentFrom={product.accentFrom} accentTo={product.accentTo} />
          <g fill="none" stroke={product.lidColor} strokeOpacity="0.28" strokeWidth="1.4" strokeLinecap="round">
            <path d="M48 90v14M41 97h14" />
            <path d="M186 78v10M181 83h10" />
            <path d="M176 172v8M172 176h8" />
          </g>
        </>
      ) : null}
    </svg>
  );
}

export default ProductArt;
