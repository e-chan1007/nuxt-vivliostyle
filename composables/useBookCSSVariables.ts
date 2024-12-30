import type { ParsedContentMeta } from "@nuxt/content";
import { useServerHead } from "@unhead/vue";
import { ref } from "vue";

export type BookCSSVariableValue = string | boolean | number;
type BookCSSVariableGetter = (
  bookMeta: ParsedContentMeta,
  page: ParsedContentMeta,
) => BookCSSVariableValue;

const variables = ref(
  new Map<string, BookCSSVariableValue | BookCSSVariableGetter>(),
);

export function useBookCSSVariables() {
  return variables;
}

/**
 * 本の各ページで利用できるようなCSS変数を定義する
 * @param name 変数名(--を含めない)
 * @param value 変数の値
 */
export function setBookCSSVariable(
  name: string,
  value: BookCSSVariableValue,
): void;
/**
 * 本の各ページで利用できるようなCSS変数を定義する
 * @param name 変数名(--を含めない)
 * @param value 変数の値を取得する関数
 */
export function setBookCSSVariable(
  name: string,
  value: BookCSSVariableGetter,
): void;
export function setBookCSSVariable(
  name: string,
  value: BookCSSVariableValue | BookCSSVariableGetter,
): void {
  variables.value.set(name, value);
}

export function resolveBookCSSVariable(
  name: string,
  bookMeta: ParsedContentMeta,
  page: ParsedContentMeta,
): BookCSSVariableValue | undefined {
  const value = variables.value.get(name);
  if (typeof value === "function") {
    return value(bookMeta, page);
  }
  return value;
}

export function resolveBookCSSVariables(
  bookMeta: ParsedContentMeta,
  page: ParsedContentMeta,
): Map<string, BookCSSVariableValue> {
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

export function injectBookCSSVariables(
  bookMeta: ParsedContentMeta,
  page: ParsedContentMeta,
): void {
  const variables = resolveBookCSSVariables(bookMeta, page);
  const isValid = (v: unknown): v is BookCSSVariableValue =>
    typeof v === "string" || typeof v === "boolean" || typeof v === "number";
  const toValue = (v: BookCSSVariableValue): string =>
    typeof v === "string" ? `"${v}"` : v.toString();

  useServerHead({
    style: [
      {
        innerHTML: `
  :root {
    ${Object.entries(bookMeta ?? {})
      .filter(([_, v]) => isValid(v))
      .map(([k, v]) =>
        k === "size" ? `--book-size: ${v}` : `--book-${k}: ${toValue(v)};`,
      )
      .join("\n    ")}
    ${Object.entries(bookMeta.props ?? {})
      .filter((v): v is [string, BookCSSVariableValue] => isValid(v[1]))
      .map(([k, v]) => `--book-props-${k}: ${toValue(v)};`)
      .join("\n    ")}
    ${Object.entries(page ?? {})
      .filter(([_, v]) => isValid(v))
      .map(([k, v]) => `--page-${k}: ${toValue(v)};`)
      .join("\n    ")}
    ${[...variables.entries()]
      .filter(([_, v]) => isValid(v))
      .map(([k, v]) => `--${k}: ${toValue(v)};`)
      .join("\n    ")}
  }
  `,
      },
    ],
  });
}
