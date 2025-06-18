import { useState } from 'react';

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-6">
      <div className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all ${
              selectedImage === index ? 'border-indigo-500 scale-105' : 'border-transparent'
            }`}
          >
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
          </button>
        ))}
      </div>
      
      <div className="bg-gray-100 rounded-xl p-8 flex justify-center items-center flex-grow">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-96" />
      </div>
    </div>
  );
}