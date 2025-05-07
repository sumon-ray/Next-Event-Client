'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is your typical response time?",
    answer: "We typically respond to all inquiries within 24-48 business hours.",
  },
  {
    question: "Do you offer emergency support?",
    answer: "Yes, for urgent matters, please call our support hotline available 24/7.",
  },
  {
    question: "Can I schedule a meeting with your team?",
    answer: "You can request a meeting through our contact form or call us directly.",
  },
  {
    question: "Do you provide international support?",
    answer: "Yes, we offer support globally with teams across different time zones.",
  },
];

export default function FAQCarousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % faqs.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + faqs.length) % faqs.length);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600">Find quick answers to common questions about contacting us</p>
        </motion.div>

        <div className="max-w-2xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{faqs[index].question}</h3>
              <p className="text-gray-600">{faqs[index].answer}</p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-6 gap-4">
            <Button variant="outline" onClick={prevSlide}>Previous</Button>
            <Button onClick={nextSlide}>Next</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
