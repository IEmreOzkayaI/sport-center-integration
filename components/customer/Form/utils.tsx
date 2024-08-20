// utils/formatters.ts
export function formatPhoneNumber(value: string): string {
    let formattedValue = value.replace(/[^0-9]/g, "").slice(0, 10);
    if (formattedValue.length > 3) {
        formattedValue = `(${formattedValue.slice(0, 3)}) ${formattedValue.slice(3, 6)} ${formattedValue.slice(6)}`;
    } else if (formattedValue.length === 3) {
        formattedValue = `(${formattedValue}) `;
    }
    return formattedValue;
}
