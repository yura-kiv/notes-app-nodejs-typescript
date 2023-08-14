import * as yup from "yup";

export const noteSchema = yup
  .object()
  .shape({
    id: yup.string().required(),
    name: yup.string().required(),
    date: yup.date().required(),
    category: yup
      .string()
      .oneOf(
        ["Task", "Random Thoughts", "Idea"],
        "Category can be only: Task, Random Thoughts, Idea"
      )
      .required(),
    content: yup.string().required(),
    archived: yup.boolean().required(),
  })
  .noUnknown(true)
  .strict();

export const requestNoteSchema = yup
  .object()
  .shape({
    id: yup.string(),
    name: yup.string().required(),
    category: yup
      .string()
      .oneOf(
        ["Task", "Random Thoughts", "Idea"],
        "Category can be only: Task, Random Thoughts, Idea"
      )
      .required(),
    content: yup.string().required(),
    archived: yup.boolean().required(),
  })
  .noUnknown(true)
  .strict();
