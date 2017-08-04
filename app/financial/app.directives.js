// imports
// # PAGES 
import currencyPage from './directives/currency/currency';
import walletsPage from './directives/wallets/wallets';
import categoriesPage from './directives/categories/categories';
import transactionsPage from './directives/wallets/wallets';
import usersPage from './directives/users/users';

// # COMPONENTS
import balanceChartDirective from './directives/balanceChart/balanceChart';
import collectionTransactionsDirective from './directives/collectionTransactions/collectionTransactions';
import headerBarDirective from './directives/headerBar/headerBar';
import heroScreenDirective from './directives/heroScreen/heroScreen';
import itemTransactionDirective from './directives/itemTransaction/itemTransaction';

var moduleName = "financiero.directives";

angular.module(moduleName, [])
    .directive('currencyPage', currencyPage)
    .directive('usersPage', usersPage)
    .directive('transactionsPage', transactionsPage)
    .directive('categoriesPage', categoriesPage)
    .directive('walletsPage', walletsPage)
    .directive('balanceChart', balanceChartDirective)
    .directive('collectionTransactions', collectionTransactionsDirective)
    .directive('headerBar', headerBarDirective)
    .directive('heroScreen', heroScreenDirective)
    .directive('itemTransaction', itemTransactionDirective);

export default moduleName;

