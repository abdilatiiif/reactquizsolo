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
import FinishScreen from "./FinishScreen.jsx";

const initialState = {
  questions: data,
  status: "ready",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 10,
};

function reducerFn(state, action) {
  switch (action.type) {
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: initialState.questions.questions.length * 30,
      };
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
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...state, points: 0, answer: null, index: 0, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
  }
}

function App() {
  const [state, dispatch] = useReducer(reducerFn, initialState);

  const { questions, status, index, answer, points, secondsRemaining } = state;

  const numQuestions = questions.questions.length;

  const maxPossiblePoints = questions.questions.reduce((acc, i) => {
    return acc + i.points;
  }, 0);

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
              answer={answer}
            />
            <Question
              question={questions.questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            dispatch={dispatch}
          />
        )}
      </MainContent>
    </div>
  );
}

export default App;
