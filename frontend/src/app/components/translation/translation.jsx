import styles from "./translation.module.css";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Translation() {
  return (
    <>
      <form className={styles.container}>
        {/* Source Language */}
        <Select>
          <SelectTrigger className="!px-2 !py-2 w-[210px]">
            <SelectValue placeholder="Select Source Language" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--dark-color)] text-white">
            <SelectGroup>
              <SelectLabel>Select Source Language</SelectLabel>
              <SelectItem className="!p-1" value="English">
                English
              </SelectItem>
              <SelectItem className="!p-1" value="Arabic">
                Arabic
              </SelectItem>
              <SelectItem className="!p-1" value="Urdu">
                Urdu
              </SelectItem>
              <SelectItem className="!p-1" value="Persian">
                Persian
              </SelectItem>
              <SelectItem className="!p-1" value="Russian">
                Russian
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Swap button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="sd:w-sm md:w-md !p-6">
                <ArrowLeftRight />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="!p-2 text-[var(--light-color)]">
              Swap Languages
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Target Language */}
        <Select>
          <SelectTrigger className="!px-2 !py-2 w-[210px]">
            <SelectValue placeholder="Select Target Language" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--dark-color)] text-white">
            <SelectGroup>
              <SelectLabel>Select Source Language</SelectLabel>
              <SelectItem className="!p-1" value="English">
                English
              </SelectItem>
              <SelectItem className="!p-1" value="Arabic">
                Arabic
              </SelectItem>
              <SelectItem className="!p-1" value="Urdu">
                Urdu
              </SelectItem>
              <SelectItem className="!p-1" value="Persian">
                Persian
              </SelectItem>
              <SelectItem className="!p-1" value="Russian">
                Russian
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <button className="!p-2 border-2 rounded-full border-sky-900 rounded-full">
          <Mic className="w-10 h-10 !p-2" />
        </button>
        <Textarea className="w-64 md:w-96 lg:w-120 !p-3" placeholder="This is what you said ..."/>
      </form>
    </>
  );
}
