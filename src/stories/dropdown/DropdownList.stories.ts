import DropdownList from "@/components/atoms/DropdownList.vue";

export default {
  title: "DropdownList",
  component: DropdownList
};

const Template = (args) => ({
  components: { DropdownList },
  setup() {
    return { args };
  },
  template: '<DropdownList v-bind="args"/>',
});

export const DropdownList1 = Template.bind({});
DropdownList1.args = {
  label: "Teste",
  items: ["1", "2", "3"],
  title: "Title",
  value: "123"
};
