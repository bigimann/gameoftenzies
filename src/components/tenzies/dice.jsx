export default function Dice(props) {
  // Function to render dice dots based on value
  const renderDiceDots = (value) => {
    const pipPositions = {
      1: [{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }],
      2: [
        { top: "25%", left: "25%" },
        { bottom: "25%", right: "25%" },
      ],
      3: [
        { top: "25%", left: "25%" },
        { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
        { bottom: "25%", right: "25%" },
      ],
      4: [
        { top: "25%", left: "25%" },
        { top: "25%", right: "25%" },
        { bottom: "25%", left: "25%" },
        { bottom: "25%", right: "25%" },
      ],
      5: [
        { top: "25%", left: "25%" },
        { top: "25%", right: "25%" },
        { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
        { bottom: "25%", left: "25%" },
        { bottom: "25%", right: "25%" },
      ],
      6: [
        { top: "20%", left: "25%" },
        { top: "50%", left: "25%", transform: "translateY(-50%)" },
        { bottom: "20%", left: "25%" },
        { top: "20%", right: "25%" },
        { top: "50%", right: "25%", transform: "translateY(-50%)" },
        { bottom: "20%", right: "25%" },
      ],
    };

    const pipStyle = {
      position: "absolute",
      width: "12px",
      height: "12px",
      backgroundColor: props.isHeld ? "#fff" : "#333",
      borderRadius: "50%",
    };

    return pipPositions[value]?.map((pos, index) => (
      <div key={index} style={{ ...pipStyle, ...pos }} />
    ));
  };

  // Updated button styles for dice appearance
  const diceStyles = {
    position: "relative",
    width: "60px",
    height: "60px",
    border: "2px solid #333",
    borderRadius: "8px",
    backgroundColor: props.isHeld ? "#59E391" : "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "0", // Hides any text content
  };

  return (
    <button
      aria-label={`Die with value ${props.value}, ${
        props.isHeld ? "held" : "not held"
      }`}
      aria-pressed={props.isHeld}
      style={diceStyles}
      onClick={props.hold}
      className="dice"
    >
      {renderDiceDots(props.value)}
    </button>
  );
}

// export default function Dice(props) {
//   const styles = {
//     backgroundColor: props.isHeld ? "#59e391" : "white",
//   };

//   return (
//     <button
//       aria-label={`Die with value ${props.value}, ${
//         props.isHeld ? "held" : "not held"
//       }`}
//       aria-pressed={props.isHeld}
//       style={styles}
//       onClick={props.hold}
//       className="dice"
//     >
//       {props.value}
//     </button>
//   );
// }
