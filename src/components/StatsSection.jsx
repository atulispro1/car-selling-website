import { useEffect, useRef, useState } from "react";
import "./../styles/statsSection.css";

function StatCard({ label, value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const end = value;
          const duration = 900;
          const stepTime = Math.max(10, Math.floor(duration / end));

          const counter = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(counter);
          }, stepTime);
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className="stat-card" ref={ref}>
      <h3>
        {count}
        {suffix}
      </h3>
      <p>{label}</p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <StatCard label="Cars Listed" value={100} suffix="+" />
        <StatCard label="Verified Sellers" value={500} suffix="+" />
        <StatCard label="Cities Covered" value={10} suffix="+" />
        <StatCard label="Happy Buyers" value={1500} suffix="+" />
      </div>
    </section>
  );
}
