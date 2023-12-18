import { useEffect, useRef, useState } from "react";

export const useDropDown = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedVisibility, setIsExpandedVisibility] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded((prev) => !prev);
  };

  const clickOutside = () => {
    setIsExpanded(false);
  };

  useEffect(() => {
    if (isExpanded) {
      setIsExpandedVisibility(true);
    } else {
      setTimeout(() => {
        setIsExpandedVisibility(false);
      }, 400);
    }
  }, [isExpanded]);

  return {
    isExpanded,
    isExpandedVisibility,
    setIsExpanded,
    toggleDropdown,
    clickOutside,
  };
};
