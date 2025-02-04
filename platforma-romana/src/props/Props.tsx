export type LessonListProps = {
  lessons: Lesson[];
  title: string;
}

export type TestListProps = {
  tests: Test[];
  title: string;
}

export type Lesson =  {
  Id: string,
  Title: string,
  Content: string,
  Subject: string,
}

export type QuickQuestion = {
	Id:        string,
	Lesson_id: string,
	Question:  string,
	Answer1:   string,
	Answer2:   string,
	Answer3:   string,
	Answer4:   string,
	Correct:   string,
}

export type QuickQuestionProps = {
  quizQuestions: QuickQuestion[];
}

export type Test = {
  Id: string,
  Title: string,
  Description: string,
}

export type Question = {
	Id:        number,
	Test_id: string,
	Question:  string,
	Answer1:   string,
	Answer2:   string,
	Answer3:   string,
	Answer4:   string,
	Correct:   string,
	Hint: string,
}
