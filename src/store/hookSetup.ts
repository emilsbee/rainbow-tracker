import * as i from "types";
import { createTypedHooks } from "easy-peasy";

const typedHooks = createTypedHooks<i.StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

