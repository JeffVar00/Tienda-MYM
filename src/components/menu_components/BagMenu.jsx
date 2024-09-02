"use client";

import React, { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import CheckoutForm from "../form_components/CheckoutForm";

const BagMenu = ({ toggleMenu }) => {
  const [shippingMethod, setShippingMethod] = useState("Standard");
  const handleShippingChange = (event) => {
    setShippingMethod(event.target.value);
  };

  const [currentCart, setCurrentCart] = useState([
    {
      code: "12345",
      title: "Flare Orange/Sorbet Orange",
      imgs: [
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
      ],
      availableSizes: ["XS", "S", "M", "XL", "L", "XXL", "3XL"],
      isNew: true,
      desc: "Black/Asphalt Grey 1",

      selectedSize: "M",
      quantity: 1,
      price: 50,
    },
    {
      code: "12345",
      title: "Flare Orange/Sorbet Orange",
      imgs: [
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
      ],
      availableSizes: ["XS", "S", "M", "XL", "L", "XXL", "3XL"],
      isNew: true,
      desc: "Black/Asphalt Grey 2",

      selectedSize: "M",
      quantity: 1,
      price: 50,
    },
    {
      code: "12345",
      title: "Flare Orange/Sorbet Orange",
      imgs: [
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
      ],
      availableSizes: ["XS", "S", "M", "XL", "L", "XXL", "3XL"],
      isNew: true,
      desc: "Black/Asphalt Grey 3",

      selectedSize: "M",
      quantity: 1,
      price: 50,
    },
    {
      code: "12345",
      title: "Flare Orange/Sorbet Orange",
      imgs: [
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
      ],
      availableSizes: ["XS", "S", "M", "XL", "L", "XXL", "3XL"],
      isNew: true,
      desc: "Black/Asphalt Grey 3",

      selectedSize: "M",
      quantity: 1,
      price: 50,
    },
    {
      code: "12345",
      title: "Flare Orange/Sorbet Orange",
      imgs: [
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
        "/clothexample5.avif",
      ],
      availableSizes: ["XS", "S", "M", "XL", "L", "XXL", "3XL"],
      isNew: true,
      desc: "Black/Asphalt Grey 3",

      selectedSize: "M",
      quantity: 1,
      price: 50,
    },
  ]);

  const handleQuantityChange = (index, value) => {
    const newCart = currentCart.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: value };
      }
      return item;
    });
    setCurrentCart(newCart);
  };

  const handleRemove = (index) => {
    const updatedCart = currentCart.filter((_, i) => i !== index);
    setCurrentCart(updatedCart);
  };

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const toggleCheckout = () => setIsCheckoutOpen(!isCheckoutOpen);

  const [isPayed, setIsPayed] = useState(false);
  const togglePayed = () => {
    setIsPayed(!isPayed);
    setCurrentCart([]);
    setShippingMethod("Standard");
    toggleCheckout();
  };

  return (
    <div className={`w-full h-screen flex flex-col items-center lg:gap-4`}>
      <div className="bg-white w-full fixed px-6 flex flex-row justify-between gap-6 py-2 z-50 items-center">
        <div className="flex font-bold text-xl"></div>
        <div className="flex font-bold uppercase">Your Bag</div>
        <div className="flex justify-end ">
          <button onClick={toggleMenu} className="text-gray-700">
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
      {!isPayed ? (
        currentCart.length === 0 ? (
          <div className="flex flex-col items-center h-full justify-center gap-3 mb-20">
            <h2 className="font-bold uppercase">Your bag is empty</h2>
            <p className="text-gray-700 text-sm">
              There are no products in your bag
            </p>
            <Link href="/collections/women">
              <button
                onClick={toggleMenu}
                className="text-sm mt-2 w-60 font-bold rounded-full flex items-center justify-center p-3 bg-webprimary text-websecundary uppercase"
              >
                Shop Men
              </button>
            </Link>
            <Link href="/collections/men">
              <button
                onClick={toggleMenu}
                className="text-sm w-60  font-bold rounded-full flex items-center justify-center p-3 bg-webprimary text-websecundary uppercase"
              >
                Shop Women
              </button>
            </Link>
          </div>
        ) : (
          <div className="w-full px-4 flex flex-col gap-6 pb-36 mt-16 lg:pb-24 overflow-y-auto">
            {currentCart.map((item, index) => (
              <div
                key={index}
                className={`items-center flex flex-row gap-4 pb-6 border-b-2 border-gray-200`}
              >
                <div className="relative w-48 h-full">
                  <Image
                    src={item.imgs[0]}
                    alt={item.title}
                    fill="responsive"
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="text-sm flex-2 w-full text-start py-4">
                  <h2 className="">{item.title}</h2>
                  <p className=" text-gray-600">{item.desc}</p>
                  <p className="font-bold">US${item.price}</p>
                  {/* Quantity selector as dropdown */}
                  <div className="flex flex-col sm:flex-row justify-start items-start sm:justify-between sm:items-center mt-5 gap-3 sm:gap-0">
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-webprimary rounded-full bg-gray-200 hover:bg-gray-300 p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <div className="font-bold flex flex-row items-center">
                      <label
                        htmlFor={`quantity-${index}`}
                        className="text-gray-700"
                      >
                        Qty:
                      </label>
                      <select
                        id={`quantity-${index}`}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        className=" border-gray-300 rounded-md"
                      >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                          (num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="font-bold uppercase text-center">
              Shipping Method
            </div>
            <select
              className="w-full p-2 border border-gray-200 rounded"
              value={shippingMethod}
              onChange={handleShippingChange}
            >
              <option value="Standard">Standard Shipping</option>
              <option value="Express">Express Shipping</option>
              <option value="Overnight">Overnight Shipping</option>
            </select>

            <div className="flex flex-col w-full border-b-2  border-gray-200 text-base">
              <div className=" pb-5 flex flex-col gap-4 justify-center h-full w-full xl:gap-6 text-gray-700 ">
                <div className="flex justify-between">
                  <span className="">Sub Total (3 elements)</span>
                  <span className="">US$175</span>
                </div>
                <div className="flex justify-between">
                  <span className="">{shippingMethod} Shipping</span>
                  <span className="">Free</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="">Total</span>
                  <span className="">US$175</span>
                </div>
              </div>
            </div>
            <div
              className={`bg-white absolute bottom-0 left-0 w-full flex items-center justify-center`}
            >
              <button
                onClick={toggleCheckout}
                className="m-4 w-full font-bold rounded-xl flex items-center justify-center p-3 bg-webprimary text-websecundary"
              >
                Checkout
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center h-full justify-center gap-3 mb-20">
          <h2 className="font-bold uppercase">Thanks for your preference!</h2>
          <p className="text-gray-700 text-sm">Want to continue shopping?</p>
          <Link href="/collections?cat=women">
            <button
              onClick={toggleMenu}
              className="text-sm mt-2 w-60 font-bold rounded-full flex items-center justify-center p-3 bg-webprimary text-websecundary uppercase"
            >
              Shop Men
            </button>
          </Link>
          <Link href="/collections?cat=men">
            <button
              onClick={toggleMenu}
              className="text-sm w-60  font-bold rounded-full flex items-center justify-center p-3 bg-webprimary text-websecundary uppercase"
            >
              Shop Women
            </button>
          </Link>
        </div>
      )}

      {isCheckoutOpen && (
        <div
          className={`h-full fixed bottom-0 lg:bottom-auto lg:top-0 lg:right-0 w-full bg-white z-50 transform ${
            isCheckoutOpen
              ? "translate-y-0 lg:translate-x-0"
              : "translate-y-full lg:translate-x-full lg:translate-y-0"
          } transition-transform duration-300 ease-in-out `}
        >
          <div className="p-4">
            <div className="fixed bg-white w-full px-6 flex flex-row justify-between gap-6 py-2 z-50 items-center">
              <div className="flex font-bold text-xl"></div>
              <div className="flex font-bold uppercase">Contact Info</div>
              <div className="flex justify-end ">
                <button onClick={toggleCheckout} className="text-gray-700">
                  <XMarkIcon className="h-8 w-8" />
                </button>
              </div>
            </div>
            <CheckoutForm
              showPopup={togglePayed}
              shippingMethod={shippingMethod}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BagMenu;
