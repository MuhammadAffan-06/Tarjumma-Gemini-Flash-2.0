"use client";
import styles from "./translation.module.css";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Volume2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Translation() {
  // State to track source and target languages
  const [sourceLanguage, setSourceLanguage] = React.useState("");
  const [targetLanguage, setTargetLanguage] = React.useState("");

  // Function to swap source and target languages
  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };
  const [text, setText] = useState("");
  function handleRecord() {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Your browser does not support speech recognition.");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.onresult = async function (event) {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        console.log("event", event);
      };
      recognition.start();
    }
  }

  return (
    <>
      <form className={styles.container}>
        {/* Source Language */}
        <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
          <SelectTrigger className="!px-2 !py-2 w-[210px]">
            <SelectValue placeholder="Select Source Language" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--dark-color)]">
            <SelectGroup>
              <SelectLabel className="text-white">
                Select Source Language
              </SelectLabel>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="English"
              >
                English
              </SelectItem>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="Arabic"
              >
                Arabic
              </SelectItem>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="Urdu"
              >
                Urdu
              </SelectItem>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="Persian"
              >
                Persian
              </SelectItem>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="Russian"
              >
                Russian
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Swap button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="sd:w-sm md:w-md !p-6"
                onClick={handleSwapLanguages} // Call swap function on click
                type="button" // Prevent form submission
              >
                <ArrowLeftRight />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="!p-2 text-[var(--light-color)]">
              Swap Languages
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Target Language */}
        <Select value={targetLanguage} onValueChange={setTargetLanguage}>
          <SelectTrigger className="!px-2 !py-2 w-[210px]">
            <SelectValue placeholder="Select Target Language" />
          </SelectTrigger>
          <SelectContent className="bg-[var(--dark-color)]">
            <SelectGroup>
              <SelectLabel className="text-white">
                Select Target Language
              </SelectLabel>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="English"
              >
                English
              </SelectItem>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="Arabic"
              >
                Arabic
              </SelectItem>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="Urdu"
              >
                Urdu
              </SelectItem>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="Persian"
              >
                Persian
              </SelectItem>
              <SelectItem
                className="!p-1 text-white hover:bg-[var(--dark-hover-color)]"
                value="Russian"
              >
                Russian
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Microphone Button */}
        <button
          className="!p-2 border-2 rounded-full border-sky-900 rounded-full"
          type="button"
          onClick={handleRecord}
        >
          <Mic className="w-10 h-10 !p-2" />
        </button>

        {/* Textarea */}
        {/* <Textarea
          className="w-64 md:w-96 lg:w-120 !p-3"
          placeholder="This is what you said ..."
          {text}
        /> */}
        <p>Spoken Text: {text}</p>
        {/* Volume Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-10">
                <Volume2 />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="!p-2 text-[var(--light-color)]">
              Speak aloud
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </>
  );
}
