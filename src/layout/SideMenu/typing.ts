import { MenuGroupEnum } from '@/enums/projectEnum';

export interface MenuItem {
  title: string;
  name: string;
  icon?: string;
  activeIcon?: string;
  group?: MenuGroupEnum;
  unReadMessage?: number;
  noNeedIcon?: boolean;
  disabled?: boolean;
  children?: MenuItem[];
}
