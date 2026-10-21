
import { useState } from "react";
import { Gift, Heart, Sparkles, Star } from "lucide-react";
import "./GiftReveal.css";

function GiftReveal() {
  const [opened, setOpened] = useState(false);

  return (
    <main className={`gift-page ${opened ? "gift-opened" : ""}`}>
      <div className="gift-orb gift-orb-one" />
      <div className="gift-orb gift-orb-two" />

      <div className="gift-petals" aria-hidden="true">
        {Array.from({ length: 14 }, (_, index) => (
          <span
            key={index}
            style={{
              left: `${(index * 37 + 8) % 100}%`,
              animationDelay: `${(index % 7) * -1.7}s`,
              animationDuration: `${8 + (index % 5) * 2}s`,
            }}
          >
            {index % 3 === 0 ? "✿" : "♡"}
          </span>
        ))}
      </div>

      <section className="gift-content">
        <div className="gift-heading">
          <span className="gift-eyebrow">
            <Sparkles size={14} />
            YOUR BIRTHDAY SURPRISE
            <Sparkles size={14} />
          </span>

          <h1>
            Something Special,
            <br />
            <span>Just for You</span>
          </h1>

          <p className="gift-subtitle">
            Because someone as special as you deserves a little extra magic.
          </p>
        </div>

        {!opened ? (
          <div className="gift-box-section">
            <div className="gift-box-glow" />

            <button
              className="gift-box-button"
              onClick={() => setOpened(true)}
              aria-label="Open your birthday gift"
            >
              <div className="gift-box">
                <div className="gift-box-lid">
                  <div className="gift-bow">
                    <span />
                    <span />
                    <i />
                  </div>
                </div>
                <div className="gift-box-body">
                  <div className="gift-ribbon-vertical" />
                  <div className="gift-ribbon-horizontal" />
                  <Heart
                    className="gift-box-heart"
                    size={25}
                    fill="currentColor"
                  />
                </div>
              </div>
            </button>

            <p className="gift-tap-hint">
              A little surprise is waiting for you
            </p>

            <button
              className="gift-primary-button"
              onClick={() => setOpened(true)}
            >
              Open Your Gift
              <Gift size={18} />
            </button>
          </div>
        ) : (
          <div className="voucher-reveal">
            <div className="voucher-sparkle sparkle-one">
              <Sparkles size={24} />
            </div>
            <div className="voucher-sparkle sparkle-two">
              <Star size={19} />
            </div>
            <div className="voucher-sparkle sparkle-three">
              <Heart size={21} fill="currentColor" />
            </div>

            <article className="voucher-card">
              <div className="voucher-top">
                <div className="voucher-brand">
                  <Heart size={17} fill="currentColor" />
                  <span>A LITTLE SOMETHING FOR YOU</span>
                </div>

                <span className="voucher-edition">
                  BIRTHDAY EDITION
                </span>
              </div>

              <div className="voucher-center">
                <span className="voucher-pretitle">
                  YOUR PERSONAL SHOPPING GIFT
                </span>

                <div className="voucher-amount">
                  <span className="voucher-currency">JOD</span>
                  <strong>50</strong>
                </div>

                <div className="voucher-divider">
                  <span />
                  <Heart size={15} fill="currentColor" />
                  <span />
                </div>

                <h2>Because You Deserve Something Special</h2>

                <p>
                  تمصرفيي يا حلوه 
                </p>
              </div>

              <div className="voucher-bottom">
                <div>
                  <span>MADE ESPECIALLY FOR</span>
                  <strong>Eisha ♡</strong>
                </div>

                <div className="voucher-seal">
                  <Heart size={23} fill="currentColor" />
                </div>
              </div>
            </article>

            <div className="gift-message">
              <span className="message-eyebrow">
                A MESSAGE FROM الهزبند
              </span>

              <h2>Happy Birthday, Eisha! ♡</h2>

              <p>
                شوشي القطه كبرت سنه المززززه تاعتي ان شاء الله سنه كتكوته تكون واحنا سوا ويخلينا لبعض وجد بتمنالك كل الخير يا عمري
              </p>

              <p className="gift-promise">
               انتي الخير لكل عام يا بيبييي
               البطاقه بتستنااكييي 💗
              </p>

              <div className="message-signature">
                With love, always
                <Heart size={14} fill="currentColor" />
              </div>
            </div>

            <div className="gift-final-note">
              <Sparkles size={14} />
              YOUR DAY. YOUR CHOICE. A LITTLE EXTRA LOVE.
              <Sparkles size={14} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default GiftReveal;
