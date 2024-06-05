import { CustomFlowbiteTheme } from "flowbite-react";

export const navItemTheme: CustomFlowbiteTheme = {
  navbar: {
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: "block py-2 pl-3 pr-4 md:p-0",
      active: {
        on: "bg-primary text-white dark:text-white md:bg-transparent md:text-white",
        off: "border-b border-gray-100 text-white/50 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:underline md:dark:hover:bg-transparent md:dark:hover:text-white",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: "",
      },
    },
    toggle: {
      base: "ml-2 inline-flex items-center p-2 text-sm text-white hover:bg-gray-100/30 dark:text-gray-400 dark:hover:bg-gray-700/30 md:hidden",
      icon: "size-6 shrink-0",
    },
  },
};

export const accordionCustomTheme: CustomFlowbiteTheme = {
  accordion: {
    root: {
      base: "bg-neutral max-w-[400px]",
      flush: {
        off: "rounded-none",
        on: "rounded-none",
      },
    },
    content: {
      base: "p-5 dark:bg-gray-900",
    },
    title: {
      arrow: {
        base: "size-6 shrink-0",
        open: {
          off: "",
          on: "rotate-180",
        },
      },
      base: "flex w-full items-center justify-between p-5 text-left font-medium text-gray-500 dark:text-gray-400",
      flush: {
        off: "hover:bg-gray-300 dark:hover:bg-gray-800",
        on: "",
      },
      heading: "m-0",
      open: {
        off: "",
        on: "bg-gray-300 text-gray-900 dark:bg-gray-800 dark:text-white",
      },
    },
  },
};
