import { useState } from "react";
import { patchUpdateUser, handleNumDecimal } from "../constants";

function replaceCoin(element, updatedElement) {
  if (element.id === updatedElement.id) return updatedElement;
  return element;
}

export default function TradingForm({
  currentPrice,
  loginUser,
  selectedCripto,
  setLoginUser,
}) {
  const [tradeAction, setTradeAction] = useState(null);
  const [tradeQuantity, setTradeQuantity] = useState(0);

  function trading(e) {
    let userCurrentStock = loginUser.holdingCoins.find(
      (coin) => coin.id === selectedCripto
    );

    if (
      tradeAction === "buy" &&
      loginUser.accountBalance - tradeQuantity * currentPrice < 0
    )
      return alert("Please Topup account before trading.");
    if (
      tradeAction === "sell" &&
      (userCurrentStock === undefined ||
        userCurrentStock.quantity < tradeQuantity)
    )
      return alert("You don't have enough stock to sell.");

    let updatedUser = {};

    if (tradeAction === "buy" && userCurrentStock === undefined) {
      let newCoinToAC = {
        id: selectedCripto,
        quantity: tradeQuantity,
        avgBuyInPrice: currentPrice,
      };

      updatedUser = {
        ...loginUser,
        accountBalance: loginUser.accountBalance - tradeQuantity * currentPrice,
        holdingCoins: [...loginUser.holdingCoins, newCoinToAC],
      };
    }
    if (tradeAction === "buy" && userCurrentStock !== undefined) {
      let updatedCoinToAC = {
        id: selectedCripto,
        quantity: tradeQuantity + userCurrentStock.quantity,
        avgBuyInPrice:
          (currentPrice * tradeQuantity +
            userCurrentStock.quantity * userCurrentStock.avgBuyInPrice) /
          (tradeQuantity + userCurrentStock.quantity),
      };
      updatedUser = {
        ...loginUser,
        accountBalance: loginUser.accountBalance - tradeQuantity * currentPrice,
        holdingCoins: loginUser.holdingCoins.map((coin) =>
          replaceCoin(coin, updatedCoinToAC)
        ),
      };
    }

    if (tradeAction === "sell" && userCurrentStock.quantity === tradeQuantity) {
      updatedUser = {
        ...loginUser,
        accountBalance: loginUser.accountBalance + tradeQuantity * currentPrice,
        holdingCoins: loginUser.holdingCoins.filter(
          (coin) => coin.id !== selectedCripto
        ),
      };
    }

    if (tradeAction === "sell" && userCurrentStock.quantity > tradeQuantity) {
      let updatedCoinToAC = {
        ...userCurrentStock,
        quantity: userCurrentStock.quantity - tradeQuantity,
      };
      updatedUser = {
        ...loginUser,
        accountBalance: loginUser.accountBalance + tradeQuantity * currentPrice,
        holdingCoins: loginUser.holdingCoins.map((coin) =>
          replaceCoin(coin, updatedCoinToAC)
        ),
      };
    }

    patchUpdateUser(loginUser.id, updatedUser).then((data) => {
      setLoginUser(data);
      e.target.reset();
      setTradeQuantity(0);
      setTradeAction(null);
    });
  }

  return (
    <form
      id="trade"
      onSubmit={(e) => {
        e.preventDefault();
        loginUser ? trading(e) : alert("Please login");
      }}
    >
      <h2>Trade Now</h2>
      <div>
        <input
          type="radio"
          id="buy"
          name="action"
          value="buy"
          required
          onChange={(e) => setTradeAction(e.target.value)}
        />
        <label htmlFor="buy">Buy</label>
        <input
          type="radio"
          id="sell"
          name="action"
          value="sell"
          onChange={(e) => setTradeAction(e.target.value)}
        />
        <label htmlFor="sell">Sell</label>
      </div>
      <div className="quantity-container">
        <label htmlFor="quantity">Quantity</label>
        <input
          name="quantity"
          type="number"
          placeholder="0"
          min="1"
          required
          onChange={(e) => setTradeQuantity(Number(e.target.value))}
        />
      </div>
      <span>
        Trade Value: £ {handleNumDecimal(tradeQuantity * currentPrice)}
      </span>

      <span>
        A/C Balance: £{" "}
        {loginUser
          ? tradeAction === "buy"
            ? handleNumDecimal(
                loginUser.accountBalance - tradeQuantity * currentPrice
              )
            : tradeAction === "sell"
            ? handleNumDecimal(
                loginUser.accountBalance + tradeQuantity * currentPrice
              )
            : handleNumDecimal(loginUser.accountBalance)
          : "Please login"}
      </span>
      <span>
        Stock owned:{" "}
        {loginUser
          ? loginUser.holdingCoins.find(
              (coin) => coin.id === selectedCripto
            ) !== undefined
            ? loginUser.holdingCoins.find((coin) => coin.id === selectedCripto)
                .quantity
            : 0
          : "n/a"}
      </span>
      {loginUser ? (
        loginUser.holdingCoins.find((coin) => coin.id === selectedCripto) !==
        undefined ? (
          <span>
            Average Buy in price:{" "}
            {handleNumDecimal(
              loginUser.holdingCoins.find((coin) => coin.id === selectedCripto)
                .avgBuyInPrice
            )}
          </span>
        ) : null
      ) : null}

      <button type="submit">Trade</button>
    </form>
  );
}
