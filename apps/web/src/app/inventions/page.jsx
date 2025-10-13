"use client";

import { useState, useEffect } from "react";

export default function InventionsPage() {
  const [inventions, setInventions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventions = async () => {
      try {
        const response = await fetch("/api/inventions");
        if (response.ok) {
          const data = await response.json();
          setInventions(data);
        }
      } catch (error) {
        console.error("Error fetching inventions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventions();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="min-h-screen bg-black font-inter">
      {/* Subtle dot pattern background */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-12 py-20">
        {/* Header with back link */}
        <div className="mb-20">
          <a
            href="/"
            className="text-white/60 hover:text-white transition-all duration-300 text-xl font-medium tracking-wide"
          >
            ← Garrity McOsker
          </a>
        </div>

        {/* Content */}
        <div className="space-y-16">
          <div>
            <h1 className="text-white text-5xl md:text-6xl font-medium tracking-tight leading-tight mb-8">
              Inventions I'll Never Patent
            </h1>
            <p className="text-white/70 text-xl leading-relaxed font-light max-w-4xl">
              Ideas that solve problems we all have but probably shouldn't
              exist. Or maybe they should. Either way, they're here for anyone
              who wants to build them.
            </p>
          </div>

          {/* Inventions list */}
          <div className="space-y-16">
            {loading ? (
              <div className="text-center text-white/60 text-xl">
                Loading inventions...
              </div>
            ) : inventions.length > 0 ? (
              inventions.map((invention) => (
                <article
                  key={invention.id}
                  className="border-b border-white/10 pb-12 last:border-b-0"
                >
                  <header className="mb-6">
                    <h2 className="text-white text-3xl font-medium mb-3 tracking-wide">
                      {invention.title}
                    </h2>
                    <p className="text-white/40 text-sm font-medium tracking-wider uppercase">
                      {formatDate(invention.date_created)}
                    </p>
                  </header>
                  <p className="text-white/70 text-xl leading-relaxed font-light">
                    {invention.description}
                  </p>
                </article>
              ))
            ) : (
              <div className="text-center text-white/60 text-xl">
                No inventions yet
              </div>
            )}
          </div>

          <div className="pt-12 text-center">
            <p className="text-white/40 text-sm font-medium tracking-wider uppercase">
              All ideas released into the public domain. Build them if you want.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
