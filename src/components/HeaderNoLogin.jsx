import { getUser, postUser } from "../constants";

function HeaderNoLogin({ setLoginUser }) {
  function logIn(e) {
    getUser(e.target.username.value).then((data) => {
      if (data.password && data.password === e.target.password.value)
        setLoginUser(data);
      else alert("Username or Password incorrect");
    });
  }

  function displaySignUpForm() {
    document.getElementById("sign-up").style.display === "grid"
      ? (document.getElementById("sign-up").style.display = "none")
      : (document.getElementById("sign-up").style.display = "grid");
  }

  function signUp(e) {
    let newUser = {
      id: e.target.newUsername.value,
      name: e.target.name.value,
      password: e.target.newPassword.value,
      accountBalance: Number(e.target.balance.value),
      holdingCoins: [],
    };

    postUser(newUser).then((data) => setLoginUser(data));
  }

  return (
    <header>
      <form
        id="sign-in"
        onSubmit={(e) => {
          e.preventDefault();
          logIn(e);
        }}
      >
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Username"
        />
        <input name="password" type="password" placeholder="Password" />
        <button type="submit">Sign in</button>
      </form>

      <div className="sign-up-container">
        <button className="sign-up-btn" onClick={() => displaySignUpForm()}>
          Sign up for free
        </button>
        <form
          id="sign-up"
          className="sign-up-form"
          onSubmit={(e) => {
            e.preventDefault();
            signUp(e);
          }}
        >
          <h2>Fill in details to start trading now!</h2>
          <input
            id="newUsername"
            name="newUsername"
            type="text"
            placeholder="Username"
            required
          />
          <input
            name="newPassword"
            type="password"
            placeholder="Password"
            required
          />
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            required
          />
          <input
            name="balance"
            type="number"
            placeholder="Initial balance"
            required
          />
          <button>Create Account</button>
        </form>
      </div>
    </header>
  );
}

export default HeaderNoLogin;
