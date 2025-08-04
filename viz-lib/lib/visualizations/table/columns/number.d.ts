type Props = {
    column: {
        name: string;
        numberFormat?: string;
    };
    onChange: (...args: any[]) => any;
};
declare function initNumberColumn(column: any): {
    ({ row }: any): any;
    prepareData: (row: any) => {
        text: any;
    };
};
declare namespace initNumberColumn {
    var friendlyName: string;
    var Editor: ({ column, onChange }: Props) => JSX.Element;
}
export default initNumberColumn;
