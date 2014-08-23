window.RegraDeTres.service('AnalyticsService', [AnalyticsServiceCreator]);

function AnalyticsServiceCreator() {
  this.initialize = function() {
    ga('create', 'UA-21225035-3', 'regradetr.es');
    ga('send', 'pageview');
  }

  this.send = function(event, label, value) {
    ga('send', 'event', event, label, value);
  }
};
