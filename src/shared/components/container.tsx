type Props = {
    children?: React.ReactNode;
  };
  
export const Container = ({ children }: Props) => {
    return <div className="container mx-auto p-4">{children}</div>;
};