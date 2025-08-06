function generateVibrantColorsFromString(str = "") {
  if (typeof str !== "string" || str.length === 0) {
    return {
      backgroundColor: "#6C63FF", // fallback vibrant purple
      textColor: "#ffffff",
    };
  }

  // Create hash
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate HSL color for vibrancy
  const hue = Math.abs(hash) % 360;
  const saturation = 70 + (Math.abs(hash) % 20); // 70–90%
  const lightness = 45 + (Math.abs(hash) % 10); // 45–55%

  const backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  // Determine contrasting text color based on lightness
  const textColor = lightness > 50 ? "#111111" : "#ffffff";

  return {
    backgroundColor,
    textColor,
  };
}

export default generateVibrantColorsFromString;
