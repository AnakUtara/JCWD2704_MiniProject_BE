import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "./store";
// import { useEffect, useState } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// export const useDebounce = (value: any, delay: number) => {
//   const [debouncedValue, setDebounceValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {});
//   });
// };
