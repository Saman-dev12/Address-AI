import OutputAddressesClient from "./components/output-address-client";

const OutputAddresses = () => {
  return (
    <div className="ml-80 pt-16 pr-8">
      <h1 className="text-3xl leading-none">Output Addresses</h1>
      <h2 className="text-sm text-gray-500 my-1">
        Check Your Corrected Addresses Here
      </h2>
      <hr className="mb-6" />
      <OutputAddressesClient />
    </div>
  );
};

export default OutputAddresses;
