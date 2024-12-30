import type { ParsedContentMeta } from "@nuxt/content";

export type BookCSSVariableValue = string | boolean | number;
type BookCSSVariableGetter = (bookMeta: ParsedContentMeta, page: ParsedContentMeta) => BookCSSVariableValue;

const variables = ref(new Map<string, BookCSSVariableValue | BookCSSVariableGetter>());

export function useBookCSSVariables() {
  return variables;
}

export function setBookCSSVariable(name: string, value: BookCSSVariableValue): void;
export function setBookCSSVariable(name: string, value: BookCSSVariableGetter): void;
export function setBookCSSVariable(name: string, value: BookCSSVariableValue | BookCSSVariableGetter): void {
  variables.value.set(name, value);
}

export function resolveBookCSSVariable(name: string, bookMeta: ParsedContentMeta, page: ParsedContentMeta): BookCSSVariableValue | undefined {
  const value = variables.value.get(name);
  if (typeof value === "function") {
    return value(bookMeta, page);
  }
  return value;
}
export function resolveBookCSSVariables(bookMeta: ParsedContentMeta, page: ParsedContentMeta): Map<string, BookCSSVariableValue> {
  const result = new Map<string, BookCSSVariableValue>();
  for (const [name, value] of variables.value) {
    if (typeof value === "function") {
      result.set(name, value(bookMeta, page));
    } else {
      result.set(name, value);
    }
  }
  return result;
}
