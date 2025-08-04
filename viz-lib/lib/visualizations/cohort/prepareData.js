import _ from "lodash";
import moment from "moment";
var momentInterval = {
  weekly: "weeks",
  daily: "days",
  monthly: "months"
};
function groupData(sortedData) {
  var result = {};
  _.each(sortedData, item => {
    var date = moment(item.date);
    var groupKey = date.valueOf();
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    result[groupKey] = result[groupKey] || {
      date,
      total: parseInt(item.total, 10) || 0,
      values: {}
    };
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    result[groupKey].values[item.stage] = parseInt(item.value, 10) || null;
  });
  return _.values(result);
}
function prepareDiagonalData(sortedData, options) {
  var timeInterval = options.timeInterval;
  var grouped = groupData(sortedData);
  var firstStage = _.min(_.map(sortedData, i => i.stage));
  // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
  var stageCount = moment(_.last(grouped).date).diff(_.first(grouped).date, momentInterval[timeInterval]);
  var lastStage = firstStage + stageCount;
  var previousDate = null;
  var data = [];
  _.each(grouped, group => {
    if (previousDate !== null) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      var diff = Math.abs(previousDate.diff(group.date, momentInterval[timeInterval]));
      while (diff > 1) {
        var _row = [0];
        for (var stage = firstStage; stage <= lastStage; stage += 1) {
          // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
          _row.push(group.values[stage] || 0);
        }
        data.push(_row);
        // It should be diagonal, so decrease count of stages for each next row
        lastStage -= 1;
        diff -= 1;
      }
    }

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    previousDate = group.date;

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    var row = [group.total];
    for (var _stage = firstStage; _stage <= lastStage; _stage += 1) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      row.push(group.values[_stage] || 0);
    }
    // It should be diagonal, so decrease count of stages for each next row
    lastStage -= 1;
    data.push(row);
  });
  return data;
}
function prepareSimpleData(sortedData, options) {
  var timeInterval = options.timeInterval;
  var grouped = groupData(sortedData);
  var stages = _.map(sortedData, i => i.stage);
  var firstStage = _.min(stages);
  var lastStage = _.max(stages);
  var previousDate = null;
  var data = [];
  _.each(grouped, group => {
    if (previousDate !== null) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      var diff = Math.abs(previousDate.diff(group.date, momentInterval[timeInterval]));
      while (diff > 1) {
        data.push([0]);
        diff -= 1;
      }
    }

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    previousDate = group.date;

    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    var row = [group.total];
    for (var stage = firstStage; stage <= lastStage; stage += 1) {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      row.push(group.values[stage]);
    }
    data.push(row);
  });
  return data;
}
function isDataValid(rawData, options) {
  var columnNames = _.map(rawData.columns, c => c.name);
  return rawData.rows.length > 0 && _.includes(columnNames, options.dateColumn) && _.includes(columnNames, options.stageColumn) && _.includes(columnNames, options.totalColumn) && _.includes(columnNames, options.valueColumn);
}
export default function prepareData(rawData, options) {
  if (!isDataValid(rawData, options)) {
    return {
      data: [],
      initialDate: null
    };
  }
  rawData = _.map(rawData.rows, item => ({
    date: item[options.dateColumn],
    stage: parseInt(item[options.stageColumn], 10),
    total: parseFloat(item[options.totalColumn]),
    value: parseFloat(item[options.valueColumn])
  }));
  var sortedData = _.sortBy(rawData, r => r.date + r.stage);
  var initialDate = moment(sortedData[0].date).toDate();
  var data;
  switch (options.mode) {
    case "simple":
      data = prepareSimpleData(sortedData, options);
      break;
    default:
      data = prepareDiagonalData(sortedData, options);
      break;
  }
  return {
    data,
    initialDate
  };
}
//# sourceMappingURL=prepareData.js.map