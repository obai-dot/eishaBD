import { useEffect, useState } from "react";
import "./HeartCatcher.css";

const TARGET = 8;
const DURATION = 15;

function randomPosition() {
  return {
    left: `${8 + Math.random() * 76}%`,
    top: `${8 + Math.random() * 72}%`,
  };
}

function HeartCatcher({ onContinue }) {
  const [started, setStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [position, setPosition] = useState(randomPosition());

  useEffect(() => {
    if (!started || score >= TARGET || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((time) => Math.max(0, time - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [started, score, timeLeft]);

  const won = score >= TARGET;
  const lost = timeLeft <= 0 && !won;

  function catchHeart() {
    if (!started || won || lost) return;

    setScore((current) => Math.min(TARGET, current + 1));
    setPosition(randomPosition());
  }

  function restart() {
    setScore(0);
    setTimeLeft(DURATION);
    setPosition(randomPosition());
    setStarted(true);
  }

  return (
    <section className="game-page">
      <div className="game-topline">EISHA'S BIRTHDAY ADVENTURE</div>

      <div className="game-card">
        <span className="game-eyebrow">CHALLENGE ONE</span>
        <h1>
          Heart <span>Catcher</span> ♡
        </h1>

        {!started ? (
          <div className="game-intro">
            <div className="big-heart">💗</div>
            <p>
              Catch {TARGET} hearts in {DURATION} seconds!
              <br />
              Ready, birthday girl?
            </p>
            <button
              className="pink-button"
              onClick={() => setStarted(true)}
            >
              Let's Play ♡
            </button>
          </div>
        ) : won || lost ? (
          <div className="game-result">
            <div className="big-heart">{won ? "🎉" : "🥹"}</div>
            <h2>{won ? "You did it, Eisha!" : "Almost, birthday girl!"}</h2>
            <p>
              {won
                ? "You caught every heart! You're amazing. 💗"
                : `You caught ${score} out of ${TARGET} hearts. That's okay, you get to continue!`}
            </p>

            <button className="pink-button" onClick={onContinue}>
              Continue to Game Two →
            </button>

            {lost && (
              <button className="text-button" onClick={restart}>
                Try this game again
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="game-stats">
              <div>
                <span>HEARTS</span>
                <strong>{score}/{TARGET}</strong>
              </div>
              <div>
                <span>TIME LEFT</span>
                <strong>00:{String(timeLeft).padStart(2, "0")}</strong>
              </div>
            </div>

            <div className="heart-arena">
              <p className="arena-hint">Tap the heart before time runs out!</p>
              <button
                className="catch-heart"
                style={position}
                onClick={catchHeart}
                aria-label="Catch this heart"
              >
                💗
              </button>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${(score / TARGET) * 100}%` }}
              />
            </div>
          </>
        )}
      </div>

      <p className="game-footer">A LITTLE GAME, MADE WITH LOVE ♡</p>
    </section>
  );
}

export default HeartCatcher;