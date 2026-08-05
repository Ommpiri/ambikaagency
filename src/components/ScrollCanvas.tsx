import React, { useRef, useEffect, useCallback } from 'react';

interface ScrollCanvasProps {
  images: HTMLImageElement[];
}

export const ScrollCanvas: React.FC<ScrollCanvasProps> = ({ images }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = images[Math.min(frameIndex, images.length - 1)];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    // Slight zoom (5%) to crop out the watermark at the bottom-right edge
    const cropZoom = 1.05;

    let renderW: number, renderH: number, renderX: number, renderY: number;

    if (canvasRatio > imgRatio) {
      renderW = width * cropZoom;
      renderH = renderW / imgRatio;
    } else {
      renderH = height * cropZoom;
      renderW = renderH * imgRatio;
    }
    renderX = (width - renderW) / 2;
    renderY = (height - renderH) / 2;

    ctx.drawImage(img, renderX, renderY, renderW, renderH);
    ctx.restore();
  }, [images]);

  useEffect(() => {
    if (images.length === 0) return;

    const heroEl = canvasRef.current?.closest('[data-hero-scroll]') as HTMLElement | null;
    if (!heroEl) return;

    const handleScroll = () => {
      const rect = heroEl.getBoundingClientRect();
      const heroHeight = heroEl.offsetHeight;
      const viewportH = window.innerHeight;
      // How far we've scrolled through the hero (0 to heroHeight - viewportH)
      const scrolled = -rect.top;
      const maxScroll = heroHeight - viewportH;
      const progress = Math.max(0, Math.min(1, scrolled / maxScroll));
      const frameIndex = Math.min(images.length - 1, Math.floor(progress * images.length));

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(frameIndex));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    drawFrame(0);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [images, drawFrame]);

  useEffect(() => {
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
};
