"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Smile, Mic, Send, Paperclip, Play, StopCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import EmojiPicker, { Theme, type EmojiClickData } from "emoji-picker-react"
import { ChatMessage } from "@/types/chat"
import { User } from "@/types/user"
import { useMutation } from "@apollo/client"
import { SEND_CHAT_MESSAGE } from "@/graphql/mutations/chatMutations"


export function ChatSection({ chat, user, communityId } : { chat : ChatMessage[], user : User, communityId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>(chat)  
  const [newMessage, setNewMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    setMessages(chat)
  }, [chat])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const [sendMessage] = useMutation(SEND_CHAT_MESSAGE)

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return

    try {
      await sendMessage({
        variables: { content: newMessage.trim(), senderId: user.id, communityId },
      })
      setNewMessage("")
    } catch (error) {
      console.error("Error Sending Message ", error)
    }
  }

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setNewMessage((prevMessage) => prevMessage + emojiData.emoji)
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    // Start recording logic here
  }

  // const handleStopRecording = () => {
  //   setIsRecording(false)
  //   setRecordingTime(0)
  //   // Stop recording and send voice message logic here
  //   const voiceMessage: Message = {
  //     id: messages.length + 1,
  //     user: "You",
  //     content: "/voice-message-placeholder.mp3", // Replace with actual recorded audio file
  //     timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  //     type: "voice",
  //   }
  //   setMessages([...messages, voiceMessage])
  // }

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  return (
    <Card className="bg-foreground text-primary-foreground border-none">
        <CardContent className="pt-6">
            <div className="h-[600px] flex flex-col rounded-lg overflow-hidden">
                <ScrollArea className="flex-grow p-4 bg-foreground border-none outline-none" ref={scrollAreaRef}>
                    {messages.map((message) => (
                    <div key={message.id} className={`mb-4 last:mb-0 text-background ${message.sender.id === user.id ? "text-right" : ""}`}>
                        <div className={`flex items-start ${message.sender.id === user.id ? "justify-end" : ""}`}>
                        {message.sender.id !== user.id && (
                            <Avatar className="w-8 h-8 mr-2">
                            <AvatarImage src={message.sender.profileImageURL || "https://github.com/shadcn.png"} />
                            <AvatarFallback>{message.sender.profileImageURL || "https://github.com/shadcn.png" }</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={`rounded-lg p-3 text-primary-foreground ${message.sender.id === user.id ? "bg-secondary text-primary-foreground" : "bg-popover"}`}>
                            <div className="flex items-baseline mb-1">
                            <span className="font-semibold mr-2 text-primary-foreground">{message.sender.firstName}</span>
                            <span className="text-xs text-muted">{message.createdAt}</span>
                            </div>
                            {typeof message.content === "string" ? (
                            <p className="text-sm">{message.content}</p>
                            ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Play className="h-4 w-4" />
                                </Button>
                                <div className="h-1 bg-gray-300 rounded-full flex-grow">
                                <div className="h-1 bg-blue-500 rounded-full w-1/3"></div>
                                </div>
                                <span className="text-xs">0:30</span>
                            </div>
                            )}
                        </div>
                        {message.sender.id === user.id && (
                            <Avatar className="w-8 h-8 ml-2">
                            <AvatarImage src={message.sender.profileImageURL || "https://github.com/shadcn.png"} />
                            <AvatarFallback>{message.sender.profileImageURL || "https://github.com/shadcn.png"}</AvatarFallback>
                            </Avatar>
                        )}
                        </div>
                    </div>
                    ))}
                </ScrollArea>
                <div className="p-4 bg-foreground border-t-[1px] border-[#464646]">
                    <div className="flex items-center space-x-2">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9">
                            <Smile className="h-5 w-5" />
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 ml-5 border-none">
                            <EmojiPicker theme={Theme.DARK} className="border-none" onEmojiClick={handleEmojiClick} />
                        </PopoverContent>
                    </Popover>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                        <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow placeholder:text-muted"
                        onKeyDown ={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    {isRecording ? (
                        <div className="flex items-center space-x-2">
                        <span className="text-sm text-red-500">{recordingTime}s</span>
                        {/* <Button variant="destructive" size="icon" onClick={handleStopRecording}>
                            <StopCircle className="h-5 w-5" />
                        </Button> */}
                        </div>
                    ) : (
                        <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleStartRecording}>
                        <Mic className="h-5 w-5" />
                        </Button>
                    )}
                    <Button onClick={handleSendMessage}>
                        <Send className="h-5 w-5" />
                    </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
   
  )
}

