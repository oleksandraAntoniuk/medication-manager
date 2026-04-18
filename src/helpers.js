// Допоміжні функції для роботи з даними у додатку

// Форматування дати у зручний вигляд
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

// Перевірка, чи рядок пустий
export const isEmpty = (value) => {
  return !value || value.trim() === "";
};

// Обмеження числа (наприклад, для доз)
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};