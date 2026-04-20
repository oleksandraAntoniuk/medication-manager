export function addMedicine(medicines, medicineName, dailyGoal) {
  if (medicineName.trim() === "" || dailyGoal.trim() === "") {
    return medicines;
  }

  const goalNumber = Number(dailyGoal);

  if (goalNumber <= 0) {
    return medicines;
  }

  const newMedicine = {
    id: Date.now(),
    name: medicineName.trim(),
    goal: goalNumber,
    taken: 0,
  };

  return [newMedicine, ...medicines];
}

export function increaseDose(medicines, id) {
  return medicines.map((item) =>
    item.id === id && item.taken < item.goal
      ? { ...item, taken: item.taken + 1 }
      : item
  );
}

export function decreaseDose(medicines, id) {
  return medicines.map((item) =>
    item.id === id && item.taken > 0
      ? { ...item, taken: item.taken - 1 }
      : item
  );
}

export function deleteMedicine(medicines, id) {
  return medicines.filter((item) => item.id !== id);
}

export function resetAllMedicines(medicines) {
  return medicines.map((item) => ({
    ...item,
    taken: 0,
  }));
}

export function getCompletedMedicinesCount(medicines) {
  return medicines.filter((item) => item.taken === item.goal).length;
}