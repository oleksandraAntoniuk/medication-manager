import { describe, it, expect, vi, afterEach } from "vitest";
import {
  addMedicine,
  increaseDose,
  decreaseDose,
  deleteMedicine,
  resetAllMedicines,
  getCompletedMedicinesCount,
} from "./medicineUtils";

const mockMedicines = [
  { id: 1, name: "Vitamin D", goal: 3, taken: 1 },
  { id: 2, name: "Omega-3", goal: 2, taken: 0 },
];

afterEach(() => {
  vi.restoreAllMocks();
});

describe("medicineUtils", () => {
  it("додає новий препарат з коректними даними", () => {
    vi.spyOn(Date, "now").mockReturnValue(123456);

    const result = addMedicine(mockMedicines, "Magnesium", "2");

    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({
      id: 123456,
      name: "Magnesium",
      goal: 2,
      taken: 0,
    });
  });

  it("не додає препарат з порожньою назвою", () => {
    const result = addMedicine(mockMedicines, "", "2");

    expect(result).toEqual(mockMedicines);
  });

  it("не додає препарат, якщо кількість доз менша або дорівнює 0", () => {
    const result = addMedicine(mockMedicines, "Magnesium", "0");

    expect(result).toEqual(mockMedicines);
  });

  it("increaseDose збільшує taken на 1, якщо не досягнуто goal", () => {
    const result = increaseDose(mockMedicines, 1);

    expect(result[0].taken).toBe(5); 
  });

  it("increaseDose не перевищує goal", () => {
    const medicines = [
      { id: 1, name: "Vitamin D", goal: 3, taken: 3 },
    ];

    const result = increaseDose(medicines, 1);

    expect(result[0].taken).toBe(3);
  });

  it("decreaseDose не опускає taken нижче 0", () => {
    const result = decreaseDose(mockMedicines, 2);

    expect(result[1].taken).toBe(0);
  });

  it("deleteMedicine видаляє препарат за id", () => {
    const result = deleteMedicine(mockMedicines, 1);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("resetAllMedicines скидає прогрес у всіх препаратів", () => {
    const medicines = [
      { id: 1, name: "Vitamin D", goal: 3, taken: 2 },
      { id: 2, name: "Omega-3", goal: 2, taken: 1 },
    ];

    const result = resetAllMedicines(medicines);

    expect(result[0].taken).toBe(0);
    expect(result[1].taken).toBe(0);
  });

  it("getCompletedMedicinesCount правильно рахує виконані препарати", () => {
    const medicines = [
      { id: 1, name: "Vitamin D", goal: 3, taken: 3 },
      { id: 2, name: "Omega-3", goal: 2, taken: 1 },
      { id: 3, name: "Magnesium", goal: 1, taken: 1 },
    ];

    const result = getCompletedMedicinesCount(medicines);

    expect(result).toBe(2);
  });
});