import { PropsWithChildren, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { H2 } from "./H2";

export interface AccordionProps extends PropsWithChildren {
  title: string;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? "0"
        : `${contentRef.current.scrollHeight}px`;
    }
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <H2
        className="mb-2 flex cursor-pointer items-center gap-4 text-orange-950"
        onClick={toggle}
      >
        {title}
        <FaArrowRight
          className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
        />
      </H2>
      <div
        ref={contentRef}
        style={{ maxHeight: 0 }}
        className="overflow-hidden transition-all duration-300 ease-in-out max-w-2xl"
      >
        {children}
      </div>
    </div>
  );
};
