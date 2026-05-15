type Props = {
  top: string;
  left: string;
  onClick: () => void;
};

function Target({ top, left, onClick }: Props) {
  return (
    <div
      className="target"
      onClick={onClick}
      style={{
        top,
        left,
      }}
    />
  );
}

export default Target;