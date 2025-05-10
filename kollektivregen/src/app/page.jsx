"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 3 Sekunden
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);
    }, interval);

    const redirectTimeout = setTimeout(() => {
      clearInterval(timer);
      router.push("/dashboard");
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="flex flex-col justify-end h-full relative z-10 bg-black/40">
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/30">
          <div
            className="h-full bg-white transition-all duration-50"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white text-center py-6 text-lg">
          Wahrnehmung wird regeneriert...
        </p>
      </div>
    </div>
  );
}
