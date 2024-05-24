export type BottomTabNavigationType = {
  HomeScreen: undefined;
  CategoryScreen: undefined;
  TransactionScreen: undefined;
  BudgetScreen: undefined;
};

type AppNavigationType = {
  SplashScreen: undefined;
  MainScreen: undefined;
  TransactionEditScreen: {
    id?: number
  };
};
export default AppNavigationType;
