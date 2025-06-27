import { useReducer } from "react";
import data from "/data/questions.json";

import Header from "./Header.jsx";
import MainContent from "./MainContent.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";
import Footer from "./Footer.jsx";
import Timer from "./Timer.jsx";
import NextButton from "./NextButton.jsx";
import Progress from "./Progress.jsx";

const initialState = {
  questions: data,
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
};

function reducerFn(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, status: "active" };
    case "newAnswer": {
      const question = state.questions.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const { questions, status, index, answer, points } = state;

  const numQuestions = questions.questions.length;

  const maxPossiblePoints = questions.questions.reduce((acc, i) => {
    return acc + i.points;
  }, 0);

  console.log(maxPossiblePoints);

  return (
    <div className="app">
      <Header />
      <MainContent>
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              maxPossiblePoints={maxPossiblePoints}
              points={points}
            />
            <Question
              question={questions.questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
      </MainContent>
    </div>
  );
}

export default App;
