export function trim(str: string, symbols?: string): string {
    let value = str;
    if (symbols) {
      const reg = new RegExp(`[${symbols}]`, "gi");
      value = value.replace(reg, "");
    }
  
    return value.trim();
}