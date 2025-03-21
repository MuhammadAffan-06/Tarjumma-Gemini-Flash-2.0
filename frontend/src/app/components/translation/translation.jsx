import styles from "./translation.module.css";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";
import { Mic } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Volume2 } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
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
  const {
    transcript, // Stores the transcribed text
    listening, // Indicates if speech recognition is active
    resetTranscript, // Resets the transcript
    browserSupportsSpeechRecognition, // Checks if the browser supports speech recognition
  } = useSpeechRecognition();

  // State to store the final transcribed text
  const [recordedText, setRecordedText] = React.useState("");

  // Ref for the microphone button
  const micButtonRef = React.useRef(null);

  // Function to start recording
  const startRecording = (event) => {
    if (event.cancelable) {
      event.preventDefault(); // Prevent default behavior if possible
    }
    resetTranscript(); // Reset the transcript
    SpeechRecognition.startListening(); // Start recording
  };

  // Function to stop recording
  const stopRecording = () => {
    SpeechRecognition.stopListening(); // Stop recording
    setRecordedText(transcript); // Save the transcribed text
  };

  // Attach event listeners manually using ref
  React.useEffect(() => {
    const micButton = micButtonRef.current;

    if (micButton) {
      const handleTouchStart = (event) => {
        if (event.cancelable) {
          event.preventDefault(); // Prevent default behavior if possible
        }
        startRecording(event);
      };

      // Add non-passive event listeners
      micButton.addEventListener("touchstart", handleTouchStart, { passive: false });
      micButton.addEventListener("touchend", stopRecording);

      // Cleanup event listeners on unmount
      return () => {
        micButton.removeEventListener("touchstart", handleTouchStart);
        micButton.removeEventListener("touchend", stopRecording);
      };
    }
  }, []);

  // State to track source and target languages
  const [sourceLanguage, setSourceLanguage] = React.useState("");
  const [targetLanguage, setTargetLanguage] = React.useState("");

  // Function to swap source and target languages
  const handleSwapLanguages = () => {
    const temp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(temp);
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
          ref={micButtonRef} // Attach ref to the button
          type="button" // Prevent form submission
          className="!p-2 border-2 rounded-full border-sky-900 rounded-full"
          onMouseDown={startRecording} // Start recording on mouse down
          onMouseUp={stopRecording} // Stop recording on mouse up
          onTouchStart={startRecording} // Start recording on touch start
          onTouchEnd={stopRecording} // Stop recording on touch end
        >
          <Mic className="w-10 h-10 !p-2" />
        </button>
        <div>{listening ? "Recording..." : "Record"}</div>

        {/* Textarea */}
        <Textarea
          className="w-64 md:w-96 lg:w-120 !p-3"
          placeholder="This is what you said ..."
          value={recordedText}
          onChange={(e) => setRecordedText(e.target.value)}
        />

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