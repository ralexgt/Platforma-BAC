import { useEffect, useState } from "react";
import LessonList from "../components/LessonList.tsx";
import { Lesson } from "../props/Props.tsx";
import { fetchAllLessons } from "../functions/useApi.tsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    async function getLessons() {
      const lessons_: Lesson[] = await fetchAllLessons();
      if (lessons_ === null) {
        return;
      }
      setLessons(lessons_);
    }
    if (lessons.length === 0) {
      getLessons();
    }
  }, [lessons, navigate]);
 
  return (
    <div className="home">
      { (lessons.length > 0) && <LessonList lessons={lessons} title="Toate lecțiile" /> }
      { (lessons.length > 0) && <LessonList lessons={lessons.filter((lesson: Lesson) => lesson.Subject === "Subiect 1")} title="BAC Subiect 1 - Lecții" /> }
      { (lessons.length > 0) && <LessonList lessons={lessons.filter((lesson: Lesson) => lesson.Subject === "Subiect 2")} title="BAC Subiect 2 - Lecții" /> }
      { (lessons.length > 0) && <LessonList lessons={lessons.filter((lesson: Lesson) => lesson.Subject === "Subiect 3")} title="BAC Subiect 3 - Lecții" /> }
    </div>
  );
}

export default Home;
