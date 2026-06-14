'use client';

interface InfiniteMarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
  separator?: string;
}

export default function InfiniteMarquee({
  items,
  direction = 'left',
  speed = 25,
  className = '',
  separator = '•',
}: InfiniteMarqueeProps) {
  const doubled = [...items, ...items];
  const animationClass = direction === 'left' ? 'marquee-track-left' : 'marquee-track-right';

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex ${animationClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="mx-4 text-sm font-heading uppercase tracking-widest">
              {item}
            </span>
            {i < doubled.length - 1 && (
              <span className="text-current/40 text-xs mx-2">{separator}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
