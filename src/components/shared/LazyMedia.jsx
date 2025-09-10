import { useEffect, useRef, useState } from 'react';

export function LazyImage({ src, alt, className, style, ...props }) {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
        rootMargin: '50px'
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  if (!isInView) {
    return (
      <div 
        ref={imgRef} 
        className={className}
        style={{ ...style, backgroundColor: '#f1f5f9' }}
      />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}

export function LazyVideo({ src, className, autoPlay = true, muted = true, loop = true, playsInline = true, ...props }) {
  const [isInView, setIsInView] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (videoRef.current && autoPlay) {
            videoRef.current.play().catch(e => console.log('Video autoplay failed:', e));
          }
        } else {
          if (videoRef.current) {
            videoRef.current.pause();
          }
        }
      },
      {
        threshold: 0.25,
        rootMargin: '50px'
      }
    );

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [autoPlay]);

  if (!isInView) {
    return <div ref={containerRef} className={className} />;
  }

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      {...props}
    />
  );
}