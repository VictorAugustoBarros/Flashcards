import CardUserList from "@/components/molecules/CardUserList.vue";

export default {
  title: "CardUserList",
  component: CardUserList,
};

const Template = (args) => ({
  components: { CardUserList },
  setup() {
    return { args };
  },
  template: '<CardUserList v-bind="args"/>',
});

export const CardUserList1 = Template.bind({});
CardUserList1.args = {
  cards: [{ "question": "Question1", "answer": "Answer1" }, { "question": "Question2", "answer": "Answer2" }, { "question": "Question3", "answer": "Answer3" }],
};
