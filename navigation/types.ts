export type RootStackParamList = {
  Loading: undefined;
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
};

export type AppTabParamList = {
  AllProducts: undefined;
  Category: { categoryName: string };
};
