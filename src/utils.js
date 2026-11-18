// Turn "2026-11-20" and "14:30:00" into friendly text
export function formatDate(dateText) {
  if (!dateText) return "";
  return new Date(dateText.slice(0, 10) + "T00:00:00").toLocaleDateString(
    "en-GB",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}

export function formatTime(timeText) {
  return timeText ? timeText.slice(0, 5) : "";
}

export function formatDateTime(timestampText) {
  if (!timestampText) return "";
  return new Date(timestampText.replace(" ", "T")).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getInitials(fullName = "") {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
