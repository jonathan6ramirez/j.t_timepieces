import Link from "next/link";

export default function Nav({ }) {
  return (
    <div lang="en" className="bg-slate-500 m-2 rounded rounded-md p-2 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <div className="text-xl font-bold cursor-pointer">Home</div>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/about">
              <div className="hover:text-gray-300 hover:scale-105 active:scale-90
                transition-transform cursor-pointer ease-linear">Contact</div>
            </Link>
          </li>
          <li>
            <Link href="/services">
              <div className="hover:text-gray-300 hover:scale-105 active:scale-90
                transition-transform cursor-pointer ease-linear">Services</div>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <div className="hover:text-gray-300 hover:scale-105 active:scale-90
                transition-transform cursor-pointer ease-linear">Contact</div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
