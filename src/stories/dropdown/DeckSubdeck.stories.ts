import DeckSubdeckDropdownList from "@/components/molecules/DeckSubdeckDropdownList.vue";
import { loginUser } from "@/services/users";
import { useAuthStore } from "@/store/app";


const variables = {
  "email": "teste@teste.com",
  "password": "teste123"
}
const loginResponse = await loginUser(variables.email, variables.password)
if (loginResponse.response.success) {
  const jwt_token = loginResponse.jwt_token;
  
  // useAuthStore().setToken(jwt_token);
}

export default {
  title: "DeckSubdeckDropdownList",
  component: DeckSubdeckDropdownList
};

const Template = (args) => ({
  components: { DeckSubdeckDropdownList },
  setup() {
    return { args };
  },
  template: '<DeckSubdeckDropdownList v-bind="args"/>',
});

export const DeckSubdeckDropdownList1 = Template.bind({});
DeckSubdeckDropdownList1.args = {
  decks: [{ "id": 1, "name": "Japonês", "description": "Estudo da língua japonesa" }, { "id": 25, "name": "Português ", "description": "Teste123" }, { "id": 26, "name": "asdasd", "description": "asdasda" }, { "id": 27, "name": "asdasdasd", "description": "asdasdasd" }, { "id": 28, "name": "asdasdas", "description": "dasdasda" }, { "id": 29, "name": "fsdfsdf", "description": "sdfsdfdsfdsasdasdasdasdasdasds" }, { "id": 30, "name": "asdasd", "description": "asdasd" }, { "id": 31, "name": "asdas", "description": "dasdas" }]
};
