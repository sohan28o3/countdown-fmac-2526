"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
};

const galleryImages = [
  "/photos/photo01.jpg",
  "/photos/photo02.jpg",
  "/photos/photo03.jpg",
  "/photos/photo04.jpg",
  "/photos/photo05.jpg",
  "/photos/photo06.jpg",
  "/photos/photo07.jpg",
  "/photos/photo08.jpg",
  "/photos/photo09.jpg",
  "/photos/photo10.jpg",
  "/photos/photo11.jpg",
  "/photos/photo12.jpg",
  "/photos/photo13.jpg",
  "/photos/photo14.jpg",
  "/photos/photo15.jpg",
  "/photos/photo16.jpg",
  "/photos/photo17.jpg",
  "/photos/photo18.jpg",
  "/photos/photo19.jpg",
  "/photos/photo20.jpg",
  "/photos/photo21.jpg",
  "/photos/photo22.jpg",
  "/photos/photo23.jpg",
  "/photos/photo24.jpg",
  "/photos/photo25.jpg",
  "/photos/photo26.jpg",
  "/photos/photo27.jpg",
  "/photos/photo28.jpg",
  "/photos/photo29.jpg",
  "/photos/photo30.jpg",
  "/photos/photo31.jpg",
  "/photos/photo32.jpg",
  "/photos/photo33.jpg",
  "/photos/photo34.jpg",
  "/photos/photo35.jpg",
  "/photos/photo36.jpg",
  "/photos/photo37.jpg",
  "/photos/photo38.jpg",
  "/photos/photo39.jpg",
  "/photos/photo40.jpg",
  "/photos/photo41.jpg",
  "/photos/photo42.jpg",
  "/photos/photo43.jpg",
  "/photos/photo44.jpg",
  "/photos/photo45.jpg",
  "/photos/photo46.jpg",
  "/photos/photo47.jpg",
  "/photos/photo48.jpg",
  "/photos/photo49.jpg",
  "/photos/photo50.jpg",
  "/photos/photo51.jpg",
  "/photos/photo52.jpg",
  "/photos/photo53.jpg",
  "/photos/photo54.jpg",
  "/photos/photo55.jpg",
  "/photos/photo56.jpg",
  "/photos/photo57.jpg",
  "/photos/photo58.jpg",
  "/photos/photo59.jpg",
  "/photos/photo60.jpg",
  "/photos/photo61.jpg",
  "/photos/photo62.jpg",
  "/photos/photo63.jpg",
  "/photos/photo64.jpg",
  "/photos/photo65.jpg",
  "/photos/photo66.jpg",
  "/photos/photo67.jpg",
  "/photos/photo68.jpg",
  "/photos/photo69.jpg",
  "/photos/photo70.jpg",
  "/photos/photo71.jpg",
  "/photos/photo72.jpg",
  "/photos/photo73.jpg",
  "/photos/photo74.jpg",
  "/photos/photo75.jpg",
  "/photos/photo76.jpg",
  "/photos/photo77.jpg",
  "/photos/photo78.jpg",
  "/photos/photo79.jpg",
  "/photos/photo80.jpg",
  "/photos/photo81.jpg",
  "/photos/photo82.jpg",
  "/photos/photo83.jpg",
  "/photos/photo84.jpg",
  "/photos/photo85.jpg",
  "/photos/photo86.jpg",
  "/photos/photo87.jpg",
  "/photos/photo88.jpg",
  "/photos/photo89.jpg",
  "/photos/photo90.jpg",
  "/photos/photo91.jpg",
  "/photos/photo92.jpg",
  "/photos/photo93.jpg",
  "/photos/photo94.jpg",
  "/photos/photo95.jpg",
  "/photos/photo96.jpg",
  "/photos/photo97.jpg",
  "/photos/photo98.jpg",
  "/photos/photo99.jpg",
  "/photos/photo100.jpg"
];

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getTargetDate(): Date {
  const now = new Date();
  const year = now.getFullYear();
  let target = new Date(year, 3, 21, 23, 0, 0, 0);

  if (now > target) {
    target = new Date(year + 1, 3, 21, 23, 0, 0, 0);
  }

  return target;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const diff = target.getTime() - Date.now();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      completed: true
    };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    completed: false
  };
}

type StripProps = {
  images: string[];
  className: string;
  direction: "left" | "right";
  onOpen: (src: string) => void;
};

function AutoScrollableStrip({
  images,
  className,
  direction,
  onOpen
}: StripProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pauseUntilRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;

    let frameId = 0;
    let lastTime = 0;

    const speed = direction === "left" ? 0.1 : -0.1;

    const step = (time: number) => {
      if (!container) return;

      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (Date.now() > pauseUntilRef.current) {
        container.scrollLeft += speed * delta;

        const half = container.scrollWidth / 2;
        if (direction === "left" && container.scrollLeft >= half) {
          container.scrollLeft -= half;
        }
        if (direction === "right" && container.scrollLeft <= 0) {
          container.scrollLeft += half;
        }
      }

      frameId = requestAnimationFrame(step);
    };

    if (direction === "right") {
      container.scrollLeft = container.scrollWidth / 2;
    }

    frameId = requestAnimationFrame(step);

    const pauseAuto = () => {
      pauseUntilRef.current = Date.now() + 2500;
    };

    container.addEventListener("wheel", pauseAuto, { passive: true });
    container.addEventListener("touchstart", pauseAuto, { passive: true });
    container.addEventListener("touchmove", pauseAuto, { passive: true });
    container.addEventListener("mousedown", pauseAuto);

    return () => {
      cancelAnimationFrame(frameId);
      container.removeEventListener("wheel", pauseAuto);
      container.removeEventListener("touchstart", pauseAuto);
      container.removeEventListener("touchmove", pauseAuto);
      container.removeEventListener("mousedown", pauseAuto);
    };
  }, [direction, images.length]);

  const doubled = [...images, ...images];

  return (
    <div ref={containerRef} className={`strip-scroll ${className}`}>
      <div className="strip-track">
        {doubled.map((src, index) => (
          <button
            key={`${src}-${index}`}
            type="button"
            className="bg-img interactive-photo"
            onClick={() => onOpen(src)}
          >
            <Image
              src={src}
              alt={`FMAC memory ${index + 1}`}
              fill
              sizes="(max-width: 640px) 56vw, (max-width: 1024px) 30vw, 24vw"
              className="object-cover"
              priority={index < 4}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const target = useMemo(() => getTargetDate(), []);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false
  });

  const [topStripImages, setTopStripImages] = useState<string[]>([]);
  const [bottomStripImages, setBottomStripImages] = useState<string[]>([]);
  const [activePreview, setActivePreview] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setTime(calculateTimeLeft(target));

    if (galleryImages.length > 0) {
      const shuffledTop = shuffleArray(galleryImages);
      const shuffledBottom = shuffleArray(galleryImages);
      setTopStripImages(shuffledTop);
      setBottomStripImages(shuffledBottom);
    }

    const interval = setInterval(() => {
      setTime(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  useEffect(() => {
    if (!activePreview) return;
    const timer = setTimeout(() => {
      setActivePreview(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [activePreview]);

  return (
    <main className="page-shell">
      <div className="filmstrip-top" />
      <div className="filmstrip-bottom" />

      {topStripImages.length > 0 && (
        <div className="top-region">
          <AutoScrollableStrip
            images={topStripImages}
            className="strip-top"
            direction="left"
            onOpen={setActivePreview}
          />
        </div>
      )}

      {bottomStripImages.length > 0 && (
        <div className="bottom-region">
          <AutoScrollableStrip
            images={bottomStripImages}
            className="strip-bottom"
            direction="right"
            onOpen={setActivePreview}
          />
        </div>
      )}

      <section className="middle-band">
        <div className="middle-band-overlay" />

        <div className="hero-content">
          <Image
            src="/fmac-icon.png"
            alt="FMAC"
            width={500}
            height={500}
            className="hero-logo logo-glow"
            priority
          />

          {mounted ? (
            time.completed ? (
              <div className="showtime-text">It’s Showtime 🎬</div>
            ) : (
              <div className="countdown-wrap">
                <div className="time-block">
                  <div className="time-number">
                    {String(time.days).padStart(2, "0")}
                  </div>
                  <div className="time-label">DAYS</div>
                </div>

                <div className="time-block">
                  <div className="time-number">
                    {String(time.hours).padStart(2, "0")}
                  </div>
                  <div className="time-label">HOURS</div>
                </div>

                <div className="time-block">
                  <div className="time-number">
                    {String(time.minutes).padStart(2, "0")}
                  </div>
                  <div className="time-label">MINUTES</div>
                </div>

                <div className="time-block">
                  <div className="time-number">
                    {String(time.seconds).padStart(2, "0")}
                  </div>
                  <div className="time-label">SECONDS</div>
                </div>
              </div>
            )
          ) : (
            <div className="countdown-wrap countdown-hidden">
              <div className="time-block">
                <div className="time-number">00</div>
                <div className="time-label">DAYS</div>
              </div>
              <div className="time-block">
                <div className="time-number">00</div>
                <div className="time-label">HOURS</div>
              </div>
              <div className="time-block">
                <div className="time-number">00</div>
                <div className="time-label">MINUTES</div>
              </div>
              <div className="time-block">
                <div className="time-number">00</div>
                <div className="time-label">SECONDS</div>
              </div>
            </div>
          )}

          <p className="subtle-subtext">and its over.</p>
        </div>
      </section>

      {activePreview && (
        <div
          className="preview-overlay"
          onClick={() => setActivePreview(null)}
          role="button"
          tabIndex={0}
        >
          <div className="preview-card">
            <Image
              src={activePreview}
              alt="Selected FMAC photo"
              fill
              sizes="90vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}