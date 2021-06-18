import { useState } from "react";
import HeaderLogin from "./components/HeaderLogin";
import HeaderNoLogin from "./components/HeaderNoLogin";

import MainSection from "./components/MainSection";
import MyCoins from "./components/MyCoins";
import NewsFeedList from "./components/NewsFeedList";
import SideList from "./components/SideList";

function App() {
  const [selectedCripto, setSelectedCripto] = useState(null);
  const [cryptoList, setCryptoList] = useState([]);
  const [loginUser, setLoginUser] = useState(null);
  const [selectedMainView, setSelectedMainView] = useState(null);

  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      {loginUser ? (
        <HeaderLogin
          setSelectedMainView={setSelectedMainView}
          loginUser={loginUser}
          setLoginUser={setLoginUser}
        />
      ) : (
        <HeaderNoLogin setLoginUser={setLoginUser} />
      )}

      <aside className="side-list">
        <SideList
          setSelectedMainView={setSelectedMainView}
          cryptoList={cryptoList}
          setCryptoList={setCryptoList}
          isSelectedCripto={isSelectedCripto}
          setSelectedCripto={setSelectedCripto}
        />
      </aside>
      <main className="main-detail">
        {selectedMainView === "coinDetail" ? (
          <MainSection
            setLoginUser={setLoginUser}
            loginUser={loginUser}
            selectedCripto={selectedCripto}
            cryptoList={cryptoList}
            setCryptoList={setCryptoList}
            setSelectedCripto={setSelectedCripto}
          />
        ) : null}

        {selectedMainView === "myCoins" ? (
          <MyCoins
            setSelectedMainView={setSelectedMainView}
            setSelectedCripto={setSelectedCripto}
            cryptoList={cryptoList}
            loginUser={loginUser}
          />
        ) : null}

        {selectedMainView === null ? (
          <h1>Signup for free to trade~ Select a coin to view price</h1>
        ) : null}

        <NewsFeedList />
      </main>
    </>
  );
}

export default App;
