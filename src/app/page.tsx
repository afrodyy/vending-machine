"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  type Item = {
    id: number;
    name: string;
    price: number;
    stock: number;
    image: string;
  };

  type CartItem = {
    id: number;
    name: string;
    price: number;
    qty: number;
    subtotal: number;
  };

  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "Biskuit",
      price: 6000,
      stock: 10,
      image: "/roma-sari-gandum.png",
    },
    {
      id: 2,
      name: "Chips",
      price: 8000,
      stock: 10,
      image: "/lays-biru.png",
    },
    {
      id: 3,
      name: "Oreo",
      price: 10000,
      stock: 10,
      image: "/oreo.png",
    },
    {
      id: 4,
      name: "Tango",
      price: 12000,
      stock: 1,
      image: "/tango.png",
    },
    {
      id: 5,
      name: "Cokelat",
      price: 15000,
      stock: 0,
      image: "/cadbury.png",
    },
  ]);
  const denominations = [
    {
      id: 1,
      value: 2000,
    },
    {
      id: 2,
      value: 5000,
    },
    {
      id: 3,
      value: 10000,
    },
    {
      id: 4,
      value: 20000,
    },
    {
      id: 5,
      value: 50000,
    },
  ];
  const [showDemonimation, setShowDenomination] = useState(false);
  const [insertedMoney, setInsertedMoney] = useState(0);
  const [cart, setCart] = useState<{
    items: CartItem[];
    grandtotal: number;
    change: number;
  }>({
    items: [],
    grandtotal: 0,
    change: 0,
  });
  const [processing, setProcessing] = useState(false);

  function addToCart(selectedItem: Item) {
    const estimatedGrandTotal = selectedItem.price + cart.grandtotal;

    if (estimatedGrandTotal <= insertedMoney) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === selectedItem.id
            ? { ...item, stock: Math.max(0, item.stock - 1) }
            : item
        )
      );

      setCart((prevCart) => {
        const existingItem = prevCart.items.find(
          (item) => item.id === selectedItem.id
        );

        let updatedItems;

        if (existingItem) {
          updatedItems = prevCart.items.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  qty: item.qty + 1,
                  subtotal: item.subtotal + selectedItem.price,
                }
              : item
          );
        } else {
          const newItem: CartItem = {
            id: selectedItem.id,
            name: selectedItem.name,
            price: selectedItem.price,
            qty: 1,
            subtotal: selectedItem.price,
          };
          updatedItems = [...prevCart.items, newItem];
        }

        const updatedGrandTotal = prevCart.grandtotal + selectedItem.price;
        const updatedChange = insertedMoney - updatedGrandTotal;

        return {
          items: updatedItems,
          grandtotal: updatedGrandTotal,
          change: updatedChange,
        };
      });
    } else {
      return alert(
        "Total belanja lebih besar dari uang yang dimasukkan. Silahkan masukkan kembali uang ke mesin."
      );
    }
  }

  function countMoney(value: number) {
    setInsertedMoney((prev) => prev + value);
    setShowDenomination(false);
  }

  function discharge() {
    setProcessing(false);
    setInsertedMoney(0);
    setCart({
      items: [],
      grandtotal: 0,
      change: 0,
    });
    return alert(
      "Terimakasih telah bertransaksi di Vending Machine JSM Market GO! "
    );
  }

  useEffect(() => {
    setCart((prevCart) => ({
      ...prevCart,
      change: insertedMoney - prevCart.grandtotal,
    }));
  }, [insertedMoney]);

  return (
    <div className="grid grid-cols-[20px_1fr_20px] items-end justify-items-center min-h-screen p-8 pt-10 pb-0 gap-16 font-[family-name:var(--font-geist-sans)] bg-gradient-to-r from-yellow-100 to-yellow-300 overflow-hidden">
      <main className="col-start-2 grid grid-cols-12 gap-4 bg-amber-400 min-h-full w-5xl p-4 pb-0 rounded-t-xl">
        {/* Menu */}
        <div className="col-span-8 grid grid-rows-12 gap-4 rounded-t-xl">
          <div className="row-span-10 flex flex-col w-full">
            {/* Header */}
            <div className="flex w-full p-10 bg-gradient-to-r from-gray-50 to-gray-300 items-center justify-center">
              <h1
                className="text-5xl font-bold tracking-wide text-white"
                style={{
                  textShadow: `
            0 0 1px #00a6f4, 
            0 0 2px #00a6f4, 
            0 0 3px #00a6f4, 
            0 0 4px #00a6f4,
            0 0 5px #00a6f4
          `,
                }}
              >
                JSM Market GO!
              </h1>
            </div>

            <div className="flex flex-col gap-6 p-4 bg-gray-100">
              <div className="flex w-full border-2 border-sky-600 rounded-full p-4 items-center justify-center">
                <span className="font-semibold text-sky-600">
                  Hanya menerima pembayaran tunai
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full">
                {items.map((item, index) => (
                  <button
                    onClick={() => addToCart(item)}
                    type="button"
                    key={`menu-${index + 1}`}
                    className="flex flex-col items-center justify-between h-full min-h-44 p-2 not-disabled:hover:bg-emerald-50 disabled:hover:bg-red-50 border-2 border-sky-600 rounded-xl cursor-pointer disabled:cursor-not-allowed ease-in-out duration-150"
                    disabled={
                      item.stock < 1 ||
                      insertedMoney < item.price ||
                      cart.grandtotal + item.price > insertedMoney
                    }
                  >
                    <div className="flex items-center justify-center flex-grow">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="w-28"
                        priority
                      />
                    </div>
                    <p className="w-full text-sm text-black text-center mt-2">
                      {item.stock > 0
                        ? `Rp. ${item.price.toLocaleString()}`
                        : "Stok habis"}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={discharge}
            type="button"
            className="row-span-2 w-fit h-fit justify-self-center text-center p-4 rounded border-2 border-gray-800 cursor-pointer disabled:cursor-not-allowed"
            disabled={!processing}
          >
            <span className="font-medium text-xl text-gray-800">
              DORONG UNTUK
              <br />
              AMBIL MENU & KEMBALIAN DISINI
            </span>
          </button>
        </div>

        {/* Bayar */}
        <div className="col-span-4 flex flex-col p-4 gap-4">
          <div className="flex flex-col gap-4 p-4 items-center bg-gray-50 rounded-2xl border-2 border-gray-800">
            <h4 className="font-semibold text-sky-600 text-xl">
              Vending Machine
            </h4>

            <span className="font-medium text-sm text-sky-600">
              Mesin ini dapat menerima pecahan:
              <ol className="list-decimal list-inside">
                <li>Rp. 2,000</li>
                <li>Rp. 5,000</li>
                <li>Rp. 10,000</li>
                <li>Rp. 10,000</li>
                <li>Rp. 20,000</li>
                <li>Rp. 50,000</li>
              </ol>
            </span>
          </div>

          <div className="bg-gray-800 py-2 px-4 w-40 self-center text-end rounded">
            <span className="font-bold text-2xl text-red-500">
              {insertedMoney}
            </span>
          </div>

          <div className="flex flex-col gap-4 p-4 items-center bg-gray-50 rounded-2xl border-2 border-gray-800">
            <div className="flex flex-row gap-2 items-center">
              <h4 className="font-semibold text-sky-600 text-xl">
                Masukkan Uang Disini
              </h4>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="size-6 text-sky-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>

            <div className="relative flex w-full">
              <button
                onClick={() => {
                  setShowDenomination(!showDemonimation);
                }}
                type="button"
                className="flex flex-row w-full rounded-lg bg-gray-50 hover:bg-gray-100 border border-sky-600 justify-between items-center py-1 px-3 ease-in-out duration-150"
              >
                <span className="w-full text-gray-800 text-sm text-start">
                  Ceritanya ini tempat buat masukkin uang
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-sky-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {showDemonimation && (
                <div className="absolute top-13 transition-all transition-discrete flex flex-col w-full p-2 bg-gray-50 border border-sky-600 rounded-lg">
                  {denominations.map((denomination, index) => (
                    <button
                      key={index + 1}
                      onClick={() => {
                        countMoney(denomination.value);
                      }}
                      type="button"
                      className="flex p-2 hover:bg-gray-200 ease-in-out duration-150 rounded-lg"
                    >
                      <span className="font-medium text-start text-sm text-gray-800">
                        Pecahan Rp. {denomination.value.toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {!processing && cart.items.length > 0 && (
            <div className="flex flex-col w-full gap-1 p-4 items-start bg-gray-50 rounded-2xl border-2 border-gray-800">
              <h4 className="font-semibold text-sky-600 text-xl">Keranjang</h4>
              <ul className="w-full list-inside text-sm text-gray-800">
                {cart.items.length > 0 &&
                  cart.items.map((item, index) => (
                    <li
                      key={index + 1}
                      className="flex flex-row w-full items-center justify-between"
                    >
                      <span>{item.name}</span>
                      <span>
                        {item.qty} x @Rp. {item.subtotal.toLocaleString()}
                      </span>
                    </li>
                  ))}
              </ul>
              <hr className="w-full text-gray-800 border-t border-gray-800" />

              <ul className="w-full list-inside text-sm text-gray-800">
                <li className="flex flex-row items-center justify-between">
                  <span>Grand Total</span>
                  <span>Rp. {cart.grandtotal.toLocaleString()}</span>
                </li>
                <li className="flex flex-row items-center justify-between">
                  <span>Bayar</span>
                  <span>Rp. {insertedMoney.toLocaleString()}</span>
                </li>
                <li className="flex flex-row items-center justify-between">
                  <span>Kembalian</span>
                  <span>Rp. {cart.change.toLocaleString()}</span>
                </li>
              </ul>

              <button
                onClick={() => {
                  setProcessing(true);
                  return alert(
                    "Silahkan ambil belanjaan anda dan kembalian di bawah."
                  );
                }}
                type="button"
                className="self-end mt-3 bg-amber-600 hover:bg-amber-700 py-1 px-3 rounded-lg font-medium ease-in-out duration-150 cursor-pointer"
              >
                Proses
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
