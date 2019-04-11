import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "config";

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
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
    maxlength: 200
  },
  phone: {
    type: String,
    required: true,
    min: 5,
    max: 20
  }
});

customerSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this.id }, config.get("jwtPrivateKey"));
  return token;
};

const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(80)
      .required(),
    email: Joi.string()
      .min(8)
      .max(100),
    password: Joi.string()
      .min(6)
      .max(200),
    phone: Joi.string()
      .min(5)
      .max(20)
      .required()
  };

  return Joi.validate(customer, schema);
}

export { Customer, validateCustomer };
