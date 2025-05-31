"use client";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <button onClick={handleGoBack}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 56.69 56.69"
        className="w-5 h-5 fill-black stroke-transparent hover:stroke-black stroke-[2] scale-x-[-1] transition-colors cursor-pointer"
      >
        <polygon points="17.21 1.37 12.51 6.01 34.84 28.35 12.51 50.61 17.21 55.32 44.19 28.35 17.21 1.37" />
      </svg>
    </button>
  );
};

export default BackButton;
