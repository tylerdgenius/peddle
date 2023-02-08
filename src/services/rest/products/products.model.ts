import { logToConsole } from '@utilities/index';
import { model, Schema } from 'mongoose';
import { TimeStamps } from '../../../types';
import {
  DeleteProduct,
  FindProduct,
  InsertProductData,
  Product,
  UpdateProduct,
} from './products.type';

const productSchema = new Schema<Product & TimeStamps>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'users',
    },
    productTitle: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productImageUrl: {
      type: String,
      required: false,
    },
    productImageFileMimetype: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const productModel = model('products', productSchema);

export const insertProduct: InsertProductData = async ({ insertData }) => {
  try {
    const insertProductData = await productModel.create({
      ...insertData,
    });

    return {
      status: true,
      message: 'Product data successfully added into the database',
      payload: insertProductData,
    };
  } catch (error) {
    logToConsole({ error });
    return {
      status: false,
      message: 'Unable to insert product details into database',
      payload: null,
    };
  }
};

export const findProduct: FindProduct = async ({ filter }) => {
  try {
    const product = await productModel.findOne({
      ...filter,
    });

    if (!product || Object.keys(product).length <= 0)
      throw new Error('Unable to fetch product details');

    const returnedObject = {
      ...product.toObject(),
    };

    return {
      status: true,
      message: 'Successfully found product details',
      payload: returnedObject,
    };
  } catch (error) {
    logToConsole({ error });
    return {
      status: false,
      message: 'Unable to find product details in the database',
      payload: null,
    };
  }
};

export const findProducts: FindProducts = async ({ filter }) => {
  try {
    const products = await productModel.find(filter);

    if (!products || products.length <= 0)
      throw new Error('Unable to fetch products');

    return {
      status: true,
      message: 'Successfully found products',
      payload: products,
    };
  } catch (error) {
    logToConsole({ error });
    return {
      status: false,
      message: 'Unable to find products in the database',
      payload: null,
    };
  }
};

export const updateProduct: UpdateProduct = async ({ filter, updateData }) => {
  try {
    const product = await findProduct({
      filter,
    });

    if (!product.status) throw new Error(product.message);

    const updatedProduct = await productModel.updateOne(
      {
        ...filter,
      },
      {
        ...updateData,
      },
      {
        returnOriginal: false,
      }
    );

    const { acknowledged } = updatedProduct;

    if (!acknowledged) throw new Error('Unable to update product details');

    return {
      status: true,
      message: `Product successfully updated`,
      payload: {
        ...filter,
        ...updateData,
      },
    };
  } catch (error) {
    logToConsole({ error });
    return {
      status: false,
      message: 'Unable to update product details in the database',
      payload: null,
    };
  }
};

export const deleteProduct: DeleteProduct = async ({ filter }) => {
  try {
    const product = await productModel.deleteOne({
      ...filter,
    });

    const { acknowledged } = product;

    if (!acknowledged) throw new Error('Unable to delete product');

    return {
      status: true,
      message: `Product successfully deleted`,
      payload: {
        ...filter,
      },
    };
  } catch (error) {
    logToConsole({ error });
    return {
      status: false,
      message: 'Unable to find product details in the database',
      payload: null,
    };
  }
};

export { productModel };
