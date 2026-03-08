import Link from "next/link";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1600px] mx-auto px-8 md:px-14 lg:px-[140px] py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                <MdOutlineLibraryBooks size={28} color="#fff" />
              </div>
              <div>
                <h2 className="text-white text-xl font-semibold">The Modern Blog</h2>
                <p className="text-gray-400 text-sm font-light">Your daily inspiration</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Join over 50,000 readers. Fresh perspectives on technology, design,
              lifestyle, and more.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10 md:gap-16">
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Explore
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Latest Articles
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Company
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Newsletter
              </h3>
              <p className="text-gray-400 text-sm mb-3 max-w-[200px]">
                Get the best articles delivered to your inbox.
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors"
              >
                <CiMail size={18} /> Subscribe
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-700/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} The Modern Blog. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Made with care for readers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
