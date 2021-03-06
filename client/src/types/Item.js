import * as yup from "yup";
import categories from "src/types/categories";

class Item {
    constructor(category) {
        this.category = category || "";
    }

    title = "";
    description = "";
    image = "";
    price = 0;
    isFeatured = false;
    featured = { image: "", caption: "" };
    category = "";
    reviews = [];
}

export default Item;

export const createItemValidationSchema = isFeatured =>
    yup.object({
        title: yup.string().required("Please provide a title"),
        description: yup.string(),
        image: yup.string().url("Item image should be a url"),
        price: yup.number().moreThan(-1, "Price can't be negative"),
        featured: isFeatured
            ? yup.object({
                  image: yup
                      .string()
                      .url("Featured image should be a url")
                      .required(
                          "For featured items you have to provide an image for the carousel"
                      ),
                  caption: yup.string()
              })
            : yup.mixed().nullable(),
        category: yup.string().oneOf(categories, "Please choose a category")
    });
