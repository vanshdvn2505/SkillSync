"use client";
import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New message from John Doe",
      description: "Hey, how are you doing?",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "System Update",
      description: "Your account settings have been updated",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 3,
      title: "New follower",
      description: "Jane Smith started following you",
      time: "1 day ago",
      read: false,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add more notifications
    const newNotifications = [
      {
        id: notifications.length + 1,
        title: `Notification ${notifications.length + 1}`,
        description: "New notification content",
        time: "2 days ago",
        read: false,
      },
      {
        id: notifications.length + 2,
        title: `Notification ${notifications.length + 2}`,
        description: "New notification content",
        time: "2 days ago",
        read: true,
      },
    ];

    setNotifications((prev) => [...prev, ...newNotifications]);
    setLoading(false);

    // Stop infinite scroll after certain amount of notifications
    if (notifications.length > 20) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [notifications.length, hasMore]);

  const markAsRead = (id: any) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: any) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <Navbar />
      <div className="min-h-screen bg-background text-foreground p-4">
        <div className="mx-auto lg:w-3/4 w-full ">
          <div className="flex justify-between text-primary-foreground items-center mb-6">
            <h1 className="text-2xl font-bold">Notifications</h1>
            <Bell className="h-6 w-6 mt-2" />
          </div>

          <div className="space-y-4 no-scrollbar bg-foreground w-full p-4 rounded-md">
            {notifications.map((notification, index) => (
              <Card
                key={index}
                className={`bg-popover border-none`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="font-semibold text-primary-foreground">
                        {notification.title}
                      </h2>
                      <p
                        className={`text-muted mt-1`}
                      >
                        {notification.description}
                      </p>
                      <p
                        className={`text-muted-foreground mt-1`}
                      >
                        {notification.time}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      {!notification.read && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                          className="text-primary-foreground bg-primary"
                        >
                          Mark as read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                        className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div ref={observerTarget} className="h-4" />

            {loading && (
              <div className="text-center py-4 text-muted-foreground">
                Loading more notifications...
              </div>
            )}

            {!hasMore && notifications.length > 0 && (
              <div className="text-center py-4 text-muted-foreground">
                No more notifications
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
