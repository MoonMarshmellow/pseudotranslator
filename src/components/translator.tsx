"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { FaArrowRight, FaPython } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import TabItem from "./tabitem";
import { IconType } from "react-icons";

const formTabs = [
  {
    title: "Python",
    icon: FaPython,
  },
  {
    title: "JavaScript",
    icon: IoLogoJavascript,
  },
];

export type TabItemType = {
  title: string;
  icon: IconType;
};

export default function Translator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
  const [focused, setFocused] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

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
      <div className=" flex items-center align-middle justify-center">
        <div className="flex flex-row m-8 space-x-2 lg:w-[70%] sm:w-full md:w-full">
          <div className="basis-1/2 flex-col">
            <div
              className={`h-[40px] bg-accent/5 flex flex-row w-full rounded-t-[8px] overflow-hidden border border-blue-gray-200 border-b-0 ${
                focused ? "border-accent border-b-0 border-2 bg-accent/10" : ""
              }`}
            >
              {formTabs.map((item) => (
                <TabItem
                  key={item.title}
                  item={item}
                  selected={item.title === selectedTab}
                  setSelectedTab={setSelectedTab}
                />
              ))}
            </div>
            <TextareaAutosize
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onInputChange}
              placeholder="Paste your code here!"
              className="peer h-full min-h-[160px] w-full bg-accent/5 resize-y rounded-b-[8px] border border-t-0 border-blue-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 focus:border-2 focus:border-accent focus:border-t-0 focus:bg-accent/10 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
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
      </div>
    </>
  );
}
