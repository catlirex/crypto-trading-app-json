import MyCoinItem from "./MyCoinItem";

function MyCoins({
  loginUser,
  cryptoList,
  setSelectedMainView,
  setSelectedCripto,
}) {
  return (
    <main className="my-coin">
      <h1>My Coins</h1>
      <ul>
        <li>
          <span>
            <b>Symbol</b>
          </span>
          <span>
            <b>Quantity</b>
          </span>
          <span>
            <b>Avg. buy price</b>
          </span>
          <span>
            <b>Current Price</b>
          </span>
        </li>
        {loginUser.holdingCoins.length === 0 ? (
          <h2>You have no stock, start trading today!</h2>
        ) : (
          loginUser.holdingCoins.map((coin) => (
            <MyCoinItem
              key={coin.id}
              coin={coin}
              cryptoList={cryptoList}
              setSelectedMainView={setSelectedMainView}
              setSelectedCripto={setSelectedCripto}
            />
          ))
        )}
      </ul>
    </main>
  );
}

export default MyCoins;
