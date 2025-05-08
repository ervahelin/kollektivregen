"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../../../components/navigation";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 2000);

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <p>Alltagsimpression erfolgreich hochgeladen</p>
      </div>
      <Navigation />
    </div>
  );
};

export default SuccessPage;
