function toDateString(date: Date | string): string {
    const str = typeof date === 'string' ? date : date.toISOString();
    return str.slice(0, 10); // "YYYY-MM-DD"
}

export function formatDate(date: Date | string): string {
    const [year, month, day] = toDateString(date).split('-');
    return `${day}/${month}/${year}`;
}

export function toInputDate(date: Date | string): string {
    return toDateString(date);
}
