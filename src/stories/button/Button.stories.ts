import Button from "@/components/atoms/Button.vue";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      description: 'Tamanho do botão',
      options: ["x-small", "small", "default", "large", "x-large"],
      control: { type: 'radio' },
    },
    variant: {
      description: 'Estilo do botão',
      options: ['text', 'flat', 'elevated', 'tonal', 'outlined', 'plain'],
      control: { type: 'radio' },
    },
    color: {
      control: { type: 'color' },
    },
    backgroundColor: {
      control: { type: 'color' },
    }
  },
};

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args"/>',
});

export const ButtonExample = Template.bind({});
ButtonExample.args = {
  text: "Texto de exemplo",
  color: "blue",
};

export const ButtonDelete = Template.bind({});
ButtonDelete.args = {
  color: "red",
  variant: "text",
  icon: "mdi-delete-outline",
  size: "x-large"
};