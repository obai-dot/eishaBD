
import { useState } from "react";
import HeartCatcher from "./games/HeartCatcher";
import MemoryMatch from "./games/MemoryMatch";
import GiftReveal from "./components/GiftReveal";
import "./styles/global.css";

function App() {
  const [screen, setScreen] = useState("welcome");

  if (screen === "game1") {
    return <HeartCatcher onContinue={() => setScreen("game2")} />;
  }

  if (screen === "game2") {
    return <MemoryMatch onWin={() => setScreen("gift")} />;
  }

  if (screen === "gift") {
    return <GiftReveal />;
  }

  return (
    <main className="birthday-page">
      <div className="petals" aria-hidden="true">
        🌸 ✿ 🌷 ✿ 🌸
      </div>

      <div className="birthday-card">
        <span className="eyebrow">A LITTLE SOMETHING JUST FOR YOU</span>

        <h1>
          Happy Birthday,
          <br />
          <span>Eisha</span> ♡
        </h1>

        <p>
          A little birthday magic, made just for you.
          <br />
          Two little challenges. One special surprise.
        </p>

        <button onClick={() => setScreen("game1")}>
          Start Your Adventure <span>♡</span>
        </button>

        <div className="card-footer">MADE WITH LOVE ✧</div>
      </div>

      <div className="floating-heart heart-one" aria-hidden="true">♡</div>
      <div className="floating-heart heart-two" aria-hidden="true">♥</div>
      <div className="floating-heart heart-three" aria-hidden="true">✧</div>
    </main>
  );
}

export default App;
