// I wanted to use tabs in the implementation idea
import React, { useState } from "react";
import styles from "./Tabs.module.css";

interface Tab {
  id: string;
  title: string;
  content: React.ReactNode;
  chatId: string;
}

interface TabsProps {
  tabs: Tab[];
  switchChat: (data: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
  };

  return (
    <div className={styles.tabs}>
      <div className={styles.tabTitles}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabTitle} ${
              activeTab === tab.id ? styles.active : ""
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
