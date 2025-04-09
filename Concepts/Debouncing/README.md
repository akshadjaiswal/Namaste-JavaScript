# 🔁 Debouncing

Code

**Definition:**  
Debouncing is a programming pattern used to limit the rate at which a function is executed. Specifically, it ensures that the function is only called **after a specified delay has passed since the last time the event was triggered**.

In practice, every time the event fires, the previously scheduled function execution is canceled and a new one is scheduled. This means the function will **only run after the user has stopped performing the action** for a given period of time.

**Key Characteristics:**
- Delays execution until after a certain period of inactivity.
- Resets the timer each time the event is triggered.
- Only the **last event** in a series of rapid events is processed.

**Common Use Cases:**
- Handling input in search boxes.
- Resizing windows.
- Auto-saving form content after typing stops.

---