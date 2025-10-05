export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};


const getMiraColor = (style: string) => {
  switch (style) {
    case "calm":
      return "#4A90E2"; // blue
    case "warm":
      return "#FE5933"; // orange
    case "neutral":
      return "#2c2c2c"; // dark gray
    default:
      return "var(--primary)";
  }
};

export default getMiraColor;
