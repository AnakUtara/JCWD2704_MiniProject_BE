"use client";

import { tabsCustomTheme } from "@/app/_libs/flowbite.theme";
import { Flowbite, Tabs } from "flowbite-react";
import { HiClipboardList } from "react-icons/hi";
import { MdDashboard, MdEventNote } from "react-icons/md";

type Props = {
  tab1: React.ReactNode;
};

export default function ReviewTabs({ tab1 }: Props) {
  return (
    <Flowbite theme={{ theme: tabsCustomTheme }}>
      <Tabs aria-label="Tabs with underline" style="underline">
        <Tabs.Item active title="Event Review" icon={MdEventNote}>
          {tab1}
        </Tabs.Item>
      </Tabs>
    </Flowbite>
  );
}
