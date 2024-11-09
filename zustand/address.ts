import { create } from "zustand";

export type OutputAddress = {
  corrected_address: string;
  original_address: string;
  district: string | null;
  pincode: number | null;
  place: string | null;
  state: string | null;
  status: string;
};

type OutputAddressState = {
  outputAddress: OutputAddress | null;
  setOutputAddress: (outputAddress: OutputAddress) => void;
  resetOutputAddress: () => void;
};

type OutputAddressesState = {
  outputAddresses: OutputAddress[] | null;
  setOutputAddresses: (outputAddress: OutputAddress[]) => void;
  resetOutputAddresses: () => void;
};

type inputAddressState = {
  inputAddress: string | null;
  setInputAddress: (inputAddress: string) => void;
  resetInputAddress: () => void;
};

type inputAddressesState = {
  inputAddresses: string[] | null;
  setInputAddresses: (inputAddress: string[]) => void;
  resetInputAddresses: () => void;
};

export const useBulkOutputAddressesStore = create<OutputAddressesState>(
  (set) => ({
    outputAddresses: null,
    setOutputAddresses: (outputAddresses) => set({ outputAddresses }),
    resetOutputAddresses: () => set({ outputAddresses: null }),
  })
);

export const useOutputAddressStore = create<OutputAddressState>((set) => ({
  outputAddress: null,
  setOutputAddress: (outputAddress) => set({ outputAddress }),
  resetOutputAddress: () => set({ outputAddress: null }),
}));

export const useBulkInputAddressesStore = create<inputAddressesState>(
  (set) => ({
    inputAddresses: null,
    setInputAddresses: (inputAddresses) => set({ inputAddresses }),
    resetInputAddresses: () => set({ inputAddresses: null }),
  })
);

export const useInputAddressStore = create<inputAddressState>((set) => ({
  inputAddress: null,
  setInputAddress: (inputAddress) => set({ inputAddress }),
  resetInputAddress: () => set({ inputAddress: null }),
}));
