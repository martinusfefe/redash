type Props = {
    column: {
        name: string;
        dateTimeFormat?: string;
    };
    onChange: (...args: any[]) => any;
};
declare function initDateTimeColumn(column: any): {
    ({ row }: any): any;
    prepareData: (row: any) => {
        text: any;
    };
};
declare namespace initDateTimeColumn {
    var friendlyName: string;
    var Editor: ({ column, onChange }: Props) => JSX.Element;
}
export default initDateTimeColumn;
