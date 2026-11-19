import { useState } from 'react';

type PosterProps = {
  src: string;
  title: string;
  className?: string;
};

export function Poster({ src, title, className = '' }: PosterProps) {
  // OMDb иногда отдаёт ссылку на постер, который уже не открывается
  const [failed, setFailed] = useState(false);
  const classes = `poster ${className}`.trim();

  if (src === 'N/A' || failed) {
    return <div className={`${classes} poster--empty`}>Нет постера</div>;
  }

  return (
    <img
      className={classes}
      src={src}
      alt={`Постер: ${title}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
