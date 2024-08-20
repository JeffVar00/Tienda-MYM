import React from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedCategories = ({ categories, title }) => {
  return (
    <div className="w-auto flex flex-col mt-10 mb-10 mx-4 md:mx-12 md:my-24 xl:mx-24 xl:my-20">
      {/* TITLE */}
      <div className="flex-1 flex flex-col items-start text-start px-1 justify-end z-10 uppercase">
        <h1 className="text-xl lg:text-2xl font-bold">{title}</h1>
      </div>
      <div className="overflow-x-scroll text-webprimary flex flex-col mb-8">
        {/* WRAPPER */}
        <div className="w-max flex animate-scroll-indicator mt-4">
          {/* SINGLE ITEM */}
          {categories.map((item) => (
            <div
              key={item.id}
              className="w-[80vw] mx-1 text-webprimary flex flex-col justify-around transition-all duration-300 md:w-[42vw] xl:w-[29vw]"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative w-full h-[100vw] md:h-[50vw] xl:h-[35vw] mb-2">
                {item.imgs && item.imgs.length > 0 ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.imgs[0]}
                      alt={item.title}
                      fill="responsive"
                      sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-webprimary via-transparent to-transparent h-3/4 flex flex-col p-5">
                      <h1 className="text-white font-bold w-full text-xl md:text-2xl uppercase mt-auto">
                        {item.title}
                      </h1>
                      <button className="bg-websecundary text-webprimary md:w-36 rounded-full text-xs lg:text-sm py-3 px-6 lg:px-8 font-bold mt-2 uppercase">
                        <Link href={item.ref}>Shop Now</Link>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-noimagebackground flex items-center justify-center">
                    {/* Placeholder for no image */}
                    <span className="text-webprimary">No Image</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;