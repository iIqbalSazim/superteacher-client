export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toDateString().slice(4, 15);
}
