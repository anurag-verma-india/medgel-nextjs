// pages/products/products-at-medgel/ListItem.tsx
"use client";
import PopupContext from "@/contexts/PopupContext";
import { redirect, RedirectType } from "next/navigation";
import { useContext, useRef, useState } from "react";

// Simple right pointer bracket SVG component
const RightPointerBracketSvg = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type ListItemType = {
  ListTitle: string;
  NumberOfProducts: number;
  ListId: string;
};

const ListItem = ({ ListTitle, NumberOfProducts, ListId }: ListItemType) => {
  const { popupState, setPopupState } = useContext(PopupContext);

  const HandleListClick = (listId: string) => {
    if (popupState.tokenValid) {
      // TODO: This Page's API call must also check user's JWT token from cookies
      redirect(`/products/product-list/${listId}`, RedirectType.push);
    } else {
      setPopupState({ ...popupState, popupOpen: !popupState.popupOpen });
    }
  };

  const [isHovering, setIsHovering] = useState(false);
  const [centerPosition, setCenterPosition] = useState({ x: 0, y: 0 });
  const listItemRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (listItemRef.current) {
      const rect = listItemRef.current.getBoundingClientRect();
      setCenterPosition({
        x: rect.width / 2,
        y: rect.height / 2,
      });
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="m-3 bg-gray-100 text-orange-400 hover:text-white">
      <div
        ref={listItemRef}
        className="relative m-3 flex cursor-pointer flex-row overflow-hidden rounded-xl bg-white px-2 py-2 text-lg md:m-6 md:py-3 md:text-2xl"
        onClick={() => {
          HandleListClick(ListId);
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Circular animation overlay */}
        {isHovering && (
          <div
            className="absolute rounded-full bg-teal-600 opacity-0"
            style={{
              top: `${centerPosition.y}px`,
              left: `${centerPosition.x}px`,
              transform: "translate(-50%, -50%)",
              width: "300%",
              height: "300%",
              animation: "circle-expand 0.5s ease-out forwards",
            }}
          />
        )}

        {/* Content with elevated z-index */}
        <p className="relative z-10 w-full">{ListTitle}</p>
        <div className="relative z-10 flex min-w-fit flex-row items-center text-neutral-500">
          {!!NumberOfProducts && (
            <p className="min-w-fit text-sm md:text-base">
              {NumberOfProducts} Products
            </p>
          )}
          <div className="ml-1 md:ml-2">
            <RightPointerBracketSvg />
          </div>
        </div>

        {/* Animation keyframes */}
        <style jsx>{`
          @keyframes circle-expand {
            0% {
              transform: translate(-50%, -50%) scale(0);
              opacity: 0.8;
            }
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

// return (
//   <div
//     className="m-3 flex cursor-pointer flex-row rounded-xl bg-white px-2 py-2 text-lg text-orange-400 hover:bg-[#358893] hover:text-white md:m-6 md:py-3 md:text-2xl"
//     onClick={() => {
//       HandleListClick(ListId);
//     }}
//   >
//     <p className="w-full">
//       {ListTitle}
//       </p>
//     <div className="flex min-w-fit flex-row items-center text-neutral-500">
//       {!!NumberOfProducts && (
//         <p className="min-w-fit text-sm md:text-base">
//           {NumberOfProducts} Products
//         </p>
//       )}
//       <div className="ml-1 md:ml-2">
//         <RightPointerBracketSvg />
//       </div>
//     </div>
//   </div>
//   );
// };

export default ListItem;
