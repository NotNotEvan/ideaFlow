"use client";

import { useAppState } from "@/lib/providers/state-providers";
import { Folder } from "@/lib/supabase/supabase.types";
import React, { useEffect, useState } from "react";
import TooltipComponent from "../global/tooltip-component";
import { PlusIcon } from "lucide-react";
import { useSupabaseUser } from "@/lib/providers/supabase-user-provider";
import { v4 } from "uuid";
import { createFolder } from "@/lib/supabase/queries";
import { useToast } from "../ui/use-toast";
import { Accordion } from "../ui/accordion";

interface FoldersDropdownListProps {
  workspaceFolders: Folder[];
  workspaceId: string;
}

const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({
  workspaceFolders,
  workspaceId,
}) => {
  //WIP local state folders
  //WIP set up real time updates
  const { state, dispatch, folderId } = useAppState();
  const [folders, setFolders] = useState(workspaceFolders);
  const { subscription } = useSupabaseUser();
  const { toast } = useToast();

  //effect to set the initial state server app state
  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: "SET_FOLDERS",
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      });
    }
  }, [workspaceFolders, workspaceId]);

  //state
  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    );
  }, [state, workspaceId]);

  const addFolderHandler = async () => {
    if (folders.length >= 3 && !subscription) {
    }
    const newFolder: Folder = {
      data: null,
      id: v4(),
      createdAt: new Date().toISOString(),
      title: "New Folder",
      iconId: "📁",
      inTrash: null,
      workspaceId,
      bannerUrl: "",
    };
    dispatch({
      type: "ADD_FOLDER",
      payload: { workspaceId, folder: { ...newFolder, files: [] } },
    });
    const { data, error } = await createFolder(newFolder);
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Could not create folder.",
      });
    } else {
      toast({
        title: "Success!",
        description: "Folder created.",
      });
    }
  };

  return (
    <>
      {" "}
      <div className="flex sticky z-20 top-0 bg-background w-full h-10 group/title justify-between items-center pr-4 text-Neutrals/neutrals-8">
        <span className="text-Neutrals/neutrals-8 font-bold text-xs">
          FOLDERS
        </span>
        <TooltipComponent message="Create Folder">
          <PlusIcon
            onClick={addFolderHandler}
            size={16}
            className="group-hover/title:inline-block hidden cursor-pointer hover:dark:text-white"
          />
        </TooltipComponent>
      </div>
      <Accordion
        type="multiple"
        defaultValue={[folderId || ""]}
        className="pb-20"
      >
        {folders
          .filter((folder) => !folder.inTrash)
          .map((folder) => (
            <div key={folder.id}></div>
          ))}
      </Accordion>
    </>
  );
};

export default FoldersDropdownList;
