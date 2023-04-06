export const formatDate = (date) => {
  if (!date) return "-";

  const options = {
    // weekday: 'long',
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("id-ID", options);
};
