export default function getFromLocalStorage() {
  const data = localStorage.getItem('clocks');
  return data ? JSON.parse(data) : [];
}
