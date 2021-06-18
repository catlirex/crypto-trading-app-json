export default function SideListItem({
  isSelectedCripto,
  setSelectedCripto,
  item: { id, name },
  setSelectedMainView,
}) {
  return (
    <li key={id}>
      <button
        className={isSelectedCripto(id) ? "selected" : ""}
        onClick={() => {
          setSelectedMainView("coinDetail");
          setSelectedCripto(id);
        }}
      >
        {name}
      </button>
    </li>
  );
}
