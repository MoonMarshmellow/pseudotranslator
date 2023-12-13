"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { FaArrowRight } from "react-icons/fa";

export default function Translator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const onSubmit = async (input: string) => {
    const res = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const data = await res.json();
    setOutput(data);
  };

  return (
    <>
      <div className="flex flex-row m-8 space-x-2">
        <div className="basis-1/2">
          <TextareaAutosize
            onChange={onInputChange}
            placeholder="Paste your code here!"
            className="peer h-full min-h-[200px] w-full bg-accent/5 resize-y rounded-[8px] border border-blue-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 transition-colors focus:border-2 focus:border-accent focus:bg-accent/10 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
          ></TextareaAutosize>
        </div>
        <button
          onClick={() => {
            onSubmit(input);
          }}
          className="bg-accent text-white h-5 p-5 m-20 flex items-center rounded-[8px] transition-all hover:bg-accent/90 hover:rounded-[20px]"
        >
          <FaArrowRight />
        </button>
        <div className="basis-1/2">
          <div className="h-full w-full bg-accent/5 rounded-[8px] border border-white text-white px-3 py-2.5 text-sm font-sans font-normal">
            {output}
          </div>
        </div>
      </div>
    </>
  );
}
