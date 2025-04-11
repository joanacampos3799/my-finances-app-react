import { Tag } from "../../components/ui/tag";
import { Icon } from "@chakra-ui/react";
import { useIconPack } from "../hooks/useIconPack";

interface Props {
  icon?: string;
  name: string;
}
const TagComponent = ({ icon, name }: Props) => {
  const iconPack = useIconPack();
  return (
    <Tag rounded="md" variant="solid" pe="2">
      {icon && (
        <Icon boxSize={4} as={iconPack?.find((i) => i.name === icon)?.icon} />
      )}{" "}
      {name}
    </Tag>
  );
};

export default TagComponent;
