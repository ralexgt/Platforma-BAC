import { Link } from "react-router-dom";
import {Lesson, LessonListProps} from "../props/Props.tsx";
import { useState } from "react";

const LessonList: React.FC<LessonListProps> = ({lessons, title}) => {  
  const [toggleLessons, setToggleLessons] = useState(true);

  return (
    <div className="lesson-list">
      <h2 className="section-title"> {title} </h2>
      <button className="lessons-toggle-btn"
        onClick={() => {
        toggleLessons ? setToggleLessons(false) : setToggleLessons(true);
      }}>
        v
      </button>
    
      { !toggleLessons && lessons.map((lesson: Lesson) => (
          <div className="lesson-preview" key={lesson.Id}>
            <Link to={`/lessons/${lesson.Id}`} >
              <h2> { lesson.Title } </h2>
            </Link>
          </div>     

      ))}
    </div>
  );
}

export default LessonList;
