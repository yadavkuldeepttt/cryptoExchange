import { Tab } from "@/types/crypto";

// components/TabSelector.tsx
interface TabSelectorProps {
    tabs: Tab[];
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
  }
  
  const TabSelector: React.FC<TabSelectorProps> = ({
    tabs,
    activeTab,
  }) => {
    return (
      <div style={{ borderRadius: "48px 48px 0 0" }} className="flex  overflow-hidden">
      {tabs.map((tab) => (
  <button
    key={tab}
    className={`flex-1 w-full py-5 px-4 tracking-[0.05rem] relative ${
      activeTab === tab
        ? 'bg-white text-gray-900'
        : 'bg-[#ecf1f7] text-gray-600 hover:bg-gray-200 flex overflow-hidden p-1 rounded-bl-[16px] skew-x-[22deg] transition-all duration-100'
    }`}
  >
    <span className={`block text-center w-full text-lg font-semibold  ${activeTab === tab ? "text-gray-500" : "text-gray-400 -skew-x-[22deg]"} `}>{tab}</span>
  </button>
))}
      </div>
    );
  };

  export default TabSelector;