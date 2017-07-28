// imports
import balanceChartDirective from './directives/balanceChart/balanceChart';
import collectionTransactionsDirective from './directives/collectionTransactions/collectionTransactions';
import headerBarDirective from './directives/headerBar/headerBar';
import heroScreenDirective from './directives/heroScreen/heroScreen';
import itemTransactionDirective from './directives/itemTransaction/itemTransaction';

var moduleName = "financiero.directives";

angular.module(moduleName, [])
    .directive('balanceChart', balanceChartDirective)
    .directive('collectionTransactions', collectionTransactionsDirective)
    .directive('headerBar', headerBarDirective)
    .directive('heroScreen', heroScreenDirective)
    .directive('itemTransaction', itemTransactionDirective);

export default moduleName;

