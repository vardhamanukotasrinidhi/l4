/* eslint-disable no-undef */
const todo = require("../todo");
const { all, add, markAsComplete, overdue, dueToday, dueLater } = todo();
const today = new Date();
const yesterday = new Date(new Date().setDate(today.getDate() - 1));
const tommorow = new Date(new Date().setDate(today.getDate() + 1));

describe("TODO test suite", () => {
  beforeAll(() => {
    add({
      title: "good morning",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });
  });
  test("Add task", () => {
    let lengthBefore = all.length;
    add({
      title: "hello",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(all.length).toBe(lengthBefore + 1);
  });
  test("Mark task as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Over due tasks", () => {
    const count = overdue().length;
    add({
      title: "all the best",
      dueDate: yesterday.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(overdue().length).toBe(count + 1);
  });
  test("Due new Date(date) tasks", () => {
    const duetoday = dueToday().length;
    add({
      title: "good evening",
      dueDate: today.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueToday().length).toBe(duetoday + 1);
  });
  test("Due later tasks", () => {
    const due = dueLater().length;
    add({
      title: "please eat",
      dueDate: tommorow.toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(dueLater().length).toBe(due + 1);
  });
});
