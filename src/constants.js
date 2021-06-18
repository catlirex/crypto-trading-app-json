const API = "https://api.coingecko.com/api/v3";

export const STATUS_UPDATES = `${API}/status_updates`;
export const CRIPTO_LIST = `${API}/coins/markets?vs_currency=gbp`;
export const getCriptoUpdateUrl = (id) =>
  `${API}/simple/price?ids=${id}&vs_currencies=gbp&include_last_updated_at=true`;

const LOCAL_DB = "http://localhost:4000";

export function getUser(id) {
  return fetch(`${LOCAL_DB}/user/${id}`).then((response) => response.json());
}

export function postUser(newUserDetail) {
  return fetch(`${LOCAL_DB}/user/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserDetail),
  }).then((response) => {
    if (!response.ok) return alert("Username existed");
    return response.json();
  });
}

export function patchUpdateUser(loginUserId, updatedUser) {
  return fetch(`${LOCAL_DB}/user/${loginUserId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  }).then((response) => response.json());
}

export function handleNumDecimal(num) {
  const dec = num.toString().split(".")[1];
  if (dec && dec.length > 4) return num.toFixed(4);
  else return num;
}

export function getCurrentTime() {
  return Math.round(Date.now() / 1000);
}

export function convertToSeconds(dateValue) {
  // This guard is needed due to the API discrepancies in handling dates
  return typeof dateValue === "string"
    ? Math.round(Date.parse(dateValue) / 1000)
    : dateValue;
}
