"use client";

import { MAX_FOLDERS_FREE_PLAN } from "@/lib/constants";
import { useAppState } from "@/lib/providers/state-providers";
import { Subscription } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";

interface PlanUsageProps {
  foldersLength: number;
  subscription: Subscription | null;
}

const PlanUsage: React.FC<PlanUsageProps> = ({
  foldersLength,
  subscription,
}) => {
  const { workspaceId, state } = useAppState();

  const [useagePercentage, setUseagePercentage] = useState(
    (foldersLength / MAX_FOLDERS_FREE_PLAN) * 100
  );

  useEffect(() => {
    const stateFoldersLength = state.workspaces.find(
      (workspace) => workspace.id === workspaceId
    )?.folders.length;

    if (stateFoldersLength === undefined) return;
    setUseagePercentage((stateFoldersLength / MAX_FOLDERS_FREE_PLAN) * 100);
  }, [state, workspaceId]);
  return (
    <article className="mb-4">
      {subscription?.status !== "active" && (
        <div className="flex justify-between w-full items-center">
          <div>Free Plan</div>
          <small>{useagePercentage.toFixed()}</small>
        </div>
      )}
    </article>
  );
};

export default PlanUsage;
