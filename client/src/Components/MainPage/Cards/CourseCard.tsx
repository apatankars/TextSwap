import { Chip } from "@mui/material";
import { course } from "../../../Types/types";
import "../../../Styles/Landing/CourseCard.css";

interface CourseCardProps {
  course: course;
}

export function CourseCardButton(props: CourseCardProps) {
  return (
    <button className="course-card-button">
      <div className="course-card-container">
        <div className="department-chip-container">
          <Chip
            className="course-chip"
            label={props.course.courseName.slice(0, 5)}
          ></Chip>
        </div>
        <div className="course-info-container">
          <span className="course-code">{props.course.courseID}</span>
          <span className="course-name">{props.course.courseName}</span>
        </div>
      </div>
    </button>
  );
}
