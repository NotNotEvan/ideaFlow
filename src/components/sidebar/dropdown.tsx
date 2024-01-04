import React from "react";

interface DropdownProps {
  title: string;
  id: string;
  listType: "folder" | "file";
  iconId: string;
  children?: React.ReactNode;
  disabled?: boolean;
  customIcon?: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  id,
  listType,
  iconId,
  children,
  disabled,
  customIcon,
  ...props
}) => {
  //folder title synced with server data and local data
  //file title
  //navigate the user to a different page
  //add a file

  //edit the files: double click handler
  //blur

  //onChanges
  //move to trash
  

  return <div>Dropdown</div>;
};

export default Dropdown;
