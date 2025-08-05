type Props = {
    column: {
        name: string;
        numberFormat?: string;
    };
    onChange: (...args: any[]) => any;
};
declare function initNumberColumn(column: any): {
    ({ row }: any): string | JSX.Element;
    prepareData: (row: any) => {
        text: string | JSX.Element;
    };
};
declare namespace initNumberColumn {
    var friendlyName: string;
    var Editor: ({ column, onChange }: Props) => JSX.Element;
}
export default initNumberColumn;
