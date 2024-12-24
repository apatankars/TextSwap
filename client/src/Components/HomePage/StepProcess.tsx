import { Typography } from "@mui/material";
import "../../Styles/StepProcess.css";
import camera from "../../Icons/HomePage/camera.svg";
import { FaAngleDoubleDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { TbMessages } from "react-icons/tb";
import { FaHandHoldingMedical } from "react-icons/fa6";

export function StepProcess() {
  return (
    <div className="steps-container">
      <h2 className="steps-title">Easy as 1–2–3</h2>
      <p className="steps-subtitle">
        Buy and sell textbooks in just a few easy steps!
      </p>

      <div className="step-item">
        <div className="step-content">
          <div style={{ display: "flex" }}>
            <div className="box">
              <div className="ellipse">
                <img src={camera} alt="camera" className="camera-icon" />
              </div>
            </div>
            <div className="step-text-container">
              <Typography
                sx={{
                  fontSize: "22px",
                  fontFamily: "DM Sans",
                  color: "#1e0e62",
                  width: "100%",
                }}
              >
                Post Your Listing
              </Typography>
              <Typography>
                <p className="step-description">
                  List your textbooks for sale in just a few clicks. Add details
                  like the title, condition, and price.{" "}
                </p>
              </Typography>
            </div>
          </div>
          <div className="step-number">1</div>
        </div>
      </div>

      <div className="step-arrow">
        <FaAngleDoubleDown></FaAngleDoubleDown>
      </div>

      <div className="step-item">
        <div className="step-content">
          <div style={{ display: "flex" }}>
            <div className="box">
              <div className="ellipse">
                <FiSearch style={{ fontSize: "40px", color: "#000" }}>
                  {" "}
                </FiSearch>
              </div>
            </div>
            <div className="step-text-container">
              <Typography
                sx={{
                  fontSize: "22px",
                  fontFamily: "DM Sans",
                  color: "#1e0e62",
                  width: "100%",
                }}
              >
                Find Your Book
              </Typography>
              <Typography>
                <p className="step-description">
                  Browse through the catalog to find the books you need. Filter
                  by subject, condition, or price.{" "}
                </p>
              </Typography>
            </div>
          </div>
          <div className="step-number">2</div>
        </div>
      </div>

      <div className="step-arrow">
        <FaAngleDoubleDown></FaAngleDoubleDown>
      </div>

      <div className="step-item">
        <div className="step-content">
          <div style={{ display: "flex" }}>
            <div className="box">
              <div className="ellipse">
                <TbMessages style={{ fontSize: "40px", color: "#000" }} />
              </div>
            </div>
            <div className="step-text-container">
              <Typography
                sx={{
                  fontSize: "22px",
                  fontFamily: "DM Sans",
                  color: "#1e0e62",
                  width: "100%",
                }}
              >
                Connect with Buyers/Sellers
              </Typography>
              <Typography>
                <p className="step-description">
                  Message other students to arrange a safe and convenient
                  exchange location.{" "}
                </p>
              </Typography>
            </div>
          </div>
          <div className="step-number">3</div>
        </div>
      </div>

      <div className="step-arrow">
        <FaAngleDoubleDown></FaAngleDoubleDown>
      </div>

      <div className="step-item">
        <div className="step-content">
          <div style={{ display: "flex" }}>
            <div className="box">
              <div className="ellipse">
                <FaHandHoldingMedical
                  style={{ fontSize: "40px", color: "#000" }}
                />
              </div>
            </div>
            <div className="step-text-container">
              <Typography
                sx={{
                  fontSize: "22px",
                  fontFamily: "DM Sans",
                  color: "#1e0e62",
                  width: "100%",
                }}
              >
                Find Your Book
              </Typography>
              <Typography>
                <p className="step-description">
                  Meet up, exchange the book, and you’re all set! Earn cash or
                  save money on your next textbook.{" "}
                </p>
              </Typography>
            </div>
          </div>
          <div className="step-number">4</div>
        </div>
      </div>
    </div>
  );
}
