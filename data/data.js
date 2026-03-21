export async function loadData() {
  const response = await fetch("./data/data.json");
  return response.json();
}