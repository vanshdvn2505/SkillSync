export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImageURL?: string;
    bio?: string;
    role: "Mentor" | "Leanrer";
    createdAt: string;
    updatedAt: string;
  }
  