export function formatDateAndTime(isoString: string): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  const formattedDate = `${date.toLocaleDateString('ru', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })} | ${date.toLocaleTimeString('ru', {
    hour: '2-digit',
    minute: '2-digit'
  })}`;

  return formattedDate;
}

export function currentStatus(string: string): string {
  return string === "Created" ? "Выполняется" : "Выполнен";
}
