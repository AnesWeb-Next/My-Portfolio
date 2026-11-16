import { useMemo, useRef, useState } from "react";
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Globe,
  Palette,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import { categories, projects } from "../../data/projects";
import FadeIn from "../animations/FadeIn";
import ProjectCard from "../ui/ProjectCard";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);

  const filteredProjects = useMemo(
    () =>
      activeCategory === "All"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentIndex(0);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);

    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstCard = container.querySelector("article");
    const gap = 24;
    const cardWidth = firstCard
      ? firstCard.getBoundingClientRect().width + gap
      : container.clientWidth / 3;

    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    const maxIndex = Math.max(0, filteredProjects.length - 3);
    const newIndex = Math.min(currentIndex + 1, maxIndex);
    scrollToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    scrollToIndex(newIndex);
  };

  const categoryIcons = {
    All: Target,
    "Web Apps": Globe,
    "UI Components": Palette,
    "Full Stack": Zap,
  };

  return (
    <section id="projects" className="relative py-20 bg-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(141,255,105,0.12),transparent_55%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0}>
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 border border-primary/30 bg-primary/10 rounded-full mb-6">
              <Briefcase className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">My Work</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-normal text-white mb-4">
              Featured Projects
            </h2>

            <p className="max-w-2xl mx-auto text-white/70 text-base leading-relaxed">
              Showcasing my best work and achievements.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {categories.map((category) => {
              const Icon = categoryIcons[category];
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryChange(category)}
                  className={`group relative inline-flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300 ${
                    isActive
                      ? "border-primary/60 bg-primary/10 text-white shadow-[0_0_20px_rgba(141,255,105,0.15)]"
                      : "border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-white/20"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-full ${
                      isActive ? "bg-primary/5" : "bg-white/0"
                    }`}
                  />
                  <div className="relative flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{category}</span>
                  </div>
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="hide-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory pb-3 scroll-smooth"
            >
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="snap-start min-w-70 xl:min-w-90 flex-1"
                >
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>

            {filteredProjects.length > 3 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white/80 transition hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Previous projects"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  disabled={
                    currentIndex >= Math.max(0, filteredProjects.length - 3)
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-white/80 transition hover:border-primary/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Next projects"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {filteredProjects.length > 3 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({
                  length: Math.max(1, filteredProjects.length - 2),
                }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => scrollToIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? "w-6 bg-primary"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        <div className="mt-10 flex items-center justify-center text-white/50">
          <Sparkles className="w-4 h-4 text-primary mr-2" />
          <span>Building impactful digital experiences.</span>
        </div>
      </div>
    </section>
  );
};

export default Projects;
