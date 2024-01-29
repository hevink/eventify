"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const Setting = () => {
  const user = useCurrentUser();

  return (
    <div>
      {JSON.stringify(user)}
      <form>
        <Button
          type="submit"
          onClick={() => {
            signOut();
          }}
        >
          SignOut
        </Button>
      </form>
    </div>
  );
};

export default Setting;
