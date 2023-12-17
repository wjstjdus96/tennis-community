import { useRef, useState } from "react";

export const useDropDown = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    setIsExpanded((prev) => !prev);
  };

  const clickOutside = () => {
    setIsExpanded(false);
  };

  return { isExpanded, setIsExpanded, toggleDropdown, clickOutside };
};
