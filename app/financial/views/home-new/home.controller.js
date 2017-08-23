import apiService from '../../resources/services/api';

window.randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};

window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    clearBlue: 'rgb(0, 203, 217)',
    clearYellow: 'rgb(255, 187, 68)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

function chartSetup() {

    var MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
    var config = {
        type: 'bar', //'line',
        data: {
            labels: MONTHS,
            datasets: [{
                backgroundColor: window.chartColors.clearBlue,
                borderColor: window.chartColors.clearBlue,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }, {
                backgroundColor: window.chartColors.clearYellow,
                borderColor: window.chartColors.clearYellow,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            },{
                backgroundColor: window.chartColors.clearBlue,
                borderColor: window.chartColors.clearBlue,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }, {
                backgroundColor: window.chartColors.clearYellow,
                borderColor: window.chartColors.clearYellow,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            },{
                backgroundColor: window.chartColors.clearBlue,
                borderColor: window.chartColors.clearBlue,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }, {
                backgroundColor: window.chartColors.clearYellow,
                borderColor: window.chartColors.clearYellow,
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor()
                ],
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title:{
                display:false,
                text:'Expenses'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    stacked: false,
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Mes',
                    },
                    // colorName: window.chartColors.grey
                }],
                yAxes: [{
                    stacked: false,
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Expenses'
                    }
                }]
            }
        }
    };
    // window.onload = function() {
    var ctx = document.getElementById("canvas").getContext("2d");
    
    window.myLine = new Chart(ctx, config);
    // };
    
    // document.getElementById('randomizeData').addEventListener('click', function() {
    //     config.data.datasets.forEach(function(dataset) {
    //         dataset.data = dataset.data.map(function() {
    //             return randomScalingFactor();
    //         });
    //     });
    //     window.myLine.update();
    // });
    // var colorNames = Object.keys(window.chartColors);
    // document.getElementById('addDataset').addEventListener('click', function() {
    //     var colorName = colorNames[config.data.datasets.length % colorNames.length];
    //     var newColor = window.chartColors[colorName];
    //     var newDataset = {
    //         label: 'Dataset ' + config.data.datasets.length,
    //         backgroundColor: newColor,
    //         borderColor: newColor,
    //         data: [],
    //         fill: false
    //     };
    //     for (var index = 0; index < config.data.labels.length; ++index) {
    //         newDataset.data.push(randomScalingFactor());
    //     }
    //     config.data.datasets.push(newDataset);
    //     window.myLine.update();
    // });
    // document.getElementById('addData').addEventListener('click', function() {
    //     if (config.data.datasets.length > 0) {
    //         var month = MONTHS[config.data.labels.length % MONTHS.length];
    //         config.data.labels.push(month);
    //         config.data.datasets.forEach(function(dataset) {
    //             dataset.data.push(randomScalingFactor());
    //         });
    //         window.myLine.update();
    //     }
    // });
    // document.getElementById('removeDataset').addEventListener('click', function() {
    //     config.data.datasets.splice(0, 1);
    //     window.myLine.update();
    // });
    // document.getElementById('removeData').addEventListener('click', function() {
    //     config.data.labels.splice(-1, 1); // remove the label first
    //     config.data.datasets.forEach(function(dataset, datasetIndex) {
    //         dataset.data.pop();
    //     });
    //     window.myLine.update();
    // });

}

class HomeController {
    constructor($timeout, $scope, $rootScope) {
        this.scope = $scope;
        this.scope.config = null;
        this.scope.current = null;
        this.scope.data = {
            currency: null,
            categories: null,
            users: null,
            wallets: null,
            transactions: null
        };

        this.rootScope = $rootScope;
        this.rootScope.menu = { 
            rootMenuStatus: false, 
            userMenuStatus: false  
        }
        this.rootScope.currentTemporality = 1;

        this.temporality = [
            { id: 1, name: "Monthly" },
            { id: 2, name: "Weekly" },
            { id: 3, name: "Annually" },
        ];

        this.transactionsFiltered = null;

        this.getData();

        chartSetup();

        this.myDate = new Date();
        this.isOpen = false;
        
        this.userState = '';
        this.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) { return { abbrev: state }; });

        // this.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        // this.series = ['Series A', 'Series B'];
        
        // this.data = [
        //     [65, 59, 80, 81, 56, 55, 40],
        //     [28, 48, 40, 19, 86, 27, 90]
        // ];
    }

    // New functions
    getData(source) {
        if(source) {
                apiService.call("/data/" + source).then((data) => {
                if(data) {
                    this.scope.data[source] = data;
                    this.scope.$apply();
                }
            });
        } else {
            apiService.call("/data/currency").then((data) => {
                if(data) {
                    this.scope.data.currency = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/categories").then((data) => {
                if(data) {
                    this.scope.data.categories = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/users").then((data) => {
                if(data) {
                    this.scope.data.users = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/wallets").then((data) => {
                if(data) {
                    this.scope.data.wallets = data;
                    this.scope.$apply();
                }
            });
            apiService.call("/data/transactions").then((data) => {
                if(data) {
                    this.scope.data.transactions = data;
                    this.updateTransactions();
                    this.scope.$apply();
                }
            });
            apiService.call("/data/config").then((data) => {
                if(data) {
                    this.scope.config = data;
                    // console.log('this.scope.config: ', this.scope.config);
                    this.scope.config.temporality = { id: 1, name: "Monthly" };
                    this.scope.$apply();
                }
            });
        }

        
    }

    toogleRootMenu() {
        if(this.rootScope.menu.rootMenuStatus) {
            this.rootScope.menu.rootMenuStatus = false;
        } else{
            this.rootScope.menu.rootMenuStatus = true;
        }
    }

    toogleUserMenu() {
        if(this.rootScope.menu.userMenuStatus) {
            this.rootScope.menu.userMenuStatus = false;
        } else{
            this.rootScope.menu.userMenuStatus = true;
        }
    }

    updateTransactions() {
        if(this.scope.data.transactions) {
            var min = new Date();
            var max = new Date();
            var temporality = this.rootScope.currentTemporality;
            if(temporality) {        
                var d = temporality == 1 ? 7 : 
                            temporality == 2 ? 30 : 
                                temporality == 3 ? 365 : 7;

                min.setDate(max.getDate() - d);
            }

            this.transactionsFiltered = this.scope.data.transactions.filter((item) => {
                return new Date(item.update) <= max && new Date(item.update) >= min;
            });
        } else {
            this.transactionsFiltered = null;
        }
        // console.log('this.transactionsFiltered: ', this.transactionsFiltered);
    }
}

HomeController.$inject = ['$timeout', '$scope', '$rootScope'];

export default HomeController;