type Props = {
    column: {
        name: string;
        dateTimeFormat?: string;
    };
    onChange: (...args: any[]) => any;
};
declare function initDateTimeColumn(column: any): {
    ({ row }: any): string | JSX.Element;
    prepareData: (row: any) => {
        text: string | JSX.Element;
    };
};
declare namespace initDateTimeColumn {
    var friendlyName: string;
    var Editor: ({ column, onChange }: Props) => JSX.Element;
}
export default initDateTimeColumn;
