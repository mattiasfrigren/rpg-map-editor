import { NavLink } from "@remix-run/react";
import { useGlobalData } from "~/hooks/useGlobalData";

export default function Tiles() {
  const { Images } = useGlobalData();

  return (
    <div className="grid grid-cols-5 gap-8 text-center m-4">
      {Images.map((img) => (
        <NavLink
          to={`${img.name}`}
          className="place-self-center"
          key={img.name}
        >
          <img src={img.src} alt={img.name} />
          <p>{img.name}</p>
        </NavLink>
      ))}
    </div>
  );
}
