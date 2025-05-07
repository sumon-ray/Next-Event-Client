// "use client"

// import { motion } from "framer-motion"
// import type { ReactNode } from "react"
// import { Card, CardContent } from "@/components/ui/card"

// interface ContactInfoProps {
//   icon: ReactNode
//   title: string
//   details: string[]
//   color: string
//   delay?: number
// }

// export default function ContactInfo({ icon, title, details, color, delay = 0 }: ContactInfoProps) {
//   return (
//     <Card className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
//       <CardContent className="p-6">
//         <div className="flex items-center mb-4">
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{
//               type: "spring",
//               stiffness: 260,
//               damping: 20,
//               delay: delay,
//             }}
//             whileHover={{
//               scale: 1.1,
//               rotate: 5,
//               transition: { duration: 0.2 },
//             }}
//             className={`bg-${color}-100 w-12 h-12 rounded-full flex items-center justify-center`}
//           >
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.3, delay: delay + 0.2 }}
//               className={`text-${color}-600`}
//             >
//               {icon}
//             </motion.div>
//           </motion.div>
//           <h3 className="ml-4 text-lg font-semibold text-gray-900">{title}</h3>
//         </div>

//         <div className="space-y-2 ml-16">
//           {details.map((detail, index) => (
//             <motion.p
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: delay + 0.3 + index * 0.1 }}
//               className="text-gray-600"
//             >
//               {detail}
//             </motion.p>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
