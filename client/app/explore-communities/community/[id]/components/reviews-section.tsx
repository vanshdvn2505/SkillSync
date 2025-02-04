"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, StarHalf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Review = {
  id: number
  user: string
  content: string
  rating: number
  timestamp: string
}

const initialReviews: Review[] = [
  {
    id: 1,
    user: "Alice",
    content: "Great community! Learned a lot from the React workshops.",
    rating: 5,
    timestamp: "2 days ago",
  },
  {
    id: 2,
    user: "Bob",
    content: "The resources shared here are top-notch. Highly recommended!",
    rating: 4.5,
    timestamp: "1 week ago",
  },
  {
    id: 3,
    user: "Charlie",
    content: "Good community, but could use more advanced topics.",
    rating: 4,
    timestamp: "2 weeks ago",
  },
]

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [newReview, setNewReview] = useState({ content: "", rating: 0 })

  const handleAddReview = () => {
    if (newReview.content.trim() && newReview.rating > 0) {
      const review: Review = {
        id: Date.now(),
        user: "You",
        content: newReview.content.trim(),
        rating: newReview.rating,
        timestamp: "Just now",
      }
      setReviews([review, ...reviews])
      setNewReview({ content: "", rating: 0 })
    }
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
      } else if (i - 0.5 <= rating) {
        stars.push(<StarHalf key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />)
      }
    }
    return stars
  }

  return (
    <Card className="bg-foreground border-none text-primary-foreground">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold mb-4">Community Reviews</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex space-x-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  size={"icon"}
                  key={star}
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className={`focus:outline-none bg-transparent hover:bg-transparent ${newReview.rating >= star ? "text-yellow-400" : "text-muted"}`}
                >
                  <Star className="w-6 h-6" />
                </Button>
              ))}
            </div>
            <Textarea
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
              placeholder="Write your review..."
              rows={3}
            />
            <Button onClick={handleAddReview}>Submit Review</Button>
          </div>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 bg-popover shadow-lg rounded-md">
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.user}`} />
                    <AvatarFallback>{review.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{review.user}</h3>
                      <span className="text-sm text-muted">{review.timestamp}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-muted">{review.rating.toFixed(1)}</span>
                    </div>
                    <p className="mt-2">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

