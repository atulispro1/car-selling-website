import "./../styles/autoScrollGallery.css";

const images = [
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=700&q=80",
  "https://plus.unsplash.com/premium_photo-1661630971367-15853002aee8?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFjZSUyMGNhcmUlMjBpdGVtc3xlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=700&q=80",
];

export default function AutoScrollGallery() {
  return (
    <section className="auto-scroll-wrapper">
      <div className="auto-scroll-track">
        {[...images, ...images].map((img, index) => (
          <div className="scroll-card" key={index}>
            <img src={img} alt={`product-gallery-${index}`} />
          </div>
        ))}
      </div>
    </section>
  );
}
