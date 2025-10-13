"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export default function HomePage() {
  const [showWritingCarousel, setShowWritingCarousel] = useState(false);
  const [currentWritingIndex, setCurrentWritingIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [writingPosts, setWritingPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, writingRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/writing"),
        ]);

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setProjects(projectsData);
        }

        if (writingRes.ok) {
          const writingData = await writingRes.json();
          setWritingPosts(writingData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleWritingClick = () => {
    setShowWritingCarousel(!showWritingCarousel);
    setCurrentWritingIndex(0);
  };

  const nextWriting = () => {
    setCurrentWritingIndex((prev) =>
      prev === writingPosts.length - 1 ? 0 : prev + 1,
    );
  };

  const prevWriting = () => {
    setCurrentWritingIndex((prev) =>
      prev === 0 ? writingPosts.length - 1 : prev - 1,
    );
  };

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
        {/* Header with name */}
        <div className="mb-20">
          <h1 className="text-white text-5xl md:text-6xl font-medium tracking-tight leading-tight">
            Garrity McOsker
          </h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-8">
          {/* Projects with dropdown */}
          <div className="group relative">
            <a
              href="#"
              className="inline-flex items-center text-white text-2xl hover:text-white/80 transition-all duration-300 font-medium tracking-wide"
            >
              Projects
              <ChevronDown className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:rotate-180 opacity-60" />
            </a>

            {/* Dropdown */}
            <div className="absolute left-0 top-full mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl min-w-[240px] z-20 backdrop-blur-xl">
              <div className="py-3">
                {loading ? (
                  <div className="px-5 py-3 text-white/50 text-lg">
                    Loading...
                  </div>
                ) : projects.length > 0 ? (
                  projects.map((project) => (
                    <a
                      key={project.id}
                      href={project.url || "#"}
                      className="block px-5 py-3 text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 text-lg font-medium"
                    >
                      {project.title}
                    </a>
                  ))
                ) : (
                  <div className="px-5 py-3 text-white/50 text-lg">
                    No projects yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Writing with carousel */}
          <div>
            <button
              onClick={handleWritingClick}
              className="text-white text-2xl hover:text-white/80 transition-all duration-300 font-medium tracking-wide"
            >
              Writing
            </button>

            {/* Carousel */}
            <div
              className={`overflow-hidden transition-all duration-700 ease-out ${showWritingCarousel ? "max-h-[500px] mt-8 mb-8" : "max-h-0"}`}
            >
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                {loading ? (
                  <div className="text-center text-white/60 text-lg">
                    Loading writing...
                  </div>
                ) : writingPosts.length > 0 ? (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={prevWriting}
                        className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                      >
                        <ChevronLeft className="w-6 h-6 text-white/60 group-hover:text-white" />
                      </button>

                      <div className="flex-1 text-center px-8">
                        <h3 className="text-white text-xl font-semibold mb-2 tracking-wide leading-relaxed">
                          {writingPosts[currentWritingIndex]?.title}
                        </h3>
                        <p className="text-white/50 text-sm font-medium tracking-wider uppercase">
                          {formatDate(
                            writingPosts[currentWritingIndex]?.date_published,
                          )}
                        </p>
                      </div>

                      <button
                        onClick={nextWriting}
                        className="p-3 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                      >
                        <ChevronRight className="w-6 h-6 text-white/60 group-hover:text-white" />
                      </button>
                    </div>

                    <div className="flex justify-center space-x-3">
                      {writingPosts.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentWritingIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentWritingIndex
                              ? "bg-white scale-110"
                              : "bg-white/20 hover:bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center text-white/60 text-lg">
                    No writing posts yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Current */}
          <div>
            <a
              href="/current"
              className="text-white text-2xl hover:text-white/80 transition-all duration-300 font-medium tracking-wide"
            >
              Current
            </a>
          </div>

          {/* Inventions */}
          <div>
            <a
              href="/inventions"
              className="text-white text-2xl hover:text-white/80 transition-all duration-300 font-medium tracking-wide"
            >
              Inventions I'll Never Patent
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
}
