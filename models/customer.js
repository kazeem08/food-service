import mongoose from "mongoose";

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

const Customer = mongoose.modell("Customer", customerSchema);
