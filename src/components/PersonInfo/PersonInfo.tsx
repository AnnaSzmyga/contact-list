import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { PersonInfoType } from "../../types";
import { getAvatarInitials } from "../../utils/getAvatarInitials";
import "./PersonInfo.css";

type Props = {
  item: PersonInfoType;
  isSelected: boolean;
  onItemClick: (selectedItem: PersonInfoType) => void;
  isSmall?: boolean;
};

export const PersonInfo = React.memo(
  ({ item, isSelected, onItemClick, isSmall = false }: Props) => {
    const { id, firstNameLastName, jobTitle, emailAddress } = item;
    console.log("render: ", id);
    return (
      <li
        className={clsx("person-info", {
          "selected-item": isSelected,
          "small-item": isSmall,
        })}
        onClick={() => onItemClick(item)}
      >
        <div>
          <div className="person-info-content">
            <div className="avatar">{getAvatarInitials(firstNameLastName)}</div>
            <div>
              <p className="first-name-last-name">{firstNameLastName}</p>
              <p className="job-title">{jobTitle.toUpperCase()}</p>
            </div>
          </div>
          {isSelected && (
            <div className="check-icon">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          )}
        </div>
        <p className="email">{emailAddress}</p>
      </li>
    );
  }
);
