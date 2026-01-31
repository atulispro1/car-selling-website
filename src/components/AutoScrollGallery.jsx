import "./../styles/autoScrollGallery.css";
/* 🔹 Import local images */
import gal1 from "../assets/gallery/gal1.jpg";
import gal2 from "../assets/gallery/gal2.jpg";
import gal3 from "../assets/gallery/gal3.jpg";
import gal4 from "../assets/gallery/gal4.jpg";
import gal5 from "../assets/gallery/gal5.jpg";
import gal6 from "../assets/gallery/gal6.jpg";
import gal7 from "../assets/gallery/gal7.jpg";
import gal8 from "../assets/gallery/gal8.jpg";
import gal9 from "../assets/gallery/gal9.jpg";
import gal10 from "../assets/gallery/gal10.jpg";

/* 🔁 Images array */
const images = [
  gal1,
  gal2,
  gal3,
  gal4,
  gal5,
  gal6,
  gal7,
  gal8,
  gal9,
  gal10,
];

export default function AutoScrollGallery() {
  return (
    <section className="auto-scroll-wrapper">
      <div className="auto-scroll-track">
        {/* duplicate for infinite loop */}
        {[...images, ...images].map((img, index) => (
          <div className="scroll-card" key={index}>
            <img src={img} alt={`gallery-${index}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
