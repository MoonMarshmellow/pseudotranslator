import Translator from "@/components/translator";

export default function Home() {
  return (
    <>
      <div className="align-middle p-3  text-2xl font-bold justify-center w-full text-center font-sans text-text">
        PseudoTranslator
      </div>
      <Translator />
    </>
  );
}
