
# ⏱️ Throttling

**Definition:**  
Throttling is a technique that limits how often a function can be called over time. It ensures that the function is **executed at most once in a specified time interval**, no matter how many times the event is triggered during that period.

Unlike debouncing, throttling does **not wait for the event to stop firing**. Instead, it guarantees a fixed rate of execution by ignoring any events that occur within the cooldown window.

**Key Characteristics:**
- Executes the function at regular intervals.
- Ignores additional triggers until the interval has passed.
- Ensures a consistent, periodic execution rate.

**Common Use Cases:**
- Scroll event handling.
- Mouse movement tracking.
- Limiting button clicks or API calls per time frame.