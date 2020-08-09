import { mount } from "enzyme";
import TaskListItem from "./TaskListItem";
import { Task } from "../models/TaskModal";

/** @test {Title Component} */
describe("Task List Item Component", () => {
  it("should render without crashing", () => {
    const task = new Task({ id: Date.now(), title: "test", status: "todo" });

    const wrapper = mount(<TaskListItem task={task} />);

    expect(wrapper.find("li")).toHaveLength(1);
  });
});
