import React, { useEffect, useMemo, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";

// Local images
import udemy from "../assets/logo-udemy.svg";
import ace from "../assets/ace-logo.png";


export default function Certifications({ items }) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  useInView(containerRef, { once: true, margin: "-20% 0px -20% 0px" });
  
  // Track title visibility (same as Projects)
  const isTitleInView = useInView(titleRef, { 
    once: false, 
    amount: 0.2 
  });

  const certifications = useMemo(
    () =>
      items ?? [
        {
          title: "Learn React by Building the Simplest App  from the Scratch",
          org: "Udemy",
          year: "Issued Nov 2025",
          image: udemy,
          link: "https://www.udemy.com/certificate/UC-48a6f1d4-9869-47c1-bcad-f89f6c215f28/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com",
        },
         {
          title: "Multicloud Network Associate",
          org: "Aviatrix",
          year: "Issued Nov 2025",
          image: ace,
          link: "https://www.credly.com/badges/99c31c20-ea31-453e-8ffe-d0c6b2f0a01a",
        },
      ],
    [items]
  );

  // Scroll progress bar
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative min-h-screen bg-[#441B2F] text-white overflow-hidden py-24 px-4 sm:px-6"
    >
      {/* Background gradient lights */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-90"
        style={{
          background:
            "radial-gradient(1200px 600px at 15% 20%, rgba(186, 128, 156, 1), transparent 60%), radial-gradient(900px 500px at 85% 80%,  rgba(154, 126, 125, 1), transparent 60%)",
        }}
      />

      {/* Scroll progress indicator */}
      {/* <motion.div
        style={{ width: progressWidth, opacity: progressOpacity }}
        className="fixed left-0 top-0 h-[3px] z-50 bg-gradient-to-r from-sky-400 to-emerald-400 shadow-[0_0_20px_rgba(56,189,248,0.5)]"
      /> */}

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto flex flex-col gap-12">
        {/* Section Title with scroll animation (matching Projects) */}
        <div 
          ref={titleRef}
          className={`text-center transition-all duration-600 ease-out ${
            isTitleInView
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-6 scale-90'
          }`}
        >
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-[#9A7E7D] to-red-400 bg-clip-text text-transparent pb-3">
            Certifications
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-[#B49594] to-[#CE7571] mx-auto" />
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Verified credentials showcasing my skills and dedication.
          </p>
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {certifications.map((cert, idx) => (
            <CertCard cert={cert} idx={idx} key={cert.title} />
          ))}
        </div>

        
      </div>

      {/* Styles (no CSS transform on hover; glow + shine kept) */}
      <style>{`
        .card-glow {
          background: linear-gradient(#0b0b0b, #441B2F) padding-box,
                      linear-gradient(90deg,rgba(201, 177, 189, 1), rgba(154, 126, 125, 1)) border-box;
          border: 1.5px solid transparent;
          border-radius: 24px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.35);
          position: relative;
          isolation: isolate;
          overflow: hidden;
          transition:
            box-shadow .5s ease,
            border-color .45s ease,
            filter .5s ease;
        }
        .card-glow:before {
          content: "";
          position: absolute;
          inset: -1px;
          background:
            radial-gradient(800px 180px at var(--sx, 10%) -20%, rgba(154, 126, 125, 1), transparent 35%),
            radial-gradient(520px 140px at var(--sx, 90%) 120%, rgba(220, 138, 181, 1), transparent 35%);
          opacity: var(--so, 0);
          transition: opacity .35s ease;
          pointer-events: none;
        }
        .card-glow:after {
          content: "";
          position: absolute;
          inset: -8px;
          border-radius: 28px;
          background:
            radial-gradient(60% 60% at 50% 0%, rgba(199, 30, 24, 0.69), transparent 70%),
            radial-gradient(55% 55% at 80% 100%, rgba(195, 27, 114, 0.66), transparent 70%);
          filter: blur(28px);
          opacity: 0;
          transition: opacity .45s ease;
          pointer-events: none;
        }
        .card-glow:hover {
          box-shadow:
            0 20px 65px rgba(219, 66, 60, 0.68),
            0 12px 38px rgba(32, 2, 18, 0.48),
            0 5px 10px rgba(0,0,0,0.4);
          filter: brightness(1.08);
        }
        .card-glow:hover:before,
        .card-glow:hover:after {
          opacity: 1;
        }

        .img-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          transform: translateZ(0);
        }
        .shine-img {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,.28) 45%, transparent 60%);
          transform: translateX(-120%);
        }
        .img-wrap:hover .shine-img { animation: shine 1.05s ease forwards; opacity: 1; }
        @keyframes shine { to { transform: translateX(120%); } }

        .img-zoom { transition: transform .5s cubic-bezier(.22,1,.36,1); will-change: transform; }
        .card-glow:hover .img-zoom { transform: scale(1.06); }
      `}</style>
    </section>
  );
}

// Single Certification Card
function CertCard({ cert, idx }) {
  const cardRef = useRef(null);
  useInView(cardRef, { once: true, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      el.style.setProperty("--sx", `${x}%`);
      el.style.setProperty("--so", `1`);
    };
    const onLeave = () => el.style.setProperty("--so", `0`);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{
        duration: 0.85,
        delay: idx * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transformOrigin: "center", willChange: "transform" }}
      className="card-glow p-6 sm:p-8 backdrop-blur-md"
    >
      <div className="flex items-start gap-5">
        <div className="shrink-0">
          <div className="img-wrap h-20 w-20 sm:h-24 sm:w-24">
            <img
              src={cert.image}
              alt={`${cert.org} badge`}
              className="img-zoom h-full w-full object-contain"
              loading="lazy"
            />
            <span className="shine-img" />
          </div>
        </div>

        <div className="min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold leading-tight text-white/95">
            {cert.title}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{cert.org}</p>
          <p className="text-sm text-gray-500 mt-1">{cert.year}</p>
          {cert.credentialId && (
            <p className="text-xs text-gray-500 mt-1">
              Credential ID: <span className="text-gray-300">{cert.credentialId}</span>
            </p>
          )}

          <div className="mt-4">
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gradient relative overflow-hidden rounded-full px-5 py-2 text-sm font-semibold text-white border-2 border-transparent bg-clip-padding hover:scale-[1.03] transition-all duration-500 inline-flex items-center gap-2"
            >
              <span className="relative z-10">View credential</span>
              <ExternalLink size={16} className="opacity-80" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}