import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-[20px_1fr_20px] items-end justify-items-center min-h-screen p-8 pt-10 pb-0 gap-16 font-[family-name:var(--font-geist-sans)] bg-cyan-950">
      <main className="col-start-2 bg-teal-800 min-h-full w-5xl rounded-t-xl p-2 pb-0 flex">
        <div className="bg-teal-600 grid grid-cols-12 border border-teal-700 border-b-0 rounded-t-xl min-h-full w-full p-4 pb-0 gap-4">
          <div className="bg-cyan-950 col-span-8 grid grid-rows-5 rounded-t-xl p-4 gap-4">
            <div className="flex flex-row gap-4 w-full bg-yellow-500 items-center justify-center py-2">
              <div className="flex flex-col gap-2">
                <Image
                  src="/lays-biru.png"
                  alt="wew"
                  width={100}
                  height={100}
                />
                <div className="flex flex-col items-center">
                  <p className="text-sm">Rp. 10.000</p>
                  <button
                    type="button"
                    className="bg-red-500 p-1 rounded-full size-4"
                  ></button>
                </div>
              </div>
              <Image src="/lays-biru.png" alt="wew" width={100} height={100} />
              <Image src="/lays-biru.png" alt="wew" width={100} height={100} />
              <Image src="/lays-biru.png" alt="wew" width={100} height={100} />
              <Image src="/lays-biru.png" alt="wew" width={100} height={100} />
            </div>
            {/* <div className="w-full bg-red-500">makanan</div>
            <div className="w-full bg-red-500">makanan</div>
            <div className="w-full bg-red-500">makanan</div>
            <div className="w-full bg-red-500">makanan</div> */}
          </div>
          <div className="bg-blue-500 col-span-4 p-4">bayar</div>
        </div>
      </main>
    </div>
  );
}
