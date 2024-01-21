import Image from "next/image";
import Link from "next/link";

const header = () => {
    return (
        <nav className="py-4 px-8  border-b-2">
            <Link href="/" className="flex gap-3 items-center w-max">
                <Image
                    src="/logo.png"
                    height={50}
                    width={50}
                    alt="Logo"
                    className="dark:fill-slate-500"
                />
                <h2 className="font-bold text-2xl text-primary dark:text-white">
                    CipherNotes
                </h2>
            </Link>
        </nav>
    );
};

export default header;
