"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = prepareData;
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const momentInterval = {
    weekly: "weeks",
    daily: "days",
    monthly: "months",
};
function groupData(sortedData) {
    const result = {};
    lodash_1.default.each(sortedData, item => {
        const date = (0, moment_1.default)(item.date);
        const groupKey = date.valueOf();
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        result[groupKey] = result[groupKey] || {
            date,
            total: parseInt(item.total, 10) || 0,
            values: {},
        };
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        result[groupKey].values[item.stage] = parseInt(item.value, 10) || null;
    });
    return lodash_1.default.values(result);
}
function prepareDiagonalData(sortedData, options) {
    const timeInterval = options.timeInterval;
    const grouped = groupData(sortedData);
    const firstStage = lodash_1.default.min(lodash_1.default.map(sortedData, i => i.stage));
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    const stageCount = (0, moment_1.default)(lodash_1.default.last(grouped).date).diff(lodash_1.default.first(grouped).date, momentInterval[timeInterval]);
    let lastStage = firstStage + stageCount;
    let previousDate = null;
    const data = [];
    lodash_1.default.each(grouped, group => {
        if (previousDate !== null) {
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            let diff = Math.abs(previousDate.diff(group.date, momentInterval[timeInterval]));
            while (diff > 1) {
                const row = [0];
                for (let stage = firstStage; stage <= lastStage; stage += 1) {
                    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                    row.push(group.values[stage] || 0);
                }
                data.push(row);
                // It should be diagonal, so decrease count of stages for each next row
                lastStage -= 1;
                diff -= 1;
            }
        }
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        previousDate = group.date;
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const row = [group.total];
        for (let stage = firstStage; stage <= lastStage; stage += 1) {
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            row.push(group.values[stage] || 0);
        }
        // It should be diagonal, so decrease count of stages for each next row
        lastStage -= 1;
        data.push(row);
    });
    return data;
}
function prepareSimpleData(sortedData, options) {
    const timeInterval = options.timeInterval;
    const grouped = groupData(sortedData);
    const stages = lodash_1.default.map(sortedData, i => i.stage);
    const firstStage = lodash_1.default.min(stages);
    const lastStage = lodash_1.default.max(stages);
    let previousDate = null;
    const data = [];
    lodash_1.default.each(grouped, group => {
        if (previousDate !== null) {
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            let diff = Math.abs(previousDate.diff(group.date, momentInterval[timeInterval]));
            while (diff > 1) {
                data.push([0]);
                diff -= 1;
            }
        }
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        previousDate = group.date;
        // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
        const row = [group.total];
        for (let stage = firstStage; stage <= lastStage; stage += 1) {
            // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
            row.push(group.values[stage]);
        }
        data.push(row);
    });
    return data;
}
function isDataValid(rawData, options) {
    const columnNames = lodash_1.default.map(rawData.columns, c => c.name);
    return (rawData.rows.length > 0 &&
        lodash_1.default.includes(columnNames, options.dateColumn) &&
        lodash_1.default.includes(columnNames, options.stageColumn) &&
        lodash_1.default.includes(columnNames, options.totalColumn) &&
        lodash_1.default.includes(columnNames, options.valueColumn));
}
function prepareData(rawData, options) {
    if (!isDataValid(rawData, options)) {
        return { data: [], initialDate: null };
    }
    rawData = lodash_1.default.map(rawData.rows, item => ({
        date: item[options.dateColumn],
        stage: parseInt(item[options.stageColumn], 10),
        total: parseFloat(item[options.totalColumn]),
        value: parseFloat(item[options.valueColumn]),
    }));
    const sortedData = lodash_1.default.sortBy(rawData, r => r.date + r.stage);
    const initialDate = (0, moment_1.default)(sortedData[0].date).toDate();
    let data;
    switch (options.mode) {
        case "simple":
            data = prepareSimpleData(sortedData, options);
            break;
        default:
            data = prepareDiagonalData(sortedData, options);
            break;
    }
    return { data, initialDate };
}
