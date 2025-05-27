'use client'

export const useScrollToSection = () => {
  return (id: string) => {
    const container = document.getElementById("scroll-container")
    const sectionOrder = ["hero", "about", "experience", "achievements", "skills", "projects", "contact"];

    if (!container) {
      // console.warn("Scroll container not found");
      return;
    }

    const targetIndex = sectionOrder.indexOf(id);

    if (targetIndex === -1) {
      // console.warn("Section ID not found in sectionOrder");
      return;
    }

    const sectionHeight = window.innerHeight; // Ou container.clientHeight si besoin

    const targetScrollTop = sectionHeight * targetIndex;

    // console.log(`🌀 Scroll to section [${id}] at index ${targetIndex}, scrollTop: ${targetScrollTop}`);

    container.scrollTo({
      top: targetScrollTop,
      behavior: "smooth",
    });
  }
}