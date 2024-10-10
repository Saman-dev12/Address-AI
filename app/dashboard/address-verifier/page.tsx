import CSVDropper from "./components/csv-dropper";

const AddressVerifierPage = () => {
  return (
    <div className="ml-80 pt-16 pr-8">
      <h1 className="text-3xl leading-none">Address Verification</h1>
      <hr className="my-6" />
      <CSVDropper />
    </div>
  );
};

export default AddressVerifierPage;
