import { TabItemType } from "./translator";

type TabItemProps = {
  item: TabItemType;
  selected: boolean;
  setSelectedTab: (value: string) => void;
};
export default function TabItem({
  item,
  selected,
  setSelectedTab,
}: TabItemProps) {
  const Icon = item.icon;
  return (
    <>
      <div
        className={`flex flex-row items-center justify-center w-full font-bold cursor-pointer hover:bg-accent/20 ${
          selected
            ? "bg-accent/50 hover:bg-accent/50 border-b-2 border-b-accent"
            : "bg-accent/0"
        }`}
        onClick={() => setSelectedTab(item.title)}
      >
        <Icon className="text-white mr-2" />
        <p className="text-sm text-white">{item.title}</p>
      </div>
    </>
  );
}
