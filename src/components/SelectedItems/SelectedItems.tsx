import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { PersonInfo } from "../PersonInfo";
import { PersonInfoType } from "../../types";
import useIsMobile from "../../hooks/useIsMobile";
import "./SelectedItems.css";

interface SelectedItemsProps {
  items: PersonInfoType[];
  onItemClick: (selectedItem: PersonInfoType) => void;
}

export const SelectedItems: React.FC<SelectedItemsProps> = ({
  items,
  onItemClick,
}) => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(!isMobile);

  const toggleVisibility = () => {
    isMobile && setIsVisible((prev) => !prev);
  };

  const isOpenIconVisible = isMobile && !isVisible;

  return (
    <>
      {isOpenIconVisible && (
        <div className="open-icon-wrapper" onClick={toggleVisibility}>
          <FontAwesomeIcon icon={faList} className="open-icon" />
          <div className="items-number">{items.length}</div>
        </div>
      )}
      {isMobile && isVisible && <div className="overlay"></div>}
      {(isVisible || !isMobile) && (
        <div className="selected-items-wrapper">
          <div className="selected-items-heading">
            <h2>Selected Items: {items.length}</h2>
            {isMobile && (
              <span className="close-icon" onClick={toggleVisibility}>
                &times;
              </span>
            )}
          </div>
          <ul>
            {items.map((item) => (
              <PersonInfo
                key={item.id}
                item={item}
                onItemClick={onItemClick}
                isSelected
                isSmall
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
