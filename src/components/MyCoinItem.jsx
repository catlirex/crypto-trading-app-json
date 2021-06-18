import { handleNumDecimal } from "../constants";

export default function MyCoinItem({
  coin,
  cryptoList,
  setSelectedMainView,
  setSelectedCripto,
}) {
  let coinCurrentPrice = cryptoList.find(
    (target) => target.id === coin.id
  ).currentPrice;

  return (
    <li>
      <span>{coin.id}</span>
      <span>{coin.quantity}</span>
      <span>{handleNumDecimal(coin.avgBuyInPrice)}</span>
      <span>{coinCurrentPrice}</span>
      <button
        onClick={() => {
          setSelectedMainView("coinDetail");
          setSelectedCripto(coin.id);
        }}
      >
        Trade Now
      </button>
    </li>
  );
}
