import { createRule } from "../utils/create-rule.js";

const messageIds = Object.freeze({
  forbiddenSwitch: "`switch` statements are not allowed."
});

export const noSwitchRule = createRule({
  name: "no-switch",
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `switch` statements."
    },
    schema: [],
    messages: messageIds
  },
  defaultOptions: [],
  create: (context) => ({
    SwitchStatement: (node) => {
      context.report({
        node,
        messageId: "forbiddenSwitch"
      });
    }
  })
});
