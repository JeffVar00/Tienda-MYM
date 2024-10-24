"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";
import { currentCart } from "@wix/ecom";

const BagMenu = ({ toggleMenu }) => {
  const wixClient = useWixClient();
  const { cart, counter, isLoading, removeItem } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/exito`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center lg:gap-4">
      {/* Header Section */}
      <div className="bg-websecundary border-b-2 border-webprimary w-full fixed px-6 flex flex-row justify-between gap-6 py-4 z-50 items-center">
        <div className="flex font-bold text-xl"></div>
        <div className="flex font-bold uppercase text-webprimary">
          Tu Carrito
        </div>
        <div className="flex justify-end">
          <button onClick={toggleMenu} className="text-gray-700">
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
      {/* Bag Items and Checkout Section */}
      {!cart.lineItems || cart.lineItems.length === 0 ? (
        <div className="flex flex-col items-center h-full justify-center gap-3 mb-20">
          <h2 className="font-bold uppercase">Tu carrito está vacío</h2>
          <p className="text-gray-700 text-sm">
            No tienes productos en tu carrito
          </p>
          <Link href="/colecciones?cat=all-products">
            <button
              onClick={toggleMenu}
              className="text-sm mt-2 w-60 font-bold rounded-full flex items-center justify-center p-3 bg-webprimary text-white uppercase"
            >
              Explora nuestros productos
            </button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col h-full w-full">
          {/* Cart Items - scrollable */}
          <div className="flex-grow w-full px-4 flex flex-col gap-6 mt-20 overflow-y-auto">
            {cart.lineItems.map((item) => (
              <div
                key={item._id}
                className="items-center flex flex-row gap-4 pb-6 border-b-2 border-gray-200"
              >
                <div className="relative w-48 h-full">
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      120,
                      170,
                      {}
                    )}
                    alt={item.productName?.original}
                    fill="responsive"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 150px"
                    className="object-contain rounded-md"
                    priority={true}
                  />
                </div>
                <div className="text-sm flex-2 w-full text-start py-4">
                  <h2 className="text-xs md:text-sm">
                    {item.productName?.original}
                  </h2>
                  {item.descriptionLines &&
                    item.descriptionLines.map((line, index) => (
                      <p
                        key={index}
                        className="text-web-primary font-bold text-xs text-webprimary"
                      >
                        {line.name.translated}:{" "}
                        {line.colorInfo
                          ? line.colorInfo.translated
                          : line.plainText?.translated}
                      </p>
                    ))}
                  <p className="text-gray-500 text-xs">
                    {/* {item.availability?.status} */}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-start items-start sm:justify-between sm:items-center mt-5 gap-3 sm:gap-0">
                    <button
                      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id)}
                      className="text-black rounded-full bg-gray-200 hover:bg-websecundary hover:text-webprimary p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    <div className="font-bold flex flex-row items-center">
                      <div className="p-1 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-webprimary">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        {item.price?.formattedAmount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="bg-white w-full flex-shrink-0 flex flex-col items-center justify-center h-auto pb-12 md:pb-0">
            <div className="text-xs md:text-sm py-5 flex px-6 flex-col justify-center w-full gap-3 text-gray-700 border-b-2">
              <div className="flex justify-between">
                {counter > 1 ? (
                  <span>Sub. Total ({counter} productos)</span>
                ) : (
                  <span>Sub. Total ({counter} producto)</span>
                )}
                <span>{cart.subtotal.formattedAmount}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>El envío se calcula en el proceso de pago.</span>
              </div>
            </div>
            <button
              disabled={isLoading}
              onClick={handleCheckout}
              className="text-xs md:text-base mt-6 mb-12 w-full font-bold rounded-xl flex items-center justify-center p-3 bg-webprimary text-white"
            >
              Continuar a pagar.
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BagMenu;
