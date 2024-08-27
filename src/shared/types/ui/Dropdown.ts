import React from "react";

export type BaseDropdownProps = {
    label: string; 
    labelIcon?: string;
    options: string[];
    optionIcons?: string[];
    onSelect: (option: string) => void;
    urls?: string[]; 
    buttonImage: string;
}