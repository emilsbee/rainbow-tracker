// External imports
import { createTypedHooks } from "easy-peasy";

// Internal imports
import { StoreModel } from "./storeSetup";

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

