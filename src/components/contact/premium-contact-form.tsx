"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, XCircle, Loader2, AlertCircle, User, Mail, MessageSquare, Phone, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Form validation schema with sophisticated validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(5, { message: "Email address is too short" })
    .max(100, { message: "Email address is too long" }),

  phone: z
    .string()
    .min(7, { message: "Phone number is too short" })
    .max(20, { message: "Phone number is too long" })
    .optional()
    .or(z.literal("")),

  subject: z
    .string()
    .min(3, { message: "Subject must be at least 3 characters" })
    .max(100, { message: "Subject cannot exceed 100 characters" }),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message cannot exceed 1000 characters" }),
})

type FormValues = z.infer<typeof formSchema>

export default function PremiumContactForm() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [activeTab, setActiveTab] = useState<string>("general")
  const formRef = useRef<HTMLDivElement>(null)

  // Form setup with real-time validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    mode: "onChange", // Enable real-time validation
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
    watch,
  } = form

  // Track message length for character count
  const messageValue = watch("message")
  const messageLength = messageValue?.length || 0

  async function onSubmit(data: FormValues) {
    setFormStatus("submitting")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Form submitted:", data)

      setFormStatus("success")

      // Reset form after showing success message
      setTimeout(() => {
        reset()
        setFormStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus("error")

      // Reset error state after delay
      setTimeout(() => {
        setFormStatus("idle")
      }, 3000)
    }
  }

  return (
    <div className="relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto"
      >
        <div ref={formRef} className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4  text-[#3159c4]"
          >
            Get in Touch With Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Have questions or need assistance? Our team is ready to help you with any inquiries.
          </motion.p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md overflow-hidden">
          <CardContent className="p-0">
            <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b">
                <TabsList className="w-full justify-start rounded-none bg-transparent border-b p-0">
                  <TabsTrigger
                    value="general"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 px-6 py-3"
                  >
                    General Inquiry
                  </TabsTrigger>
                  <TabsTrigger
                    value="support"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 px-6 py-3"
                  >
                    Technical Support
                  </TabsTrigger>
                  <TabsTrigger
                    value="sales"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 px-6 py-3"
                  >
                    Sales
                  </TabsTrigger>
                </TabsList>
              </div>

              <AnimatePresence mode="wait">
                {/* Success message */}
                {formStatus === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="p-12 flex flex-col items-center text-center"
                  >
                    <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                    <p className="text-green-700 mb-4 max-w-md">
                      Thank you for reaching out! We've received your message and will get back to you as soon as
                      possible.
                    </p>
                    <p className="text-green-600 text-sm">You'll receive a confirmation email shortly.</p>
                  </motion.div>
                )}

                {/* Error message */}
                {formStatus === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="p-12 flex flex-col items-center text-center"
                  >
                    <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
                      <XCircle className="h-12 w-12 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-red-800 mb-2">Something Went Wrong</h3>
                    <p className="text-red-700 mb-4 max-w-md">
                      We couldn't send your message. Please try again or contact us directly.
                    </p>
                    <Button onClick={() => setFormStatus("idle")} className="bg-red-600 hover:bg-red-700">
                      Try Again
                    </Button>
                  </motion.div>
                )}

                {/* Form content */}
                {(formStatus === "idle" || formStatus === "submitting") && (
                  <>
                    <TabsContent value="general" className="m-0">
                      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Name field */}
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-slate-700 flex items-center">
                              <User className="h-4 w-4 mr-2 text-slate-400" />
                              Full Name
                            </label>
                            <div className="relative">
                              <input
                                {...register("name")}
                                id="name"
                                type="text"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                  errors.name
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
                                } focus:outline-none focus:ring-4 transition-all`}
                                placeholder="John Doe"
                              />
                              {dirtyFields.name && !errors.name && (
                                <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-green-500" />
                              )}
                              {errors.name && (
                                <div className="flex items-center mt-1 text-red-500 text-sm">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  <span>{errors.name.message}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Email field */}
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center">
                              <Mail className="h-4 w-4 mr-2 text-slate-400" />
                              Email Address
                            </label>
                            <div className="relative">
                              <input
                                {...register("email")}
                                id="email"
                                type="email"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                  errors.email
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
                                } focus:outline-none focus:ring-4 transition-all`}
                                placeholder="you@example.com"
                              />
                              {dirtyFields.email && !errors.email && (
                                <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-green-500" />
                              )}
                              {errors.email && (
                                <div className="flex items-center mt-1 text-red-500 text-sm">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  <span>{errors.email.message}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Phone field */}
                          <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center">
                              <Phone className="h-4 w-4 mr-2 text-slate-400" />
                              Phone Number (Optional)
                            </label>
                            <div className="relative">
                              <input
                                {...register("phone")}
                                id="phone"
                                type="tel"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                  errors.phone
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
                                } focus:outline-none focus:ring-4 transition-all`}
                                placeholder="+1 (555) 123-4567"
                              />
                              {dirtyFields.phone && !errors.phone && (
                                <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-green-500" />
                              )}
                              {errors.phone && (
                                <div className="flex items-center mt-1 text-red-500 text-sm">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  <span>{errors.phone.message}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Subject field */}
                          <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium text-slate-700 flex items-center">
                              <Tag className="h-4 w-4 mr-2 text-slate-400" />
                              Subject
                            </label>
                            <div className="relative">
                              <input
                                {...register("subject")}
                                id="subject"
                                type="text"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                  errors.subject
                                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                    : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
                                } focus:outline-none focus:ring-4 transition-all`}
                                placeholder="How can we help you?"
                              />
                              {dirtyFields.subject && !errors.subject && (
                                <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-green-500" />
                              )}
                              {errors.subject && (
                                <div className="flex items-center mt-1 text-red-500 text-sm">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  <span>{errors.subject.message}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Message field */}
                        <div className="space-y-2 mb-6">
                          <label htmlFor="message" className="text-sm font-medium text-slate-700 flex items-center">
                            <MessageSquare className="h-4 w-4 mr-2 text-slate-400" />
                            Your Message
                          </label>
                          <div className="relative">
                            <textarea
                              {...register("message")}
                              id="message"
                              rows={6}
                              className={`w-full px-4 py-3 rounded-lg border ${
                                errors.message
                                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                                  : "border-slate-200 focus:border-blue-500 focus:ring-blue-200"
                              } focus:outline-none focus:ring-4 transition-all resize-none`}
                              placeholder="Tell us about your inquiry..."
                            ></textarea>
                            {dirtyFields.message && !errors.message && (
                              <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-green-500" />
                            )}
                            {errors.message ? (
                              <div className="flex items-center mt-1 text-red-500 text-sm">
                                <AlertCircle className="h-4 w-4 mr-1" />
                                <span>{errors.message.message}</span>
                              </div>
                            ) : (
                              <div className="flex justify-end mt-1 text-sm text-slate-500">
                                <span>{messageLength}/1000 characters</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Submit button */}
                        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                          {/* <Button
                            type="submit"
                            disabled={!isValid || formStatus === "submitting"}
                            className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-medium"
                          >
                            {formStatus === "submitting" ? (
                              <div className="flex items-center">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Sending Message...
                              </div>
                            ) : (
                              <div className="flex items-center">
                                <Send className="mr-2 h-5 w-5" />
                                Send Message
                              </div>
                            )}
                          </Button> */}

                             <Button
                              className="w-full h-12 font-medium text-white nextButton "
                              type="submit"
                              // disabled={!isValid || formStatus === "submitting"}

                            >
                            {formStatus === "submitting"  ? (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-center"
                                >
                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                  Sending Message...
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="flex items-center justify-center"
                                >
                                 Update password
                                </motion.div>
                              )}
                            </Button>
                        </motion.div>
                      </form>
                    </TabsContent>

                    <TabsContent value="support" className="m-0">
                      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                        {/* Similar form fields as general but with support-specific placeholders */}
                        <div className="text-center pb-6">
                          <p className="text-blue-600 font-medium">Technical Support Request</p>
                          <p className="text-slate-500 text-sm">Our support team will respond within 24 hours</p>
                        </div>

                        {/* Same form fields structure as general tab but with different default values */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Name field */}
                          <div className="space-y-2">
                            <label
                              htmlFor="support-name"
                              className="text-sm font-medium text-slate-700 flex items-center"
                            >
                              <User className="h-4 w-4 mr-2 text-slate-400" />
                              Full Name
                            </label>
                            <input
                              {...register("name")}
                              id="support-name"
                              type="text"
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all"
                              placeholder="John Doe"
                            />
                          </div>

                          {/* Email field */}
                          <div className="space-y-2">
                            <label
                              htmlFor="support-email"
                              className="text-sm font-medium text-slate-700 flex items-center"
                            >
                              <Mail className="h-4 w-4 mr-2 text-slate-400" />
                              Email Address
                            </label>
                            <input
                              {...register("email")}
                              id="support-email"
                              type="email"
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="support-subject"
                            className="text-sm font-medium text-slate-700 flex items-center"
                          >
                            <Tag className="h-4 w-4 mr-2 text-slate-400" />
                            Issue Type
                          </label>
                          <select
                            {...register("subject")}
                            id="support-subject"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all"
                          >
                            <option value="Technical Issue">Technical Issue</option>
                            <option value="Account Access">Account Access</option>
                            <option value="Billing Question">Billing Question</option>
                            <option value="Feature Request">Feature Request</option>
                            <option value="Bug Report">Bug Report</option>
                          </select>
                        </div>

                        {/* Message field */}
                        <div className="space-y-2 mb-6">
                          <label
                            htmlFor="support-message"
                            className="text-sm font-medium text-slate-700 flex items-center"
                          >
                            <MessageSquare className="h-4 w-4 mr-2 text-slate-400" />
                            Issue Description
                          </label>
                          <textarea
                            {...register("message")}
                            id="support-message"
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all resize-none"
                            placeholder="Please describe the issue you're experiencing in detail..."
                          ></textarea>
                        </div>

                        {/* Submit button */}
                        <Button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-medium"
                        >
                          {formStatus === "submitting" ? (
                            <div className="flex items-center">
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Submitting Request...
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Send className="mr-2 h-5 w-5" />
                              Submit Support Request
                            </div>
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="sales" className="m-0">
                      <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                        <div className="text-center pb-6">
                          <p className="text-blue-600 font-medium">Sales Inquiry</p>
                          <p className="text-slate-500 text-sm">Our sales team will contact you within 24 hours</p>
                        </div>

                        {/* Sales-specific form fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Company name */}
                          <div className="space-y-2">
                            <label
                              htmlFor="sales-company"
                              className="text-sm font-medium text-slate-700 flex items-center"
                            >
                              <User className="h-4 w-4 mr-2 text-slate-400" />
                              Company Name
                            </label>
                            <input
                              id="sales-company"
                              type="text"
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all"
                              placeholder="Acme Inc."
                            />
                          </div>

                          {/* Name field */}
                          <div className="space-y-2">
                            <label
                              htmlFor="sales-name"
                              className="text-sm font-medium text-slate-700 flex items-center"
                            >
                              <User className="h-4 w-4 mr-2 text-slate-400" />
                              Your Name
                            </label>
                            <input
                              {...register("name")}
                              id="sales-name"
                              type="text"
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          {/* Email field */}
                          <div className="space-y-2">
                            <label
                              htmlFor="sales-email"
                              className="text-sm font-medium text-slate-700 flex items-center"
                            >
                              <Mail className="h-4 w-4 mr-2 text-slate-400" />
                              Business Email
                            </label>
                            <input
                              {...register("email")}
                              id="sales-email"
                              type="email"
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all"
                              placeholder="you@company.com"
                            />
                          </div>

                          {/* Phone field */}
                          <div className="space-y-2">
                            <label
                              htmlFor="sales-phone"
                              className="text-sm font-medium text-slate-700 flex items-center"
                            >
                              <Phone className="h-4 w-4 mr-2 text-slate-400" />
                              Phone Number
                            </label>
                            <input
                              {...register("phone")}
                              id="sales-phone"
                              type="tel"
                              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                        </div>

                        <div className="mb-6">
                          <label
                            htmlFor="sales-interest"
                            className="text-sm font-medium text-slate-700 flex items-center"
                          >
                            <Tag className="h-4 w-4 mr-2 text-slate-400" />
                            Interested In
                          </label>
                          <select
                            {...register("subject")}
                            id="sales-interest"
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all"
                          >
                            <option value="Enterprise Solution">Enterprise Solution</option>
                            <option value="Small Business Package">Small Business Package</option>
                            <option value="Custom Development">Custom Development</option>
                            <option value="Consultation">Consultation</option>
                            <option value="Partnership Opportunity">Partnership Opportunity</option>
                          </select>
                        </div>

                        {/* Message field */}
                        <div className="space-y-2 mb-6">
                          <label
                            htmlFor="sales-message"
                            className="text-sm font-medium text-slate-700 flex items-center"
                          >
                            <MessageSquare className="h-4 w-4 mr-2 text-slate-400" />
                            Additional Information
                          </label>
                          <textarea
                            {...register("message")}
                            id="sales-message"
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-blue-200 focus:outline-none focus:ring-4 transition-all resize-none"
                            placeholder="Tell us about your business needs and how we can help..."
                          ></textarea>
                        </div>

                        {/* Submit button */}
                        <Button
                          type="submit"
                          disabled={formStatus === "submitting"}
                          className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-medium"
                        >
                          {formStatus === "submitting" ? (
                            <div className="flex items-center">
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              Sending Inquiry...
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <Send className="mr-2 h-5 w-5" />
                              Submit Sales Inquiry
                            </div>
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </>
                )}
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
