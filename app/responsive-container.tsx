interface ResponsiveContainerProps {
  children: React.ReactNode;
  heading: string;
  description?: string;
}

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  heading,
  description,
}) => {
  return (
    <div className="md:ml-80 md:pt-16 md:pr-8">
      <h1 className="text-3xl leading-none">{heading}</h1>
      {description && (
        <h2 className="text-sm text-gray-500 my-1">{description}</h2>
      )}
      <hr className="mb-6" />
      {children}
    </div>
  );
};

export default ResponsiveContainer;
