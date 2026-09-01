import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../config/db.config.js";

import Customer from "../models/Customer.js";
import Mechanic from "../models/Mechanic.js";
import Booking from "../models/Booking.js";

const firstNames = [
  "Rahul",
  "Amit",
  "Priya",
  "Neha",
  "Arjun",
  "Rohan",
  "Ananya",
  "Vikram",
  "Pooja",
  "Karan",
];

const lastNames = [
  "Sharma",
  "Verma",
  "Singh",
  "Gupta",
  "Kumar",
  "Mehta",
  "Patel",
  "Malhotra",
  "Joshi",
  "Kapoor",
];

const vehicles = [
  "Honda City",
  "Maruti Swift",
  "Hyundai Creta",
  "Tata Nexon",
  "Toyota Fortuner",
  "Mahindra XUV700",
  "Honda Activa",
  "Royal Enfield Classic 350",
  "TVS Apache",
  "Bajaj Pulsar",
];

const services = [
  "Oil Change",
  "Brake Service",
  "AC Service",
  "Engine Repair",
  "Battery Replacement",
  "Tyre Replacement",
  "General Service",
];

const statuses = [
  "Pending",
  "Assigned",
  "Mechanic On The Way",
  "Completed",
  "Cancelled",
];

const getRandomItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateName = () => {
  return `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`;
};

const generateBookingDate = () => {
  const date = new Date();

  const daysAgo = getRandomNumber(0, 60);

  date.setDate(date.getDate() - daysAgo);

  date.setHours(
    getRandomNumber(8, 20),
    getRandomNumber(0, 59),
    0,
    0
  );

  return date;
};

const generateRegistrationNumber = () => {
  return `DL${getRandomNumber(1, 99)}${String.fromCharCode(
    65 + getRandomNumber(0, 25)
  )}${String.fromCharCode(
    65 + getRandomNumber(0, 25)
  )}${getRandomNumber(1000, 9999)}`;
};

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log("Connected to MongoDB");

    // Clear existing data
    await Customer.deleteMany({});
    await Mechanic.deleteMany({});
    await Booking.deleteMany({});

    console.log("Existing data cleared");

    // Create Customers
    const customers = [];

    for (let i = 1; i <= 50; i++) {
      customers.push({
        name: generateName(),
        email: `customer${i}@example.com`,
        phone: `98${getRandomNumber(10000000, 99999999)}`,
        address: "Delhi",
      });
    }

    const createdCustomers = await Customer.insertMany(customers);

    console.log(`${createdCustomers.length} customers created`);

    // Create Mechanics
    const mechanics = [];

    for (let i = 1; i <= 20; i++) {
      mechanics.push({
        name: `Mechanic ${i}`,
        status: getRandomItem([
          "Available",
          "Busy",
          "On The Way",
          "Offline",
        ]),
        jobsCompleted: getRandomNumber(20, 300),
        currentBooking: null,
      });
    }

    const createdMechanics = await Mechanic.insertMany(mechanics);

    console.log(`${createdMechanics.length} mechanics created`);

    // Create Bookings
    const bookings = [];

    for (let i = 1; i <= 500; i++) {
      const status = getRandomItem(statuses);

      const mechanic =
        status === "Pending" || status === "Cancelled"
          ? null
          : getRandomItem(createdMechanics)._id;

      bookings.push({
        bookingId: `BK${String(i).padStart(4, "0")}`,

        customer: getRandomItem(createdCustomers)._id,

        vehicle: getRandomItem(vehicles),

        registrationNumber: generateRegistrationNumber(),

        service: getRandomItem(services),

        mechanic,

        status,

        amount: getRandomNumber(500, 5000),

        bookingDate: generateBookingDate(),
      });
    }

    const createdBookings = await Booking.insertMany(bookings);

    console.log(`${createdBookings.length} bookings created`);

    console.log("Database seeded successfully!");

    await mongoose.connection.close();

    console.log("MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedDatabase();