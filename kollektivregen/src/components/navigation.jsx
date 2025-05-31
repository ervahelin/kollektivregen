import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="navigation flex justify-between p-4 fixed bottom-4 w-full">
        <Link href="/dashboard">
            <Image src="/logo.svg" width={60} height={40} alt="logo" className="hover:scale-110 active:scale-110 transition"/>
        </Link>
        <Link href="/form">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.69 56.69"
                className="w-6 h-6 fill-black stroke-transparent hover:stroke-black stroke-[2] transition-colors"
            >
                <polygon points="56.69 25.03 31.67 25.03 31.67 0 25.03 0 25.03 25.03 0 25.03 0 31.67 25.03 31.67 25.03 56.69 31.67 56.69 31.67 31.67 56.69 31.67 56.69 25.03" />
            </svg>
        </Link>

    </div>
    );
};

export default Navigation;
