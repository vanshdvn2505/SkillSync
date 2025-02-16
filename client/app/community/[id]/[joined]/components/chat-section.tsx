"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Smile, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import EmojiPicker, { Theme, type EmojiClickData } from "emoji-picker-react";
import { ChatMessage } from "@/types/chat";
import { User } from "@/types/user";
import { useMutation } from "@apollo/client";
import { SEND_CHAT_MESSAGE } from "@/graphql/mutations/chatMutations";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function ChatSection({
  chat,
  user,
  communityId,
}: {
  chat: ChatMessage[];
  user: User;
  communityId: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(chat);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(chat);
  }, [chat]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const [sendMessage] = useMutation(SEND_CHAT_MESSAGE);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      await sendMessage({
        variables: {
          content: newMessage.trim(),
          senderId: user.id,
          communityId,
        },
      });
      const audio = new Audio("/sounds/send.mp3");
      audio.play();
      setNewMessage("");
    } catch (error) {
      console.error("Error Sending Message ", error);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  return (
    <Card className="bg-foreground text-primary-foreground border-none">
      <CardContent className="pt-6">
        <div className="h-[600px] flex flex-col rounded-lg overflow-hidden">
          <ScrollArea
            className="flex-grow p-4 bg-foreground border-none outline-none scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
            ref={scrollAreaRef}
          >
            {messages.map((message, index) => {
              const isCurrentUser = message.sender.id === user.id;

              return (
                <div key={message.id} className="mb-2 text-background">
                  <div
                    className={`flex items-start group ${
                      isCurrentUser ? "justify-end" : ""
                    }`}
                  >
                    {!isCurrentUser && (
                      <Avatar className="w-8 h-8 mr-2">
                        <AvatarImage
                          src={
                            message.sender.profileImageURL ||
                            "https://github.com/shadcn.png"
                          }
                        />
                        <AvatarFallback>
                          {message.sender.firstName[0]}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="relative flex items-center">
                      <div
                        className={`rounded-lg p-3 text-primary-foreground max-w-xs md:max-w-md ${
                          isCurrentUser
                            ? "bg-gradient-to-r border border-primary/10 from-primary/70 to-secondary/40 text-accent backdrop-blur-xl bg-opacity-10 shadow-lg"
                            : "bg-white/20 backdrop-blur-lg shadow-lg"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>

                    {isCurrentUser && (
                      <Avatar className="w-8 h-8 ml-2">
                        <AvatarImage
                          src={
                            message.sender.profileImageURL ||
                            "https://github.com/shadcn.png"
                          }
                        />
                        <AvatarFallback>
                          {message.sender.firstName[0]}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              );
            })}
          </ScrollArea>

          {/* Custom Chat Input Box */}
          <div className="p-4 bg-foreground border-t-[1px] border-[#464646] w-full">
            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-[50px] w-[50px] rounded-full hover:scale-105 active:scale-95 hover:bg-gradient-to-r from-primary to-secondary"
                  >
                    <Smile className="h-7 w-7 text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 ml-5 border-none">
                  <EmojiPicker
                    theme={Theme.DARK}
                    className="border-none"
                    onEmojiClick={handleEmojiClick}
                  />
                </PopoverContent>
              </Popover>

              {/* Cool Input */}
              <div className="w-full flex items-center space-x-4">
                <div className="relative w-full">
                  {/* Label (Positioned inside the input field) */}
                  <label
                    htmlFor="chatInput"
                    className="absolute text-xs font-bold text-primary top-[-8px] left-[12px] bg-foreground px-1"
                  >
                    Message:
                  </label>

                  {/* Input Field */}
                  <input
                    type="text"
                    id="chatInput"
                    placeholder="Write here..."
                    className="w-full h-[44px] px-3 border-2 border-primary/50 rounded-md bg-foreground text-white focus:outline-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                </div>

                {/* Send Button (Aligned with Input) */}
                <Button
                  className="h-[50px] w-[50px] rounded-full bg-transparent flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
                  onClick={handleSendMessage}
                >
                  <Send className="h-7 w-7 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
