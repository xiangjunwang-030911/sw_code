export interface MenuListItem {
  title: string;
  icon?: string;
  rightIcon?: string;
  hoverColor?: string;
  onClick?: () => void;
  children?: MenuListItem[];
}
