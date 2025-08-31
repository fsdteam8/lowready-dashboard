// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Star, Send } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Textarea } from "@/components/ui/textarea"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { toast } from 'sonner';

// interface ReviewFormProps {
//   facilityId?: string
//   facilityName?: string
//   onSubmit?: (review: any) => void
// }

// export function ReviewForm({ facilityId, facilityName, onSubmit }: ReviewFormProps) {
//   const [rating, setRating] = useState(0)
//   const [hoveredRating, setHoveredRating] = useState(0)
//   const [comment, setComment] = useState("")
//   const [customerName, setCustomerName] = useState("")
//   const [location, setLocation] = useState("")
//   const [selectedFacility, setSelectedFacility] = useState(facilityName || "")
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (rating === 0) {
//       toast({
//         title: "Rating Required",
//         description: "Please select a rating before submitting your review.",
//         variant: "destructive",
//       })
//       return
//     }

//     if (!comment.trim()) {
//       toast.warning("Please write a comment about your experience")
//       return
//     }

//     setIsSubmitting(true)

//     try {
//       const newReview = {
//         id: `review-${Date.now()}`,
//         customerName: customerName || "Anonymous",
//         customerAvatar: "/placeholder.svg",
//         rating,
//         comment: comment.trim(),
//         location: location || "Unknown Location",
//         date: "Just now",
//         facilityName: selectedFacility || "Unknown Facility",
//       }

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       onSubmit?.(newReview)

//       toast("Thank you for your feedback! Your review has been submitted successfully")

//       // Reset form
//       setRating(0)
//       setComment("")
//       setCustomerName("")
//       setLocation("")
//       if (!facilityName) setSelectedFacility("")
//     } catch (error) {
//       toast.warning("There was an error submitting your review. Please try again.")
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2">
//           <Star className="h-5 w-5 text-yellow-400" />
//           Write a Review
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="customerName">Your Name</Label>
//               <Input
//                 id="customerName"
//                 value={customerName}
//                 onChange={(e) => setCustomerName(e.target.value)}
//                 placeholder="Enter your name"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="location">Location</Label>
//               <Input
//                 id="location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 placeholder="City, State"
//               />
//             </div>
//           </div>

//           {!facilityName && (
//             <div className="space-y-2">
//               <Label htmlFor="facility">Facility</Label>
//               <Select value={selectedFacility} onValueChange={setSelectedFacility}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a facility" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Sunny Hills Assisted Living">Sunny Hills Assisted Living</SelectItem>
//                   <SelectItem value="Golden Years Care">Golden Years Care</SelectItem>
//                   <SelectItem value="Comfort Living Center">Comfort Living Center</SelectItem>
//                   <SelectItem value="Peaceful Gardens">Peaceful Gardens</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label>Rating</Label>
//             <div className="flex items-center gap-1">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <button
//                   key={i}
//                   type="button"
//                   className="focus:outline-none"
//                   onMouseEnter={() => setHoveredRating(i + 1)}
//                   onMouseLeave={() => setHoveredRating(0)}
//                   onClick={() => setRating(i + 1)}
//                 >
//                   <Star
//                     className={`h-6 w-6 transition-colors ${
//                       i < (hoveredRating || rating)
//                         ? "fill-yellow-400 text-yellow-400"
//                         : "text-gray-300 hover:text-yellow-300"
//                     }`}
//                   />
//                 </button>
//               ))}
//               <span className="ml-2 text-sm text-gray-600">
//                 {rating > 0 && (
//                   <>
//                     {rating} star{rating !== 1 ? "s" : ""}
//                     {rating === 5 && " - Excellent!"}
//                     {rating === 4 && " - Very Good"}
//                     {rating === 3 && " - Good"}
//                     {rating === 2 && " - Fair"}
//                     {rating === 1 && " - Poor"}
//                   </>
//                 )}
//               </span>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="comment">Your Review</Label>
//             <Textarea
//               id="comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Share your experience with this facility..."
//               rows={4}
//               className="resize-none"
//             />
//             <div className="text-xs text-gray-500 text-right">{comment.length}/500 characters</div>
//           </div>

//           <Button type="submit" disabled={isSubmitting || rating === 0 || !comment.trim()} className="w-full">
//             {isSubmitting ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <Send className="h-4 w-4 mr-2" />
//                 Submit Review
//               </>
//             )}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   )
// }
