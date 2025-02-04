import { Link } from "react-router-dom";
import {Test, TestListProps} from "../props/Props.tsx";
import { useState } from "react";

const LessonList: React.FC<TestListProps> = ({tests, title}) => {  
  const [toggleTests, setToggleTests] = useState(true);

  return (
    <div className="lesson-list">
      <h2 className="section-title"> {title} </h2>
      <button className="lessons-toggle-btn"
        onClick={() => {
        toggleTests ? setToggleTests(false) : setToggleTests(true);
      }}>
        v
      </button>
    
      { !toggleTests && tests.map((test: Test) => (
          <div className="lesson-preview" key={test.Id}>
            <Link to={`/test/${test.Id}`} >
              <h2> { test.Title } </h2>
            </Link>
          </div>     

      ))}
    </div>
  );
}

export default LessonList;
