"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Divider, Flex } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { Hub } from "aws-amplify/utils";
import { useTransition } from "react";

export default function NavBar({ isSignedIn }: { isSignedIn: boolean }) {
  const [authCheck, setAuthCheck] = useState(isSignedIn);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const hubListenerCancel = Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signedIn":
          setAuthCheck(true);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
        case "signedOut":
          setAuthCheck(false);
          startTransition(() => router.push("/"));
          startTransition(() => router.refresh());
          break;
      }
    });

    return () => hubListenerCancel();
  }, [router]);

  const signOutSignIn = async () => {
    if (authCheck) {
      await signOut();
    } else {
      router.push("/signin");
    }
  };

  const defaultRoutes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/add",
      label: "Add Title",
      loggedIn: true,
    },
  ];

  const routes = defaultRoutes.filter(
    (route) => route.loggedIn === authCheck || route.loggedIn === undefined
  );

  return (
    <>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        padding="1rem 2rem"
        backgroundColor="#1a202c"
        color="white"
        boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)"
      >
        {/* Logo or Brand */}
        <div className="text-xl font-bold">
          <Link href="/">AnimeList</Link>
        </div>

        {/* Navigation Links */}
        <Flex as="nav" alignItems="center" gap="2rem">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <span className="hover:text-gray-300 transition duration-300">
                {route.label}
              </span>
            </Link>
          ))}
        </Flex>

        {/* Sign In/Out Button */}
        <Button
          variation="primary"
          borderRadius="50px"
          padding="0.5rem 2rem"
          backgroundColor="#f56565"
          _
          onClick={signOutSignIn}
        >
          {authCheck ? "Sign Out" : "Sign In"}
        </Button>
      </Flex>
      <Divider size="small" />
    </>
  );
}
