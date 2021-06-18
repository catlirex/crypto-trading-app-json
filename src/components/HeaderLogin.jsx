function HeaderLogin({ loginUser, setLoginUser, setSelectedMainView }) {
  const { name, accountBalance } = loginUser;
  return (
    <header>
      <h1>{name}</h1>
      <p>Account Balance £{accountBalance.toFixed(4)}</p>
      <button onClick={() => setSelectedMainView("myCoins")}>
        Show my coins
      </button>
      <button
        onClick={() => {
          setLoginUser(null);
          setSelectedMainView(null);
        }}
      >
        Log out
      </button>
    </header>
  );
}

export default HeaderLogin;
