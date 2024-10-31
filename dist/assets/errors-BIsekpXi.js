import{P as t,c as a}from"./prod-C7NUGfJK.js";import"./index-CVII2iTA.js";const s={r(){return new t({code:a.BadSignature,reason:"missing WEBVTT file header",line:1})},s(n,e){return new t({code:a.BadTimestamp,reason:`cue start timestamp \`${n}\` is invalid on line ${e}`,line:e})},t(n,e){return new t({code:a.BadTimestamp,reason:`cue end timestamp \`${n}\` is invalid on line ${e}`,line:e})},u(n,e,r){return new t({code:a.BadTimestamp,reason:`cue end timestamp \`${e}\` is greater than start \`${n}\` on line ${r}`,line:r})},y(n,e,r){return new t({code:a.BadSettingValue,reason:`invalid value for cue setting \`${n}\` on line ${r} (value: ${e})`,line:r})},x(n,e,r){return new t({code:a.UnknownSetting,reason:`unknown cue setting \`${n}\` on line ${r} (value: ${e})`,line:r})},w(n,e,r){return new t({code:a.BadSettingValue,reason:`invalid value for region setting \`${n}\` on line ${r} (value: ${e})`,line:r})},v(n,e,r){return new t({code:a.UnknownSetting,reason:`unknown region setting \`${n}\` on line ${r} (value: ${e})`,line:r})},T(n,e){return new t({code:a.BadFormat,reason:`format missing for \`${n}\` block on line ${e}`,line:e})}};export{s as ParseErrorBuilder};
