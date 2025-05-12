"use client";

import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";

export default function FaqSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge className="mb-4 bg-amber-100 text-amber-700 hover:bg-amber-100">
            Help Center
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-700">
            Answers to common questions about our platform
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                How do I create my first event?
              </h3>
              <p className="text-gray-700">
                After registering and logging in, navigate to your dashboard and
                click Fill out the event details, set visibility
                (public/private), add an optional fee, and publish! Our
                intuitive interface will guide you through each step of the
                process.
              </p>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                What payment methods do you support?
              </h3>
              <p className="text-gray-700">
                We support major credit/debit cards, digital wallets, and local
                payment methods through our integrated payment gateway. All
                transactions are secure and encrypted with industry-standard
                protocols to protect your financial information.
              </p>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                How do I manage participant requests?
              </h3>
              <p className="text-gray-700">
                As an event organizer, you will receive notifications for join
                requests. From your event dashboard, you can approve or reject
                requests, ban participants if needed, and send direct
                invitations. Our system automatically handles payment
                verification for paid events.
              </p>
            </motion.div>

            {/* FAQ Item 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                What is the difference between public and private events?
              </h3>
              <p className="text-gray-700">
                Public events are visible to everyone, while private events
                require approval to join. Both types can be free or paid, with
                different joining workflows. Public free events allow instant
                joining, while private or paid events require approval after
                payment (if applicable).
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
