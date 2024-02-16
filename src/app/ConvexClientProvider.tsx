"use client";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
} from "convex/react";
import LoginPage from "@/components/auth/LoginPage";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider publishableKey="pk_test_cHJvdWQtcm9vc3Rlci00MS5jbGVyay5hY2NvdW50cy5kZXYk">
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {/* <Authenticated></Authenticated>
        <Unauthenticated>
          <LoginPage />
        </Unauthenticated> */}
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
