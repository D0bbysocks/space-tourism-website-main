export async function loadData() {
  const response = await fetch("./data/data.json");
  if (!response.ok) throw new Error(`Failed to load data: HTTP ${response.status}`);
  return response.json();
}