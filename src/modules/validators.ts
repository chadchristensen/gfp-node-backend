import { body } from "express-validator";

export const postValidationRules = [
  body("title").notEmpty().isString().withMessage("Title is required"),
  body("slug").notEmpty().isString().withMessage("Content is required"),
  body("categoryId")
    .notEmpty()
    .isString()
    .withMessage("Category ID is required"),
  body("description")
    .notEmpty()
    .isString()
    .withMessage("Description is required"),
  body("image_src")
    .notEmpty()
    .isString()
    .withMessage("Image source is required"),
  body("image_alt_text")
    .notEmpty()
    .isString()
    .withMessage("Image alt text is required"),
  // TODO: Validate that publish_date is a valid date
  body("publish_date").notEmpty().withMessage("Publish date is required"),
  body("is_affiliate_link")
    .notEmpty()
    .isBoolean()
    .withMessage("Affiliate link status is required"),
  body("cta_text")
    .notEmpty()
    .isString()
    .withMessage("Call-to-action text is required"),
  body("cta_link")
    .notEmpty()
    .isString()
    .withMessage("Call-to-action link is required"),
];

export const categoryValidationRules = [
  body("name").notEmpty().isString().withMessage("Name is required"),
];
