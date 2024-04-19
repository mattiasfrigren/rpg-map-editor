type Props = {
  onClick: () => void;
  content: string;
  icon?: JSX.Element;
};

export function ReworkTileButton({ onClick, content, icon }: Readonly<Props>) {
  return (
    <button className="h-26 w-26" onClick={onClick}>
      {icon}
      {content}
    </button>
  );
}
