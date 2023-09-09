import Card from "@/components/molecules/Card.vue";

export default {
  title: "Card",
  component: Card,
  argTypes: {
    ButtonVariant:{
      description: 'Estilo do botão',
      options: ['text' , 'flat' , 'elevated' , 'tonal' , 'outlined' , 'plain'],
      control: { type: 'radio' },
    },
  },
};

const Template = (args) => ({
  components: { Card },
  setup() {
    return { args };
  },
  template: '<Card v-bind="args"/>',
});

export const Card1 = Template.bind({});
Card1.args = {
  id: 1,
  question: 'tEDTGJHJK',
  answer: "blue",
};
 
