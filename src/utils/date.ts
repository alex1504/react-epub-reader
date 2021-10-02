export function getCurLocaleTime(): string {
  const date = new Date();

  return date.toLocaleDateString() + date.toLocaleTimeString();
}
