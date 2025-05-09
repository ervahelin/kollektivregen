import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="flex flex-col justify-between h-screen relative z-10">
          <div></div>
          <div className="bottom-0 w-full px-4 py-4 mb-20">
            <Link
              href="/dashboard"
              className=" w-full bg-white text-center rounded-full h-[40px] flex items-center justify-center">
              Wahrnehmung regenerieren
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
