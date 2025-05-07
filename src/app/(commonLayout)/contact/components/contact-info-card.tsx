// "use client"

// import { motion } from "framer-motion"
// import type { ReactNode } from "react"
// import { Card, CardContent } from "@/components/ui/card"
// import { ArrowRight } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface ContactInfoCardProps {
//   icon: ReactNode
//   title: string
//   details: string[]
//   color: string
//   action: string
//   actionLabel: string
//   delay?: number
// }

// export default function ContactInfoCard({
//   icon,
//   title,
//   details,
//   color,
//   action,
//   actionLabel,
//   delay = 0,
// }: ContactInfoCardProps) {
//   // Map color strings to Tailwind classes to avoid dynamic class name issues
//   const colorMap: Record<string, { bg: string; text: string; border: string }> = {
//     blue: { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-600" },
//     indigo: { bg: "bg-indigo-100", text: "text-indigo-600", border: "border-indigo-600" },
//     purple: { bg: "bg-purple-100", text: "text-purple-600", border: "border-purple-600" },
//     rose: { bg: "bg-rose-100", text: "text-rose-600", border: "border-rose-600" },
//   }

//   const colorClasses = colorMap[color] || colorMap.blue

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay }}
//       viewport={{ once: true, amount: 0.3 }}
//       whileHover={{ y: -5 }} // Reduced movement for better performance
//     >
//       <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 h-full overflow-hidden group">
//         <CardContent className="p-0">
//           <div
//             className={cn(
//               "h-2 w-full transform origin-left transition-all duration-300 group-hover:scale-x-110",
//               colorClasses.bg,
//             )}
//           ></div>
//           <div className="p-6">
//             <div className="flex items-center mb-4">
//               <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", colorClasses.bg)}>
//                 <div className={colorClasses.text}>{icon}</div>
//               </div>
//               <h3 className="ml-4 text-lg font-semibold text-gray-900">{title}</h3>
//             </div>

//             <div className="space-y-2 mb-6">
//               {details.map((detail, index) => (
//                 <p key={index} className="text-gray-600">
//                   {detail}
//                 </p>
//               ))}
//             </div>

//             <a
//               href={action}
//               className={cn(
//                 "inline-flex items-center font-medium hover:underline transition-transform duration-300",
//                 colorClasses.text,
//               )}
//             >
//               {actionLabel}
//               <ArrowRight className="ml-1 h-4 w-4" />
//             </a>
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }
