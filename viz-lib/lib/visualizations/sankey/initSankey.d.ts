import { SankeyDataType } from ".";
export type ExtendedSankeyDataType = Partial<SankeyDataType> & {
    nodes: any[];
    links: any[];
};
export default function initSankey(data: ExtendedSankeyDataType): (element: HTMLDivElement) => void;
