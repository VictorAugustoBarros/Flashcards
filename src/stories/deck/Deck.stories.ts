import Deck from "@/components/molecules/Deck.vue";

export default {
  title: "Deck",
  component: Deck,
  argTypes: {
    name: {
      description: 'Nome do Deck',
    },
    description: {
      description: 'Descrição do Deck',
    },
    height: {
      description: 'Altura do Deck', 
    },
    width: {
      description: 'Largura do Deck', 
    }
  },
};

const Template = (args) => ({
  components: { Deck },
  setup() {
    return { args };
  },
  template: '<Deck v-bind="args"/>',
});

export const Deck1 = Template.bind({});
Deck1.args = {
  name: "Deck Teste",
  description: 'Descriçao Teste'
};
 
