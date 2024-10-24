"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixClient";
import { search_categories } from "@/data";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import Image from "next/image";

const MobileMenu = ({ toggleMenu, searchText, toggleSearch }) => {
  const [categories, setCategories] = useState([]);
  const wixClient = useWixClient();
  useEffect(() => {
    const getCategories = async () => {
      const res = await wixClient.collections
        .queryCollections()
        .hasSome("name", search_categories)
        .find();
      setCategories(res.items);
    };
    getCategories();
  }, [wixClient]);

  return (
    <div className="flex flex-col  h-full overflow-y-auto bg-white ">
      <div className="sticky top-0 z-20 bg-websecundary">
        {/* Add your menu content here */}
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-row justify-between p-4">
            <h2 className="text-lg font-bold uppercase text-webprimary">
              Tienda M&M CR
            </h2>
            <button onClick={toggleMenu} className="text-gray-700">
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <button
            className="flex items-center w-full p-4 bg-white border-2 border-webprimary rounded-md text-start"
            onClick={toggleSearch}
          >
            <MagnifyingGlassIcon className="block h-6 w-6 text-webprimary" />
            <span className="ml-3 text-sm bg-transparent outline-none text-webprimary w-full">
              {searchText ? searchText : "Buscar productos"}
            </span>
          </button>
        </div>
      </div>

      <div className="px-4 scrollbar-hide flex flex-col gap-6 justify-evenly bg-white pb-4 pt-6">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/colecciones?cat=${category.slug}`}
            onClick={toggleMenu}
            className="group relative block w-full h-36 overflow-hidden rounded-lg border-2 border-webprimary"
          >
            <div
              className={`absolute inset-0 bg-cover bg-center filter blur-0 group-hover:blur-0 transition duration-300 ease-in-out `}
            >
              {category.media?.mainMedia?.image?.url ? (
                <Image
                  src={category.media?.mainMedia?.image?.url}
                  alt={category.name}
                  fill="responsive"
                  sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-full bg-noimagebackground flex items-center justify-center">
                  {/* Placeholder for no image */}
                  <span className="text-webprimary">No Image</span>
                </div>
              )}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition duration-300 ease-in-out"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {category.name === "All Products"
                  ? "Todos los productos"
                  : category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;
