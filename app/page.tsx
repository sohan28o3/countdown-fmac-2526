"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const galleryImages = [
  "/photos/photo01.jpg",
  "/photos/photo02.jpg",
  "/photos/photo03.jpg",
  "/photos/photo04.jpg",
  "/photos/photo05.jpg",
  "/photos/photo06.jpg",
  "/photos/photo07.jpg",
  "/photos/photo08.jpg"
];

// ---------- SCROLL STRIP ----------
function AutoScrollableStrip({ images, direction }: any) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let last = 0;
    const speed = direction === "left" ? 0.08 : -0.08;

    const loop = (t: number) => {
      if (!last) last = t;
      const delta = t - last;
      last = t;

      el.scrollLeft += speed * delta;

      const half = el.scrollWidth / 2;
      if (direction === "left" && el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
      if (direction === "right" && el.scrollLeft <= 0) {
        el.scrollLeft += half;
      }

      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [direction]);

  const doubled = [...images, ...images];

  return (
    <div ref={ref} className="strip-scroll">
      <div className="strip-track">
        {doubled.map((src, i) => (
          <div key={i} className="bg-img">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- MAIN ----------
export default function Home() {
  return (
    <main className="page-shell">

      {/* TOP STRIP */}
      <div className="top-region">
        <AutoScrollableStrip images={galleryImages} direction="left" />
      </div>

      {/* BOTTOM STRIP */}
      <div className="bottom-region">
        <AutoScrollableStrip images={galleryImages} direction="right" />
      </div>

      {/* CENTER */}
      <section className="middle-band">
        <div className="hero-content">

          {/* LOGO */}
          <Image
            src="/fmac-icon.png"
            alt="FMAC"
            width={2000}
            height={2000}
            className="hero-logo logo-glow"
            priority
          />

          {/* TEXT */}
          <div className="mt-4 animate-fade-in">
            <p className="showtime-text">It's a wrap</p>
          </div>

        </div>
      </section>

    </main>
  );
}