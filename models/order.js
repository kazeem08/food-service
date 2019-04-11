import mongoose from "mongoose";
import Joi from "joi";

const orderSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true, minlength: 6, maxlength: 80 },
      phone: {
        type: Number,
        required: true,
        min: 5,
        max: 20
      }
    })
  },
  food: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true
      }
    })
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    default: "Pending"
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

function validateOrder(order) {
  const schema = {
    customerId: Joi.string().required(),
    foodId: Joi.string().required(),
    quantity: Joi.number()
      .min(1)
      .required()
  };
  return Joi.validate(order, schema);
}

export { Order, validateOrder };
