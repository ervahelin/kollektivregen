import Image from "next/image";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="navigation flex justify-between p-4 fixed bottom-4 w-full">
        <Link href="/">
            <Image src="/logo.svg" width={40} height={40} alt="logo" />
        </Link>
        <Link href="/form">
            <Image src="/plus.svg" alt="Plus" width={20} height={20} />
        </Link>
    </div>
    );
};

export default Navigation;
