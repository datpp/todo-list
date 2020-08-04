import { mount } from "enzyme";
import { describe, it, expect } from "jest";

import TaskListItem from "./TaskListItem";

/** @test {Title Component} */
describe("Task List Item Component", () => {
  it("should render without crashing", () => {
    const wrapper = mount(<TaskListItem status="todo" />);

    expect(wrapper.find("li")).toHaveLength(1);
  });
});
