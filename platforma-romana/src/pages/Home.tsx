import { useEffect, useState } from "react";
import LessonList from "../components/LessonList.tsx";
import TestList from "../components/TestList.tsx";
import { Lesson, Test } from "../props/Props.tsx";
import { fetchAllLessons, fetchAllTests } from "../functions/useApi.tsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [tests, setAllTests] = useState<Test[]>([]);

  useEffect(() => {
    async function getLessons() {
      const lessons_: Lesson[] = await fetchAllLessons();
      if (lessons_ === null || lessons_ === undefined) {
        return;
      }
      setLessons(lessons_);
    }
    if (lessons.length === 0) {
      getLessons();
    }
    
    async function fetchTests() {
     const tests_ = await fetchAllTests();
    if (tests_ === null || tests_ === undefined) {
      return;
      }
     setAllTests(tests_);
    }
    if(tests.length === 0) {
      fetchTests(); 
    }

  }, [lessons, tests, navigate]);
 
  return (
    <div className="home">
      <div className="lectii">
      { (lessons.length > 0) && <LessonList lessons={lessons} title="Toate lecțiile" /> }
      { (lessons.length > 0) && <LessonList lessons={lessons.filter((lesson: Lesson) => lesson.Subject === "Subiect 1")} title="BAC Subiect 1 - Lecții" /> }
      { (lessons.length > 0) && <LessonList lessons={lessons.filter((lesson: Lesson) => lesson.Subject === "Subiect 2")} title="BAC Subiect 2 - Lecții" /> }
      { (lessons.length > 0) && <LessonList lessons={lessons.filter((lesson: Lesson) => lesson.Subject === "Subiect 3")} title="BAC Subiect 3 - Lecții" /> }
      { (tests.length > 0) && <TestList tests={tests} title="Teste de evaluare" /> }
      </div>
    </div>
  );
}

export default Home;
