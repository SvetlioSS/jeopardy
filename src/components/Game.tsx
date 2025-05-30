import { useState } from "react";
import cn from "clsx";

const StartGame = () => {
  const [hasValidSession, setHasValidSession] = useState(false);
  const [name, setName] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [answerValid, setAnswerValid] = useState<boolean | null>(null);
  const [points, setPoints] = useState<number>(0);
  const [categories, setCategories] = useState<any>();
  const [question, setQuestion] = useState<any>();

  const start = () => {
    fetch("/api/get-categories")
      .then((res) => res.json())
      .then((json) => {
        const categories: any = {};
        json.forEach((category: any) => {
          categories[category] = {
            $100: true,
            $200: true,
            $300: true,
            $400: true,
            $500: true,
          };
        });
        setCategories(categories);
        console.log(categories);
      });
  };

  const handleClick = (category: string, value: string) => {
    // Prevent update if already played
    if (!categories[category][value]) {
      return;
    }

    setCategories((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [value]: false,
      },
    }));

    fetch(`/api/get-question?category=${category}&value=${value}`)
      .then((res) => res.json())
      .then((json) => {
        setQuestion(json);
      });
  };

  const validateAnswer = async () => {
    // const prompt = `
    //   You are a trivia judge for a Jeopardy! game. Given a trivia question and a player's answer, decide if the player's answer is factually correct and matches what would be expected for that question. Return only "true" or "false".

    //   Question: ${question}
    //   Player Answer: ${answer}
    //   Is the answer correct?
    //   `;

    // const res = await fetch("/api/validate-answer", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ prompt }),
    // });

    // const data = await res.json();
    // console.log(data.response);
    const isValid = question.Answer === answer;
    if (isValid) {
      setPoints(
        points + parseInt(question.Value.substring(1, question.Value.length))
      );
    }
    setAnswerValid(isValid);
  };

  return (
    <main className="space-y-4 flex flex-col">
      <h1 className="text-5xl">Jeopardy</h1>

      {hasValidSession ? (
        <>
          <div>Player name: {name}</div>
          <div>Points: {points}</div>

          <div className="grid grid-cols-6 relative">
            {categories &&
              Object.keys(categories).map((category) => (
                <div key={category} className="border p-2">
                  <div className="font-bold mb-2">{category}</div>
                  {["$100", "$200", "$300", "$400", "$500"].map((value) => (
                    <div
                      key={category + value}
                      className={cn("p-2 my-1 rounded ", {
                        "bg-blue-600 hover:bg-blue-700 cursor-pointer ":
                          categories[category][value],
                      })}
                      onClick={() => handleClick(category, value)}
                      role="button"
                    >
                      {value}
                    </div>
                  ))}
                </div>
              ))}

            {question && (
              <div className="absolute z-10 bg-black w-full h-full items-center justify-center flex flex-col space-y-8">
                {answerValid === false && (
                  <>
                    <div className="text-red-500">wrong answer!</div>
                    <button
                      className="rounded-2xl bg-blue-800 px-4 py-2 cursor-pointer"
                      onClick={() => {
                        setAnswerValid(null);
                        setQuestion(undefined);
                        setAnswer("");
                      }}
                    >
                      Next
                    </button>
                  </>
                )}
                {answerValid === true && (
                  <>
                    <div className="text-green-500">correct answer!</div>
                    <button
                      className="rounded-2xl bg-blue-800 px-4 py-2 cursor-pointer"
                      onClick={() => {
                        setAnswerValid(null);
                        setQuestion(undefined);
                        setAnswer("");
                      }}
                    >
                      Next
                    </button>
                  </>
                )}
                {answerValid === null && (
                  <>
                    <div className="text-xl">{question.Question}</div>

                    <form className="flex flex-col space-y-4">
                      <div className="flex gap-1 items-center">
                        <label htmlFor="answer">Answer</label>
                        <input
                          id="answer"
                          name="answer"
                          type="text"
                          className="bg-white rounded-2xl pl-4 text-black h-8"
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}
                        />
                      </div>

                      <button
                        className="rounded-2xl bg-blue-800 px-4 py-2 cursor-pointer"
                        type="button"
                        onClick={() => {
                          validateAnswer();
                        }}
                      >
                        Submit
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <form className="flex flex-col space-y-4">
          <div className="flex gap-1 flex-col">
            <label htmlFor="player-name">Name</label>
            <input
              id="player-name"
              name="player-name"
              type="text"
              placeholder="John Doe"
              className="bg-white rounded-2xl pl-4 text-black h-8"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
            />
          </div>

          <button
            className="self-end rounded-2xl bg-blue-800 px-4 py-2 cursor-pointer"
            type="button"
            onClick={() => {
              if (name) {
                setHasValidSession(true);
                start();
              }
            }}
          >
            Start game
          </button>
        </form>
      )}
    </main>
  );
};

export default StartGame;
