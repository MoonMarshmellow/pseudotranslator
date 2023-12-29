import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PiLightningFill } from "react-icons/pi";

type ModalData = {
  title: string;
  body: string;
  buttonText: string;
  setOpen: (value: boolean) => void;
  open: boolean;
};

export default function NoUsesModal({
  title,
  body,
  buttonText,
  open,
  setOpen,
}: ModalData) {
  const cancelButtonRef = useRef(null);
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-700  bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="  flex min-h-full items-end justify-center p-4 text-center  sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative  border-2 border-accent transform overflow-hidden rounded-lg bg-bg text-left shadow-xl font-sans transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-[#1a1a1a] px-4 pb-4pt-5 sm:p-6 sm:pb-4">
                    <div className="flex flex-col justify-center align-middle items-center  mt-0 text-center w-full sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h1"
                        className=" text-lg text-center font-sans font-bold leading-6 text-lightaccent pb-3 [text-shadow:0px_10px_50px_#ec5bff]"
                      >
                        {title}
                      </Dialog.Title>
                      <p className="text-gray-200 text-sm text-center mb-4">
                        {body}
                      </p>
                      <button className="transition-all flex flex-row items-center bg-gradient-to-r from-[#a560ff] to-[#e008fc] text-md pt-1 pb-1 pl-2 pr-2 hover:scale-105 text-white rounded-md font-semibold hover:shadow-custom">
                        <p>{buttonText}</p>
                        <PiLightningFill className="ml-[5px] mt-[1px]" />
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
