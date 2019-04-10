import mongoose from "mongoose";
import Joi from "joi";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 80
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 100
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50
  },
  phone: {
    type: String,
    required: true,
    min: 5,
    max: 20
  }
});

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(6)
      .max(80)
      .required(),
    email: Joi.string()
      .min(8)
      .max(100),
    password: Joi.string()
      .min(6)
      .max(50),
    phone: Joi.string()
      .min(5)
      .max(20)
      .required()
  };

  return Joi.validate(customer, schema);
}

export { Customer, validateCustomer };
