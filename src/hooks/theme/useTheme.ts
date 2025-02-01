import { ModeEnum } from '@/enums/themeEnum';

function hexToRgb(str: string): number[] {
  let hxs = str.replace('#', '').match(/../g);
  if (!hxs) return [];

  const rgbValues: number[] = [];
  for (let i = 0; i < 3; i++) {
    if (hxs[i]) {
      rgbValues[i] = parseInt(hxs[i], 16);
    } else {
      rgbValues[i] = 0;
    }
  }
  return rgbValues;
}

function rgbToHex(a: number, b: number, c: number): string {
  let hexs = [a.toString(16), b.toString(16), c.toString(16)];
  for (let i = 0; i < 3; i++) {
    if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
  }
  return `#${hexs.join('')}`;
}

/** 加深颜色值 */
function darken(color: string, level: number): string {
  let rgbc = hexToRgb(color);
  for (let i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
  return rgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}

/** 变浅颜色值 */
function lighten(color: string, level: number): string {
  let rgbc = hexToRgb(color);
  for (let i = 0; i < 3; i++)
    rgbc[i] = Math.floor((255 - rgbc[i]) * level + rgbc[i]);
  return rgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}

function setPropertyPrimary(
  mode: ModeEnum,
  i: number,
  color: string,
  realDark?: Boolean,
) {
  document.documentElement.style.setProperty(
    `--el-color-primary-${mode}-${i}`,
    mode == ModeEnum.LIGHT ? lighten(color, i / 10) : darken(color, i / 10),
  );

  if (mode == ModeEnum.DARK && realDark) {
    document.documentElement.style.setProperty(
      `--el-color-primary-light-${i}`,
      darken(color, i / 10),
    );
  }
}

export const useTheme = {
  changeTheme: (color: string, mode?: ModeEnum) => {
    document.documentElement.style.setProperty('--el-color-primary', color);

    if (mode == ModeEnum.DARK) {
      document.documentElement.classList.add('dark');
      for (let i = 3; i <= 9; i++) {
        if (i == 4 || i == 6) {
          continue;
        }
        setPropertyPrimary(ModeEnum.DARK, i, color, true);
      }
    } else {
      document.documentElement.classList.remove('dark');
      for (let i = 1; i <= 9; i++) {
        setPropertyPrimary(ModeEnum.LIGHT, i, color);
      }
      for (let i = 1; i <= 2; i++) {
        setPropertyPrimary(ModeEnum.DARK, i, color);
      }
    }
  },
};
