export const ruleEmpty = {validate: (val) => !!val, message: '空欄のままです。'};
export const ruleLength = { validate: (val) => val.length >= 3, message: 'Username length greater than 3'};
export const ruleNumEmpty = {validate: (val) => !!val && !isNaN(val), message: '数値ではない、または空欄のままです。'};
