const jsonpath = require("jsonpath");
// Helper function to evaluate a condition against data
function evaluateCondition(condition, data) {
  // For simple conditions (field, operator, value)
  if (condition.field && condition.operator) {
    let fieldValue;
    try {
      fieldValue = jsonpath.value(data, condition.field);
    } catch (error) {
      console.error(`Error evaluating JSONPath: ${condition.field}`, error);
      return false;
    }

    let compareValue = condition.value_prop?.value;

    // If the value_prop is a JSON path, extract it from the data
    if (condition.value_prop?.type === "json-path") {
      try {
        compareValue = jsonpath.value(data, condition.value_prop.value);
      } catch (error) {
        console.error(
          `Error evaluating value JSONPath: ${condition.value_prop.value}`,
          error
        );
        return false;
      }
    }

    // Evaluate based on operator
    switch (condition.operator) {
      case "eq":
        return fieldValue === compareValue;
      case "ne":
        return fieldValue !== compareValue;
      case "gt":
        return fieldValue > compareValue;
      case "lt":
        return fieldValue < compareValue;
      case "contains":
        return (
          fieldValue &&
          typeof fieldValue === "string" &&
          fieldValue.includes(compareValue)
        );
      default:
        console.error(`Unknown operator: ${condition.operator}`);
        return false;
    }
  }

  // For complex conditions (AND/OR/NOT)
  if (condition.type) {
    if (condition.type === "AND" && condition.conditions) {
      return condition.conditions.every((cond) =>
        evaluateCondition(cond, data)
      );
    }

    if (condition.type === "OR" && condition.conditions) {
      return condition.conditions.some((cond) => evaluateCondition(cond, data));
    }

    if (
      condition.type === "NOT" &&
      condition.conditions &&
      condition.conditions.length > 0
    ) {
      return !evaluateCondition(condition.conditions[0], data);
    }
  }

  return false;
}

module.exports = { evaluateCondition };
