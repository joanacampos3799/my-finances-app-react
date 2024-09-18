import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import * as Fa6 from "react-icons/fa6";
import * as Lu from "react-icons/lu";
import * as Md from "react-icons/md";
import * as Tb from "react-icons/tb";
interface Icon {
  icon: IconType;
  name: string;
}

export const useIconPack = () => {
  const [iconPack, setIconPack] = useState<Icon[]>();

  useEffect(() => {
    if (!iconPack) {
      const { ...exportFa6 } = Fa6;
      const fas: Icon[] = Object.values(exportFa6).map((icon: IconType) => ({
        icon: icon,
        name: icon.name,
      }));

      const { ...exportLu } = Lu;
      const lus: Icon[] = Object.values(exportLu).map((icon: IconType) => ({
        icon: icon,
        name: icon.name,
      }));

      const { ...exportMd } = Md;
      const mds: Icon[] = Object.values(exportMd).map((icon: IconType) => ({
        icon: icon,
        name: icon.name,
      }));

      const { ...exportTb } = Tb;
      const tbs: Icon[] = Object.values(exportTb).map((icon: IconType) => ({
        icon: icon,
        name: icon.name,
      }));

      setIconPack([...fas, ...lus, ...mds, ...tbs]);
    }
  }, [iconPack]);

  return iconPack;
};
