const { evaluateCondition } = require("./evaluateCondition");

describe("evaluateCondition", () => {
  const data = {
    user: { age: 30, name: "Alice", tags: "admin,editor" },
    order: { total: 100 }
  };

  it("returns true for eq operator", () => {
    expect(
      evaluateCondition(
        { field: "$.user.age", operator: "eq", value_prop: { value: 30 } },
        data
      )
    ).toBe(true);
  });

  it("returns false for eq operator with wrong value", () => {
    expect(
      evaluateCondition(
        { field: "$.user.age", operator: "eq", value_prop: { value: 25 } },
        data
      )
    ).toBe(false);
  });

  it("returns true for ne operator", () => {
    expect(
      evaluateCondition(
        { field: "$.user.age", operator: "ne", value_prop: { value: 25 } },
        data
      )
    ).toBe(true);
  });

  it("returns true for gt operator", () => {
    expect(
      evaluateCondition(
        { field: "$.user.age", operator: "gt", value_prop: { value: 20 } },
        data
      )
    ).toBe(true);
  });

  it("returns true for lt operator", () => {
    expect(
      evaluateCondition(
        { field: "$.user.age", operator: "lt", value_prop: { value: 40 } },
        data
      )
    ).toBe(true);
  });

  it("returns true for contains operator", () => {
    expect(
      evaluateCondition(
        {
          field: "$.user.tags",
          operator: "contains",
          value_prop: { value: "admin" }
        },
        data
      )
    ).toBe(true);
  });

  it("returns false for unknown operator", () => {
    expect(
      evaluateCondition(
        { field: "$.user.age", operator: "unknown", value_prop: { value: 30 } },
        data
      )
    ).toBe(false);
  });

  it("returns false for invalid condition", () => {
    expect(
      evaluateCondition(
        { field: "", operator: "eq", value_prop: { value: 30 } },
        data
      )
    ).toBe(false);
  });

  it("handles AND logic", () => {
    const cond = {
      type: "AND",
      conditions: [
        { field: "$.user.age", operator: "eq", value_prop: { value: 30 } },
        { field: "$.order.total", operator: "gt", value_prop: { value: 50 } }
      ]
    };
    expect(evaluateCondition(cond, data)).toBe(true);
  });

  it("handles OR logic", () => {
    const cond = {
      type: "OR",
      conditions: [
        { field: "$.user.age", operator: "eq", value_prop: { value: 25 } },
        { field: "$.order.total", operator: "gt", value_prop: { value: 50 } }
      ]
    };
    expect(evaluateCondition(cond, data)).toBe(true);
  });

  it("handles NOT logic", () => {
    const cond = {
      type: "NOT",
      conditions: [
        { field: "$.user.age", operator: "eq", value_prop: { value: 25 } }
      ]
    };
    expect(evaluateCondition(cond, data)).toBe(true);
  });
});
