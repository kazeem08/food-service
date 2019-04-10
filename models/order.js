import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: { type: String, required: true, minlength: 6, maxlength: 80 },
      email: {
        type: String,
        required: true
      },
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
    required: true
  }
});

const Order = mongoose.modell("Order", orderSchema);
