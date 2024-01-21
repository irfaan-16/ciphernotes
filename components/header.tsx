import Image from "next/image";
import Link from "next/link";

const header = () => {
    return (
        <nav className="py-4 px-8  border-b-2">
            <Link href="/" className="flex gap-3 items-center w-max">
                <Image src="/logo.png" height={30} width={30} alt="Logo" />
                <h2 className="font-bold text-2xl text-primary">CipherNotes</h2>
            </Link>
        </nav>
    );
};

export default header;
