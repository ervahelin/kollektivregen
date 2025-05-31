"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../../../components/navigation";
import { FadeLoader } from "react-spinners";

const SuccessPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      router.push("/dashboard");
    }, 2000);

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-10 h-[75vh] text-center gap-14 lg:text-base">
        <div className="mt-6">
            <FadeLoader color="#1C1B1B" />
          </div>
        <p>Danke für die Einsendung! <br/>Dein Bild wurde hochgeladen</p>
        
      </div>
      <Navigation />
    </div>
  );
};

export default SuccessPage;
