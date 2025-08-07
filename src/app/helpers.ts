export function isStringArray(arr: any): arr is string[] {
  return Array.isArray(arr) && arr.every((item) => typeof item === "string");
}

// Helper to format phone numbers as (XXX) XXX-XXXX
export function formatPhoneNumber(phone: number | string) {
  const digits = phone.toString().replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}
