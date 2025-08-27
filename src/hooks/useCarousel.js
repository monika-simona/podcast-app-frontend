import { useState, useEffect } from "react";

export default function useCarousel(items, maxVisible = 10) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);

  // Dinamički broj vidljivih kartica prema širini ekrana
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      let count = 1;
      if (width >= 1600) count = 10;
      else if (width >= 1400) count = 8;
      else if (width >= 1200) count = 7;
      else if (width >= 992) count = 6;
      else if (width >= 768) count = 4;
      else if (width >= 576) count = 3;
      else count = 1;

      // Ograničenje na maxVisible
      setVisibleCount(Math.min(count, maxVisible));
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, [maxVisible]);

  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  const next = () => {
    if (startIndex + visibleCount < items.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0); // vraća na početak
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    } else {
      setStartIndex(Math.max(0, items.length - visibleCount)); // ide na kraj
    }
  };

  return { visibleItems, next, prev, visibleCount };
}
