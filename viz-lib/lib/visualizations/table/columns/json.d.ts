declare function initJsonColumn(column: any): {
    ({ row }: any): JSX.Element;
    prepareData: (row: any) => {
        text: any;
        value: any;
    };
};
declare namespace initJsonColumn {
    var friendlyName: string;
}
export default initJsonColumn;
