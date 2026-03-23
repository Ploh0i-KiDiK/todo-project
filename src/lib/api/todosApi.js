

const API_URL = '/todos';

export async function fetchTodos(limit = 10) {
  
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to load todos from API');
  }
  const data = await response.json();
  
  return data.slice(0, limit).map((item) => ({
    
    id:
      typeof item.id === 'number'
        ? item.id
        : typeof item.id === 'string' && item.id.trim() !== '' && Number.isFinite(Number(item.id))
          ? Number(item.id)
          : item.id,
    title: item.title,
    completed: item.completed,
  }));
}
