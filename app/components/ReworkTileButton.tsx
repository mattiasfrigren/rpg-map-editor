type Props = {
  onClick: () => void;
  content: string;
  icon?: JSX.Element;
};

export function ReworkTileButton({ onClick, content, icon }: Props) {
  return (
    <button onClick={onClick}>
      {icon}
      {content}
    </button>
  );
}
