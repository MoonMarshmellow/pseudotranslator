"use client";

import { use, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import SyntaxHighlighter from "react-syntax-highlighter";
import { FaArrowRight, FaPython } from "react-icons/fa";
import { RiJavascriptFill } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";
import TabItem from "./tabitem";
import { IconType } from "react-icons";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import { qtcreatorDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { formatRevalidate } from "next/dist/server/lib/revalidate";

const formTabs = [
  {
    title: "Python",
    icon: FaPython,
  },
  {
    title: "JavaScript",
    icon: RiJavascriptFill,
  },
  {
    title: "IB PseudoCode",
  },
];

export type TabItemType = {
  title: string;
  icon?: IconType;
};

export default function Translator() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedFromTab, setSelectedFromTab] = useState(formTabs[0].title);
  const [selectedToTab, setSelectedToTab] = useState(formTabs[1].title);
  const [outputLang, setOutputLang] = useState("lua");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  useEffect(() => {
    const index1 = formTabs.map((e) => e.title).indexOf(selectedFromTab);
    if (selectedFromTab == selectedToTab) {
      console.log("same");
      console.log("index1", index1);
      const newIndex = index1 + 1 == formTabs.length ? index1 - 1 : index1 + 1;
      console.log("newIndex", newIndex);
      setSelectedFromTab(formTabs[newIndex].title);
    }
  }, [selectedToTab]);

  useEffect(() => {
    const index2 = formTabs.map((e) => e.title).indexOf(selectedToTab);
    const newIndex = 1;
    if (selectedFromTab == selectedToTab) {
      console.log("same");
      console.log("index2", index2);
      const newIndex = index2 + 1 == formTabs.length ? index2 - 1 : index2 + 1;
      console.log("newIndex", newIndex);
      setSelectedToTab(formTabs[newIndex].title);
    }
  }, [selectedFromTab]);

  const onInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const onSubmit = async (
    input: string,
    languageFrom: string,
    languageTo: string
  ) => {
    setLoading(true);
    try {
      const request = {
        code: input,
        languageFrom: languageFrom,
        languageTo: languageTo,
      };
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });
      const data = await res.json();
      console.log(data);
      setOutput(data);
    } catch (error) {
      console.log("onSubmit error: ", error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className=" flex items-center align-middle justify-center">
        <div className="flex lg:flex-row md:flex-row flex-col space-x-2 w-full">
          <div className="basis-1/2 flex-col ">
            <div
              className={`h-[40px] flex flex-row w-full rounded-t-[8px] overflow-hidden border border-blue-gray-200 border-b-0 ${
                focused
                  ? "border-accent border-b-0 border-2 bg-accent/5"
                  : "bg-[#0f0f0f]"
              }`}
            >
              {formTabs.map((item) => (
                <TabItem
                  key={item.title}
                  item={item}
                  selected={item.title === selectedFromTab}
                  setSelectedTab={setSelectedFromTab}
                />
              ))}
            </div>
            <TextareaAutosize
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onInputChange}
              placeholder="Paste your code here!"
              className="peer w-full min-h-[160px] bg-[#0f0f0f] resize-y rounded-b-[8px] border border-t-0 border-blue-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 focus:border-2 focus:border-accent focus:border-t-0 focus:bg-accent/5 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            ></TextareaAutosize>
          </div>
          {loading ? (
            <button className="bg-accent/90 text-white lg:w-[60px] font-sans font-bold align-middle md:w-[60px] h-5 p-5 m-20 flex items-center transition-all rounded-[20px]">
              <AiOutlineLoading className="animate-spin" />
            </button>
          ) : (
            <button
              onClick={() => {
                onSubmit(input, selectedFromTab, selectedToTab);
              }}
              className="bg-accent text-white h-5 p-5 m-20 lg:w-[60px] font-sans font-bold align-middle md:w-[60px] justify-center flex items-center rounded-[8px] transition-all hover:bg-accent/90 hover:rounded-[20px]"
            >
              <p className="mr-2 lg:hidden md:hidden">Convert</p>
              <FaArrowRight />
            </button>
          )}
          <div className="basis-1/2 flex flex-col flex-grow">
            <div
              className={`h-[40px] bg-[#0f0f0f] flex flex-row w-full rounded-t-[8px] overflow-hidden border border-blue-gray-200 border-b-0`}
            >
              {formTabs.map((item) => (
                <TabItem
                  key={item.title}
                  item={item}
                  selected={item.title === selectedToTab}
                  setSelectedTab={setSelectedToTab}
                />
              ))}
            </div>

            <div className="whitespace-pre peer flex-grow w-full min-h-[160px] bg-[#0f0f0f] resize-y rounded-b-[8px] border border-t-0 border-blue-gray-200 px-3 py-2.5 font-sans text-sm font-normal text-white outline outline-0 focus:border-2 focus:border-accent focus:border-t-0 focus:bg-accent/10 focus:outline-0">
              <ReactSyntaxHighlighter
                language={selectedToTab.toLocaleLowerCase()}
                style={qtcreatorDark}
                customStyle={{
                  background: "rbg(189,61,205,0.05)",
                }}
                // className="whitespace-pre bg-accent/5 rounded-[8px] border border-white text-white px-3 py-2.5 text-sm font-sans font-normal"
              >
                {output}
              </ReactSyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
