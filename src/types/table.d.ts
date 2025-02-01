// table表格
declare namespace Table {
  type VNodeChild = import('vue').VNodeChild;
  type Type = 'selection' | 'index' | 'expand' | 'image' | 'date';
  type Size = 'large' | 'default' | 'small';
  type Align = 'center' | 'left' | 'right';
  type Fixed = true | 'left' | 'right';
  interface Column {
    type?: Type;
    index?: number | Function;
    label?: string;
    prop?: string;
    width?: string | number;
    minWidth?: string | number;
    columnKey?: string;
    align?: Align;
    headerAlign?: Align;
    fixed?: Fixed;
    sortable?: boolean | 'custom'; // 对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
    render?: ({ row, column, $index }) => VNodeChild; // 渲染函数，渲染这一列的每一行的单元格
    sortBy?: (row, index) => void | string | [];
    sortMethod?: (a, b) => void;
    renderHeader?: ({ column, index }) => VNodeChild; // 渲染函数，渲染列表头
    headerSlot?: string; // 自定义表头插槽名字
    children?: Column[]; // 配置多级表头的数据集合, 具体用法可参考多级表头使用示例。
    resizable?: boolean;
    showOverflowTooltip?: boolean;
    //未完待续
  }
}
