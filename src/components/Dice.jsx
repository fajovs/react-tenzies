export default function Dice(props) {
  return (
    <>
      <button  className={`button ${props.isHeld ? "held-number" : ""}`} onClick={props.onClick}>{props.value}</button>
    </>
  );
}
