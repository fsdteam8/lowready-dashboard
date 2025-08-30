import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    avatar: {
      public_id: string;
      url: string;
    };
    verificationInfo: {
      token: string;
      verified: boolean;
    };
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatars: string;
    bio: string;
    street: string;
    postCode: number | null;
    phoneNum: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    onboardingStatus: boolean;
  };
}

async function fetchUserProfile(accessToken: string, id: string): Promise<ApiResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user profile');
  }

  return response.json();
}

export function useUserProfile(userId: string) {
  const { data: session } = useSession();

  return useQuery<ApiResponse, Error>({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(session?.accessToken as string, userId),
    enabled: !!session?.accessToken,
  });
}
