import { PiHandWavingDuotone } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { PiBookOpen } from "react-icons/pi";
import { HiOutlineArrowRight, HiOutlinePaperAirplane } from "react-icons/hi";
import Image from "next/image";
import touse from "../public/to-use.jpg";
import Navbar from "@/shared/navbar/page";
import Footer from "@/shared/footer";
import LatestArticles from "./components/LatestArticles";

const Landingpage = () => {
  return (
    <div>
      <Navbar />
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 max-w-[1600px] mx-auto px-8 md:px-14 lg:px-[140px] py-16 md:py-20 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="px-3 py-2 items-center flex gap-1.5 border max-w-[260px] rounded-[20px] text-[#fff] bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-medium">
            <span>Welcome to our community</span>
            <PiHandWavingDuotone className="shrink-0" size={20} />
          </div>
          <h1 className="text-[40px] md:text-[50px] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 bg-clip-text text-transparent leading-tight">
            Discover Stories That Inspire
          </h1>
        </div>
        <div className="max-w-[846px]">
          <p className="text-[18px] md:text-[22px] font-extralight text-gray-500 leading-relaxed">
            Join over 50,000 readers who get fresh perspectives on technology,
            design, lifestyle, and more. Stay informed, stay inspired.
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button className="px-8 py-4 text-[#fff] rounded-[15px] bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2 font-bold hover:opacity-95 transition-opacity">
            <CiMail size={20} /> Get Weekly Newsletter
          </button>
          <button className="px-8 py-4 text-blue-600 rounded-[15px] border-2 border-blue-600 flex items-center gap-2 font-bold hover:bg-blue-50 transition-colors">
            <PiBookOpen size={20} /> Start Reading
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 md:px-14 lg:px-[280px] py-12 md:py-14 max-w-[1600px] mx-auto flex flex-wrap justify-between gap-8">
        <div className="flex flex-col items-center">
          <span className="text-white text-[32px] md:text-[35px] font-bold">50K+</span>
          <span className="text-white/80 text-sm md:text-base">Readers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white text-[32px] md:text-[35px] font-bold">6+</span>
          <span className="text-white/80 text-sm md:text-base">Articles</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white text-[32px] md:text-[35px] font-bold">25+</span>
          <span className="text-white/80 text-sm md:text-base">Writers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-white text-[32px] md:text-[35px] font-bold">98%</span>
          <span className="text-white/80 text-sm md:text-base">Satisfaction</span>
        </div>
      </div>

      {/* Featured Article */}
      <section className="max-w-[1600px] mx-auto px-8 md:px-14 lg:px-[140px] py-16 md:py-20">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm">
          <div className="w-full lg:w-[50%] relative min-h-[300px">
            <Image
              alt="Featured article - The Future of Creative Work in the AI Era"
              src={touse}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="w-full lg:w-[50%] py-8 lg:py-12 px-6 lg:px-10 flex flex-col justify-center gap-4">
            <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
              <span>⭐</span> Featured Article
            </p>
            <h2 className="text-[26px] md:text-[30px] font-bold text-gray-900 leading-tight">
              The Future of Creative Work in the AI Era
            </h2>
            <p className="text-gray-600 text-[15px] md:text-[16px] leading-relaxed">
              Discover how artificial intelligence is transforming creative
              industries and what it means for designers, writers, and artists.
              Learn strategies to thrive in this new landscape.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                SJ
              </div>
              <div>
                <p className="font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Feb 3, 2026 • 10 min read</p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold mt-2 hover:gap-3 transition-all"
            >
              Read Full Article
              <HiOutlineArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Why Readers Love Us */}
      <section className="bg-gray-50/80 max-w-[1600px] mx-auto px-8 md:px-14 lg:px-[140px] py-16 md:py-20">
        <div className="flex flex-col gap-12 bg-accent/30">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-[28px] md:text-[32px] font-bold text-gray-900 mb-2">
              Why Readers Love Us
            </h2>
            <p className="text-gray-600 text-lg font-light">
              Quality content that makes a difference
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Expert Writers
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Content created by industry professionals and thought leaders
                who share their real-world insights.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Fresh Content Daily
              </h3>
              <p className="text-gray-600 leading-relaxed">
                New articles published every day covering the latest trends and
                timeless wisdom.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Driven
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Join discussions, share your thoughts, and connect with
                like-minded readers from around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LatestArticles />

      {/* Newsletter CTA - Never Miss a Story */}
      <section className="w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 py-16 md:py-20">
        <div className="max-w-[1600px] mx-auto px-8 md:px-14 lg:px-[140px]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-6 rounded-full border-2 border-white/90 flex items-center justify-center">
              <CiMail className="text-white" size={28} />
            </div>
            <h2 className="text-[26px] md:text-[32px] font-bold text-white mb-3 tracking-tight">
              Never Miss a Story
            </h2>
            <p className="text-white/95 text-base md:text-lg leading-relaxed mb-8">
              Subscribe to our newsletter and get the best articles delivered
              straight to your inbox every week.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-5 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/50"
              />
              <button
                type="button"
                className="px-6 py-4 rounded-xl bg-white/25 hover:bg-white/35 text-white font-semibold inline-flex items-center justify-center gap-2 transition-colors shrink-0"
              >
                <HiOutlinePaperAirplane size={20} />
                Subscribe
              </button>
            </div>
            <p className="text-white/80 text-sm mt-6">
              Join 50,000+ subscribers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landingpage;
