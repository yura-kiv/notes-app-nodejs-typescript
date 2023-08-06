import { ValidationError } from "yup";

export function formError(error: ValidationError): string {
  let msg;
  if (error.inner) {
    msg = error.inner.map((error: any) => error.message).join(", ");
  } else {
    msg = error.message;
  }
  return msg;
}
