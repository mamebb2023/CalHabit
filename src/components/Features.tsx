"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "bx bx-calendar-check",
    title: "Track Daily Habits",
    description:
      "Mark your habits daily and build consistency with our intuitive calendar view.",
  },
  {
    icon: "bx bx-trophy",
    title: "Achieve Goals",
    description:
      "Set goals and track your progress with visual indicators and statistics.",
  },
  {
    icon: "bx bx-bar-chart-alt-2",
    title: "View Analytics",
    description:
      "Get insights into your habit patterns with detailed analytics and reports.",
  },
  {
    icon: "bx bx-bell",
    title: "Stay Reminded",
    description:
      "Never miss a habit with customizable reminders and notifications.",
  },
  {
    icon: "bx bx-lock",
    title: "Secure & Private",
    description:
      "Your data is encrypted and secure. Your habits, your privacy.",
  },
  {
    icon: "bx bx-devices",
    title: "Cross-Platform",
    description: "Access your habits anywhere, anytime, on any device.",
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="relative px-6 md:px-12 lg:px-20 xl:px-32 py-20"
    >
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500">
              Everything You Need
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you build and maintain your habits
            effectively
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-cyan-500/50 hover:shadow-xl transition-all hover:scale-110 group"
            >
              <div className="text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-500">
                <i className={feature.icon}></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-indigo-500 transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
