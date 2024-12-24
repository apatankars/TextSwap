import { GiShoppingCart } from "react-icons/gi";
import { MdAttachMoney } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { FaGraduationCap } from "react-icons/fa";
import { Dispatch, SetStateAction } from "react";
import { User } from "../../Types/types";
import "../../Styles/Offers.css";

interface DashboardMenuProps {
  isBuyingMode: boolean;
  setIsBuyingMode: Dispatch<SetStateAction<boolean>>;
  isActiveMode: boolean;
  setIsActiveMode: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  buyingActiveCount: number;
  sellingActiveCount: number;
}

export function DashboardMenu(props: DashboardMenuProps) {
  return (
    <div className="dashboard-menu-container">
      <div className="offer-text">MY OFFERS</div>
      <div className="action-block-container">
        <div className="action-container-flex">
          <button
            className={`buying-button ${props.isBuyingMode ? "active" : ""}`}
            onClick={() => props.setIsBuyingMode(true)}
          >
            <span className="buying-text" style={{ fontSize: "20px" }}>
              BUYING
            </span>
            <div className="badge">{props.buyingActiveCount}</div>
            <GiShoppingCart style={{ width: "40px", height: "40px" }} />
          </button>
          <button
            className={`selling-button ${!props.isBuyingMode ? "active" : ""}`}
            onClick={() => props.setIsBuyingMode(false)}
          >
            <span className="selling-text" style={{ fontSize: "20px" }}>
              SELLING
            </span>
            <div className="sellBadge">{props.sellingActiveCount}</div>
            <MdAttachMoney style={{ width: "40px", height: "40px" }} />
          </button>
        </div>
        <div className="time-container">
          <button
            className={`time-block ${props.isActiveMode ? "active" : ""}`}
            onClick={() => props.setIsActiveMode(true)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaBookBookmark style={{ width: "30px", height: "30px" }} />
              <div className="time-text">ACTIVE</div>
            </div>
          </button>
          <button
            className={`time-block ${!props.isActiveMode ? "active" : ""}`}
            onClick={() => props.setIsActiveMode(false)}
          >
            <FaGraduationCap style={{ width: "30px", height: "30px" }} />
            <div className="time-text">HISTORY</div>
          </button>
        </div>
      </div>
    </div>
  );
}
