import { useEffect, useState } from "react";
import { getCriptoUpdateUrl } from "../constants";

function UpdateSection({ selectedCripto, cryptoList, setCryptoList }) {
  const secondToUpdate = 10;
  const [nextFetch, setNextFetch] = useState(secondToUpdate);
  const [intervalId, setIntervalId] = useState(null);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const down = () => {
    setNextFetch((timeOnPageFromReact) => {
      return timeOnPageFromReact - 1;
    });
  };

  useEffect(() => {
    setNextFetch(secondToUpdate);
  }, [selectedCripto]);

  useEffect(() => {
    setIntervalId(setInterval(down, 1000));
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (nextFetch === 0) {
      setNextFetch(secondToUpdate);
      fetch(getCriptoUpdateUrl(selectedCripto))
        .then((resp) => resp.json())
        .then((data) => {
          let updatedCryptoList = cryptoList.map((coin) => {
            if (coin.id !== selectedCripto) return coin;

            return {
              ...coin,
              currentPrice: data[coin.id].gbp,
              lastUpdate: data[coin.id].last_updated_at,
            };
          });
          setCryptoList(updatedCryptoList);
        });
    }
  }, [nextFetch]);

  return (
    <div className="main-detail__update">
      <p>next update in {nextFetch}</p>
      {/* <!-- This button is for the challenge two --> */}
      <button
        className="main-detail__button"
        onClick={() => {
          clearInterval(intervalId);
          setAutoUpdate(!autoUpdate);
        }}
        style={autoUpdate ? { display: "block" } : { display: "none" }}
      >
        Pause update
      </button>

      <button
        className="main-detail__button"
        onClick={() => {
          setIntervalId(setInterval(down, 1000));
          setAutoUpdate(!autoUpdate);
        }}
        style={autoUpdate ? { display: "none" } : { display: "block" }}
      >
        Resume update
      </button>
    </div>
  );
}

export default UpdateSection;
