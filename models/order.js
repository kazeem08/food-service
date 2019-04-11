import mongoose from "mongoose";
import Joi from "joi";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200
  },
  price: {
    type: Number,
    required: true,
    min: 10
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
});

const orderSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true, minlength: 6, maxlength: 80 },
      phone: {
        type: String,
        required: true,
        min: 5,
        max: 20
      }
    })
  },
  food: {
    type: [foodSchema]
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
    food: Joi.array().required(),
    status: Joi.string()
  };
  return Joi.validate(order, schema);
}

export { Order, validateOrder };
