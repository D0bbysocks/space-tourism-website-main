export async function loadData() {
  const response = await fetch("./data.json");
  return response.json();
}