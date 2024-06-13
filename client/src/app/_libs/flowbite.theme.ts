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

export const tabsCustomTheme: CustomFlowbiteTheme = {
  tabs: {
    tablist: {
      tabitem: {
        base: "flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          default: {
            active: {
              on: "bg-black text-black dark:bg-gray-800 dark:text-white",
              off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
            },
          },
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "active rounded-t-lg border-b-2 border-black text-black dark:border-white dark:text-white",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
        },
      },
    },
  },
};

export const footerCustomTheme: CustomFlowbiteTheme = {
  footer: {
    root: {
      base: "w-full rounded-lg bg-black shadow dark:bg-gray-800 md:flex md:items-center md:justify-between",
      container: "w-full p-6",
      bgDark: "bg-gray-800",
    },
    groupLink: {
      base: "flex flex-wrap text-sm text-white dark:text-white",
      link: {
        base: "me-4 last:mr-0 md:mr-6",
        href: "hover:underline",
      },
      col: "flex-col space-y-4",
    },
    icon: {
      base: "text-white dark:hover:text-white",
      size: "h-5 w-5",
    },
    title: {
      base: "mb-6 text-sm font-semibold uppercase text-gray-500 dark:text-white",
    },
    divider: {
      base: "my-6 w-full border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8",
    },
    copyright: {
      base: "text-sm text-gray-500 dark:text-gray-400 sm:text-center",
      href: "ml-1 hover:underline",
      span: "ml-1",
    },
    brand: {
      base: "mb-4 flex items-center sm:mb-0",
      img: "mr-3 h-8",
      span: "self-center whitespace-nowrap text-2xl font-semibold text-gray-800 dark:text-white",
    },
  },
};
