import React from "react";
import Image from "next/image";
import Link from "next/link";

const PageIcon = ({ logo }) => {
  return (
    <Link href="/" className="flex items-center justify-center">
      <div className="relative w-10 h-10 lg:w-12 lg:h-12">
        <Image
          src={`/icons/${logo}.avif`}
          alt="Page icon"
          fill="responsive"
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-contain"
        />
      </div>
    </Link>
  );
};

export default PageIcon;
