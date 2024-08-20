import React, { useState } from "react";
import "./test.css";
import { useNavigate } from "react-router-dom";

const MCQTest = ({ onSubmit }) => {
  const navigate = useNavigate();
  const questions = [
    {
      "question": "01. What is the largest ocean on Earth?",
      "options": ["A) Atlantic Ocean", "B) Indian Ocean", "C) Arctic Ocean", "D) Pacific Ocean"],
      "answer": "D"
    },
    {
      "question": "02. What is the smallest prime number?",
      "options": ["A) 0", "B) 1", "C) 2", "D) 3"],
      "answer": "C"
    },
    {
      "question": "03. Who was the first person to walk on the Moon?",
      "options": ["A) Yuri Gagarin", "B) Neil Armstrong", "C) Buzz Aldrin", "D) Michael Collins"],
      "answer": "B"
    },
    {
      "question": "04. What is the chemical formula for table salt?",
      "options": ["A) NaCl", "B) H2O", "C) CO2", "D) CH4"],
      "answer": "A"
    },
    {
      "question": "05. What is the main language spoken in Brazil?",
      "options": ["A) Spanish", "B) English", "C) Portuguese", "D) French"],
      "answer": "C"
    },
    {
      "question": "06. In which year did the Titanic sink?",
      "options": ["A) 1912", "B) 1915", "C) 1905", "D) 1920"],
      "answer": "A"
    },
    {
      "question": "07. What is the capital of Australia?",
      "options": ["A) Sydney", "B) Melbourne", "C) Brisbane", "D) Canberra"],
      "answer": "D"
    },
    {
      "question": "08. Which animal is known as the 'King of the Jungle'?",
      "options": ["A) Tiger", "B) Lion", "C) Elephant", "D) Leopard"],
      "answer": "B"
    },
    {
      "question": "09. What is the largest planet in our solar system?",
      "options": ["A) Earth", "B) Saturn", "C) Jupiter", "D) Neptune"],
      "answer": "C"
    },
    {
      "question": "10. What type of animal is a Komodo dragon?",
      "options": ["A) Mammal", "B) Bird", "C) Reptile", "D) Amphibian"],
      "answer": "C"
    }    
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
   const [score, setScore] = useState(null);

  const handleOptionChange = (event) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {

    if (onSubmit) {
      onSubmit();
    }

    const newScore = selectedAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].answer ? acc + 1 : acc;
    }, 0);
    setScore(newScore);
    navigate("/submit", {state: {score: newScore} });
  };

  return (
    <div className="mcq-container">
      {score === null ? (
        <>
          <div className="mcq-question-section">
            <h2 className="mcq-question">{questions[currentQuestionIndex].question}</h2>
            <ul className="mcq-options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li key={index} className="mcq-option">
                  <label>
                    <input
                      type="radio"
                      name="answer"
                      value={String.fromCharCode(65 + index)}
                      checked={
                        selectedAnswers[currentQuestionIndex] ===
                        String.fromCharCode(65 + index)
                      }
                      onChange={handleOptionChange}
                    />
                    <span>{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="mcq-navigation">
            <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </button>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </>
      ) : (
        <h2 className="mcq-score">
          Your score is: {score} out of {questions.length}
        </h2>
      )}
    </div>
  );
};

export default MCQTest;
