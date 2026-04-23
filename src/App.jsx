import { useState } from "react";
import "./App.css";
import posthog from 'posthog-js'

function App() {
  const [medicineName, setMedicineName] = useState("");
  const [dailyGoal, setDailyGoal] = useState("");

  const appStatus = import.meta.env.VITE_APP_STATUS;

  const [medicines, setMedicines] = useState([
    { id: 1, name: "Vitamin D", goal: 3, taken: 1 },
    { id: 2, name: "Omega-3", goal: 2, taken: 0 },
  ]);

  const addMedicine = () => {
    if (medicineName.trim() === "" || dailyGoal.trim() === "") return;

    const goalNumber = Number(dailyGoal);

    if (goalNumber <= 0) return;

    const newMedicine = {
      id: Date.now(),
      name: medicineName,
      goal: goalNumber,
      taken: 0,
    };

    setMedicines([newMedicine, ...medicines]);
    setMedicineName("");
    setDailyGoal("");

  posthog.capture('medicine_added', {
    name: medicineName,
    dose: goalNumber,
    category: 'medicine'
  });

  };

  const increaseDose = (id) => {
    const selectedMedicine = medicines.find((item) => item.id === id);

    setMedicines(
      medicines.map((item) =>
        item.id === id && item.taken < item.goal
          ? { ...item, taken: item.taken + 1 }
          : item
      )
    );

    // Подія: користувач прийняв препарат
    if (selectedMedicine && selectedMedicine.taken < selectedMedicine.goal) {
      posthog.capture('medicine_taken', {
        name: selectedMedicine.name,
        taken_before: selectedMedicine.taken,
        taken_after: selectedMedicine.taken + 1,
        goal: selectedMedicine.goal
      });
    }
  };

  const decreaseDose = (id) => {
    setMedicines(
      medicines.map((item) =>
        item.id === id && item.taken > 0
          ? { ...item, taken: item.taken - 1 }
          : item
      )
    );
  };

  const deleteMedicine = (id) => {
    const selectedMedicine = medicines.find((item) => item.id === id);

    setMedicines(medicines.filter((item) => item.id !== id));

    // Подія: користувач видалив препарат
    if (selectedMedicine) {
      posthog.capture('medicine_deleted', {
        name: selectedMedicine.name,
        reason: 'user_deleted'
      });
    }
  };

  const resetAll = () => {
    setMedicines(
      medicines.map((item) => ({
        ...item,
        taken: 0,
      }))
    );
  };

  const totalMedicines = medicines.length;
  const completedMedicines = medicines.filter(
    (item) => item.taken === item.goal
  ).length;

  return (
    <div className="app">
      <div className="wrapper">
        <header className="header-box">
          <div>
            <p className="top-label">Щоденний контроль</p>
            <h1>Medication Manager</h1>
            <p>{appStatus}</p>
            <p className="header-text">
              Додавай ліки, відмічай прийом та слідкуй за виконанням денної норми.
            </p>
          </div>

          <div className="summary-box">
            <div className="summary-item">
              <span className="summary-number">{totalMedicines}</span>
              <span className="summary-text">Усього препаратів</span>
            </div>

            <div className="summary-item">
              <span className="summary-number">{completedMedicines}</span>
              <span className="summary-text">Виконано сьогодні</span>
            </div>
          </div>
        </header>

        <section className="form-card">
          <h2>Додати препарат</h2>

          <div className="form-grid">
            <input
              type="text"
              placeholder="Назва ліків"
              value={medicineName}
              onChange={(e) => setMedicineName(e.target.value)}
            />

            <input
              type="number"
              placeholder="Кількість прийомів за день"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(e.target.value)}
              min="1"
            />

            <button className="add-medicine-btn" onClick={addMedicine}>
              Додати
            </button>
          </div>
        </section>

        <section className="info-card">
          <h3>Нагадування</h3>
          <p>
            Відмічай кожен прийом після фактичного вживання та не перевищуй
            встановлену денну норму.
          </p>
        </section>

        <section className="list-section">
          {medicines.length === 0 ? (
            <div className="empty-box">
              Список ліків порожній. Додай перший препарат вище.
            </div>
          ) : (
            medicines.map((item) => {
              const progress = Math.round((item.taken / item.goal) * 100);

              return (
                <div className="medicine-card" key={item.id}>
                  <div className="medicine-top">
                    <div>
                      <p className="medicine-label">Препарат</p>
                      <h2>{item.name}</h2>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => deleteMedicine(item.id)}
                    >
                      Видалити
                    </button>
                  </div>

                  <div className="medicine-middle">
                    <div className="dose-box">
                      <span className="dose-number">
                        {item.taken} / {item.goal}
                      </span>
                      <span className="dose-label">Прийомів сьогодні</span>
                    </div>

                    <div className="progress-area">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="progress-text">{progress}% виконано</p>
                    </div>
                  </div>

                  <div className="action-row">
                    <button
                      className="plus-btn"
                      onClick={() => increaseDose(item.id)}
                    >
                      + Доза
                    </button>

                    <button
                      className="minus-btn"
                      onClick={() => decreaseDose(item.id)}
                    >
                      - Доза
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>

        <button className="reset-btn" onClick={resetAll}>
          Скинути прогрес за день
        </button>
      </div>
    </div>
  );
}

export default App;
