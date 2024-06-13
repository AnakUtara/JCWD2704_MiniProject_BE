"use client";
import { tabsCustomTheme } from "@/app/_libs/flowbite.theme";
import { Flowbite, Tabs } from "flowbite-react";
import { HiClipboardList } from "react-icons/hi";
import { MdDashboard, MdEventNote } from "react-icons/md";

type Props = {
  tab1: React.ReactNode;
  tab2: React.ReactNode;
};
export default function DashboardTabs({ tab1, tab2 }: Props) {
  return (
    <Flowbite theme={{ theme: tabsCustomTheme }}>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="Transactions" icon={MdDashboard}>
          {tab1}
        </Tabs.Item>
        <Tabs.Item title="Events" icon={HiClipboardList}>
          {tab2}
        </Tabs.Item>
      </Tabs>
    </Flowbite>
  );
}
