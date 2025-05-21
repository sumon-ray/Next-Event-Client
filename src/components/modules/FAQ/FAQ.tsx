import React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Title from '@/components/shared/Title';
const FAQ = () => {
    const faqs = [
        {
          question: "What types of events do you specialize in?",
          answer:
            "We specialize in a wide range of events including weddings, corporate functions, social gatherings, graduation ceremonies, concerts, and holiday celebrations. Our experienced team can handle events of any size, from intimate gatherings to large-scale productions.",
        },
        {
          question: "How far in advance should I book?",
          answer:
            "For most events, we recommend booking 6-12 months in advance, especially for weddings and large corporate events. However, we understand that sometimes events need to be planned on shorter notice, and we'll do our best to accommodate your timeline.",
        },
        {
          question: "Do you offer customizable packages?",
          answer:
            "Yes, all our event packages are fully customizable to meet your specific needs and budget. We offer everything from full-service planning to day-of coordination, and we can tailor our services to include exactly what you need.",
        },
        {
          question: "What is your pricing structure?",
          answer:
            "Our pricing varies depending on the type of event, number of guests, services required, and season. We provide transparent quotes with no hidden fees. Contact us for a personalized quote based on your event details.",
        },
        {
          question: "Do you handle venue selection?",
          answer:
            "Yes, we have partnerships with a wide variety of venues and can help you find the perfect location for your event. We consider your budget, guest count, theme, and preferences to recommend venues that match your vision.",
        },
      ]
    return (
        <div className="container px-4 mx-auto mt-40 border-2 rounded-md md:px-6">
        <div className="py-16 text-center">
          <div className="inline-flex items-center px-3 py-2 mb-4 text-sm font-medium bg-[#1E3A8A] text-white rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-600 mr-2"></div>
            FEATURED FAQS
          </div>
         <Title title='Addressing Common Questions For Our Events '/>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Find answers to frequently asked questions about our event planning services, process, and what to expect
            when working with us.
          </p>
        </div>

        <Accordion type="single"  collapsible className="w-full pb-16">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger   className="p-4 no-underline duration-500 hover:scale-[1.01] hover:cursor-pointer ease-in-out  border border-gray-100 shadow-md border-t-1 rounded-xl bg-gradient-to-r from-white to-blue-300  decoration-transparent text-xl">{faq.question}</AccordionTrigger>
              <AccordionContent className="px-4 my-2 text-lg text-gray-600">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    );
};

export default FAQ;