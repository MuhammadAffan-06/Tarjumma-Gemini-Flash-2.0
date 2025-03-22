"use client";
import styles from "./translation.module.css";
import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { Mic } from "lucide-react";
import { Volume2 } from "lucide-react";
import CircularProgress from "@mui/material/CircularProgress";
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

export default function Translation() {
  // State to track source and target languages
  const [sourceLanguage, setSourceLanguage] = React.useState("");
  const [targetLanguage, setTargetLanguage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Function to swap source and target languages
  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
  };

  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  // Function to call the translation API
  const translateText = async (sourceLang, targetLang, transcript) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5002/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sourceLang: sourceLang,
          targetLang: targetLang,
          transcript: transcript,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to translate text");
      }
      const data = await response.json();
      setTranslatedText(data);
      console.log("Final result: ", data);
    } catch (error) {
      console.error("Translation error:", error);
      alert("An error occurred while translating. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle recording
  const handleRecord = () => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Your browser does not support speech recognition.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = false; // Stop after one sentence
      recognition.interimResults = false; // Only return final results

      // Dynamically set the recognition language based on the selected sourceLanguage
      recognition.lang = getLanguageCode(sourceLanguage);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log("Recognized text:", transcript); // Debugging
        setText(transcript); // Update state with the recognized text

        // Call the translation API after speech recognition is complete
        if (sourceLanguage && targetLanguage) {
          translateText(sourceLanguage, targetLanguage, transcript);
        } else {
          alert("Please select both source and target languages.");
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error); // Debugging
      };

      recognition.start();
    }
  };

  // Function to map language names to language codes
  const getLanguageCode = (language) => {
    switch (language) {
      case "English":
        return "en-US";
      case "Arabic":
        return "ar-SA";
      case "Urdu":
        return "ur-PK";
      case "Persian":
        return "fa-IR";
      case "Russian":
        return "ru-RU";
      default:
        return "en-US";
    }
  };

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
          disabled={isLoading}
        >
          <Mic className="w-10 h-10 !p-2" />
        </button>

        {/* Display Recognized Text */}
        <p>Spoken Text: {text}</p>

        {/* Display Translated Text */}
        {isLoading ? (
          <CircularProgress />
        ) : (
          <p>Translated Text: {translatedText}</p>
        )}

        {/* Volume Button */}
        {isLoading ? (
          <CircularProgress />
        ) : (
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
        )}
      </form>
    </>
  );
}
