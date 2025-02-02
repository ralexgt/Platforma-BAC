export type LessonListProps = {
  lessons: Lesson[];
  title: string;
}

export type Lesson =  {
  Id: string,
  Title: string,
  Content: string,
  Subject: string,
}
