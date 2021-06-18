import { useEffect } from "react";
import { CRIPTO_LIST } from "../constants";
import SideListItem from "./SideListItem";

function SideList({
  isSelectedCripto,
  setSelectedCripto,
  cryptoList,
  setCryptoList,
  setSelectedMainView,
}) {
  useEffect(() => {
    fetch(CRIPTO_LIST)
      .then((resp) => resp.json())
      .then((list) => {
        let coinList = [];
        for (const coin of list) {
          let newCoin = {
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            currentPrice: coin.current_price,
            lastUpdate: coin.last_updated,
          };
          coinList = [...coinList, newCoin];
        }
        setCryptoList(coinList);
      });
  }, []);
  return cryptoList.map((item) => (
    <SideListItem
      setSelectedMainView={setSelectedMainView}
      key={item.id}
      item={item}
      setSelectedCripto={setSelectedCripto}
      isSelectedCripto={isSelectedCripto}
    />
  ));
}

export default SideList;
