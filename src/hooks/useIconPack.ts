import { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import * as IconPack from 'react-icons/fa'
interface Icon {
    icon: IconType
    name: string

}

export const useIconPack = () => {
  const [iconPack, setIconPack] = useState<Icon[]>()

  useEffect(() => {
    if (!iconPack) {
      const { ...exportIcons } = IconPack
        const fas: Icon[] = Object.values(exportIcons).map((icon: IconType) => ({
            icon: icon,
            name: icon.toString()
        }))
          setIconPack(fas)
    }
  }, [iconPack])

  return iconPack
}