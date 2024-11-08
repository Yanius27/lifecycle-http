export default function setToLocalStorage(data: unknown) {
  localStorage.setItem('clocks', JSON.stringify(data))
}
