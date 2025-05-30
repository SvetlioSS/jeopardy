import { useState } from "react";

const StartGame = () => {
  const [hasValidSession, setHasValidSession] = useState(false);
  const [name, setName] = useState<string>("");

  const start = () => {
    fetch("/api/get-question")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  };

  return (
    <main className="space-y-4 flex flex-col">
      <h1 className="text-5xl">Jeopardy</h1>

      {hasValidSession ? (
        <div>Player name: {name}</div>
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
