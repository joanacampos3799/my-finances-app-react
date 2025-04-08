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
      const fas: Icon[] = Object.entries(exportFa6).map(([name, icon]) => ({
        icon: icon as IconType,
        name,
      }));
      const { ...exportLu } = Lu;
      const lus: Icon[] = Object.entries(exportLu).map(([name, icon]) => ({
        icon: icon as IconType,
        name: name,
      }));

      const { ...exportMd } = Md;
      const mds: Icon[] = Object.entries(exportMd).map(([name, icon]) => ({
        icon: icon as IconType,
        name: name,
      }));

      const { ...exportTb } = Tb;
      const tbs: Icon[] = Object.entries(exportTb).map(([name, icon]) => ({
        icon: icon as IconType,
        name: name,
      }));

      setIconPack([...fas, ...lus, ...mds, ...tbs]);
    }
  }, [iconPack]);

  return iconPack;
};
