import Image from "next/image";
export default function Loading() {
  setTimeout(() => {}, 10000); // 10 seconds timeout
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        className="animate-pulse"
        src="/image.png"
        alt="Loading..."
        width={300}
        height={300}
      />
      <div>
        <p className="text-sm mt-5">Loading incidents...</p>
      </div>
    </div>
  );
}
