import { useState } from "react";
import { Shuffle, Heart, Sparkles } from "lucide-react";
import "./MemoryMatch.css";

const SYMBOLS = ["💗", "🌸", "🎀", "✨"];

function createDeck() {
  return [...SYMBOLS, ...SYMBOLS]
    .map((symbol, index) => ({
      id: index,
      symbol,
    }))
    .sort(() => Math.random() - 0.5);
}

function MemoryMatch({ onWin }) {
  const [cards, setCards] = useState(createDeck);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(12);
  const [locked, setLocked] = useState(false);
  const [lost, setLost] = useState(false);

  const won = matched.length === cards.length;

  function restart() {
    setCards(createDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(12);
    setLocked(false);
    setLost(false);
  }

  function flipCard(card) {
    if (
      locked ||
      lost ||
      won ||
      flipped.includes(card.id) ||
      matched.includes(card.id)
    ) {
      return;
    }

    if (flipped.length === 0) {
      setFlipped([card.id]);
      return;
    }

    const firstCard = cards.find((item) => item.id === flipped[0]);
    const isMatch = firstCard.symbol === card.symbol;
    const remainingMoves = moves - 1;

    setFlipped([flipped[0], card.id]);
    setMoves(remainingMoves);
    setLocked(true);

    setTimeout(() => {
      if (isMatch) {
        setMatched((previous) => {
          const next = [...previous, flipped[0], card.id];

          if (next.length === cards.length) {
            setTimeout(onWin, 800);
          }

          return next;
        });
      }

      setFlipped([]);

      if (!isMatch && remainingMoves <= 0) {
        setLost(true);
      }

      setLocked(false);
    }, 650);
  }

  return (
    <main className="memory-page">
      <div className="memory-glow memory-glow-one" />
      <div className="memory-glow memory-glow-two" />

      <section className="memory-card">
        <div className="memory-eyebrow">
          <Sparkles size={13} /> YOUR SECOND CHALLENGE
        </div>

        <h1>
          Find Your <span>Match</span>
        </h1>

        <p className="memory-description">
          Find all four matching pairs, Eisha.
          <br />
          Every little heart hides a surprise. ♡
        </p>

        <div className="memory-stats">
          <div>
            <span>PAIRS FOUND</span>
            <strong>{matched.length / 2} / 4</strong>
          </div>

          <div>
            <span>MOVES LEFT</span>
            <strong>{moves}</strong>
          </div>
        </div>

        {won ? (
          <div className="memory-result">
            <div className="memory-result-icon">💐</div>
            <h2>You did it, Eisha!</h2>
            <p>You found every match. Your birthday surprise awaits!</p>
            <button className="memory-button" onClick={onWin}>
              Reveal My Gift <Heart size={17} fill="currentColor" />
            </button>
          </div>
        ) : lost ? (
          <div className="memory-result">
            <div className="memory-result-icon">🥹</div>
            <h2>One more try?</h2>
            <p>
              The hearts were being sneaky! You deserve another chance,
              birthday girl. 💗
            </p>
            <button className="memory-button" onClick={restart}>
              Try Again <Shuffle size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="memory-grid">
              {cards.map((card) => {
                const isVisible =
                  flipped.includes(card.id) || matched.includes(card.id);

                return (
                  <button
                    key={card.id}
                    className={`memory-tile ${
                      isVisible ? "is-flipped" : ""
                    } ${matched.includes(card.id) ? "is-matched" : ""}`}
                    onClick={() => flipCard(card)}
                    aria-label={
                      isVisible ? card.symbol : "Reveal hidden card"
                    }
                    aria-pressed={isVisible}
                    disabled={locked || matched.includes(card.id)}
                  >
                    <span className="tile-back">♡</span>
                    <span className="tile-front">{card.symbol}</span>
                  </button>
                );
              })}
            </div>

            <div className="memory-progress">
              <div
                style={{
                  width: `${(matched.length / cards.length) * 100}%`,
                }}
              />
            </div>

            <button className="memory-reset" onClick={restart}>
              <Shuffle size={14} /> Start Over
            </button>
          </>
        )}

        <div className="memory-footer">
          MADE WITH LOVE <Heart size={11} fill="currentColor" />
        </div>
      </section>
    </main>
  );
}

export default MemoryMatch;