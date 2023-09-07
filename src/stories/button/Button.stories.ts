import Button from "@/components/atoms/Button.vue";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: "",
    size: "",
    text: "",
    color: "",
    backgroundColor: "",
    icon: "",
  },
};

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const Default = {
  args: {
    text: "Teste",
  },
};
