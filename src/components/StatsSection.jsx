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
      { threshold: 0.6 },
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
        <StatCard label="Sample Products" value={80} suffix="+" />
        <StatCard label="Care Categories" value={12} suffix="+" />
        <StatCard label="Cities Served" value={10} suffix="+" />
        <StatCard label="Happy Customers" value={1200} suffix="+" />
      </div>
    </section>
  );
}
