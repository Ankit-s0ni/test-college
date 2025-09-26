import React from 'react';
import Image from 'next/image';

const GallerySection = ({ images }: { images: string[] }) => {
  if (!images || images.length === 0) return null;

  return (
    <section id="gallery" className="space-y-4 p-6 rounded-lg">
      <h2 className="text-xl font-semibold">Campus Gallery</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <div key={i} className="relative h-36 w-full rounded overflow-hidden bg-gray-100">
            <Image src={src} alt={`gallery-${i}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
