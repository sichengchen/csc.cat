import { Grip, NotepadText } from "lucide-react";
import {
  SiBluesky,
  SiGithub,
  SiInstagram,
  SiX,
  SiXiaohongshu,
} from "@icons-pack/react-simple-icons";
import type { ComponentType, SVGProps } from "react";
import type { LinkId } from "@csc/shared/redirects";
import { FaviconIcon, HappyMacIcon, LinkedinIcon } from "./home-icons";

type LinkIcon = ComponentType<SVGProps<SVGSVGElement>>;

type LinkItem = {
  id: LinkId;
  icon: LinkIcon;
};

export const links: LinkItem[] = [
  { id: "homepage", icon: FaviconIcon },
  { id: "system", icon: HappyMacIcon },
  { id: "blog", icon: NotepadText },
  { id: "apps", icon: Grip },
  { id: "github", icon: SiGithub },
  { id: "instagram", icon: SiInstagram },
  { id: "rednote", icon: SiXiaohongshu },
  { id: "bluesky", icon: SiBluesky },
  { id: "x", icon: SiX },
  { id: "linkedin", icon: LinkedinIcon },
];
