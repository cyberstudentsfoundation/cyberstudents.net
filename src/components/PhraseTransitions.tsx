"use client";

import { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Button } from "~/components/ui/button";
import { HiArrowPath } from "react-icons/hi2";

const phraseList = ["students", "teachers", "professionals", "together"];

export default function PhraseTransitions() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentPhrase < phraseList.length - 1) {
        setCurrentPhrase(currentPhrase + 1);
      } else {
        clearInterval(interval);
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [currentPhrase]);

  return (
    <>
      <span>
        <Transition show={currentPhrase !== 3} className={`inline-block transition-all`} as={"div"}>
          with&nbsp;
        </Transition>
        {phraseList.map((phrase, index) => (
          <span key={phrase}>
            <Transition
              show={currentPhrase === index}
              className={`inline-block text-cyan-300 transition-all motion-safe:will-change-transform ${currentPhrase !== index ? "hidden" : ""}`}
              enter="transition duration-700 transform"
              enterFrom="motion-safe:opacity-0 motion-safe:-translate-y-10"
              enterTo="motion-safe:opacity-100 motion-safe:translate-y-0"
              as={"div"}
            >
              {phrase}
            </Transition>
          </span>
        ))}
      </span>
      <Button
        size="icon"
        variant="ghost"
        className={`ml-2 h-8 w-8 rounded-full text-gray-300 opacity-0 transition-opacity duration-300 hover:bg-white/10! focus-visible:opacity-100 group-hover:opacity-100 ${currentPhrase !== 3 ? "opacity-0!" : ""}`}
        disabled={currentPhrase !== 3}
        title="Restart animation"
        onClick={() => setCurrentPhrase(0)}
      >
        <HiArrowPath className="h-4 w-4" />
      </Button>
    </>
  );
}
