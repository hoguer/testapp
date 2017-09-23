/**
 * Copyright (c) 2014, 2017, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your customer ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojchart', 'promise', 'ojs/ojtable', 'ojs/ojarraytabledatasource'],
 function(oj, ko, $) {
  
    function CustomerViewModel() {
      var self = this;
      // Below are a subset of the ViewModel methods invoked by the ojModule binding
      // Please reference the ojModule jsDoc for additionaly available methods.

      /**
       * Optional ViewModel method invoked when this ViewModel is about to be
       * used for the View transition.  The application can put data fetch logic
       * here that can return a Promise which will delay the handleAttached function
       * call below until the Promise is resolved.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @return {Promise|undefined} - If the callback returns a Promise, the next phase (attaching DOM) will be delayed until
       * the promise is resolved
       */

               /* chart data */
      var lineSeries = [{name : "Series 2", items : [50, 38, 46, 54, 42]}];
    
      var lineGroups = ["2012", "2013", "2014", "2015", "2016"];

      this.lineSeriesValue = ko.observableArray(lineSeries);
      this.lineGroupsValue = ko.observableArray(lineGroups);


          var deptArray = [{AnomalyId: 20016, DepartmentName: 'Marketing', UserName: 'Jessica Jones', EventDate: '11/15/2016 7:28AM'},
        {AnomalyId: 10015, DepartmentName: 'ADFPM 1001 neverending', UserName: 'Raghavender Paralkar', EventDate: '5/12/2014 9:44PM'},
        {AnomalyId: 556, DepartmentName: 'BB', UserName: 'Stephanie Higgins', EventDate: '11/15/2016 5:38AM'},
        {AnomalyId: 10, DepartmentName: 'Administration', UserName: 'Chris Gurley', EventDate: '2/23/2015 5:40PM'},
        {AnomalyId: 20, DepartmentName: 'Marketing', UserName: 'James Perkins', EventDate: '10/12/2012 3:56AM'},
        {AnomalyId: 30, DepartmentName: 'Purchasing', UserName: 'Rachel Smith', EventDate: '2/13/2015 5:40PM'},
        {AnomalyId: 40, DepartmentName: 'Human Resources1', UserName: 'Marlin Peters', EventDate: '6/12/2014 9:44PM'},
        {AnomalyId: 50, DepartmentName: 'Administration2', UserName: 'Jeff Gibson', EventDate: '2/13/2015 3:40PM'},
        {AnomalyId: 60, DepartmentName: 'Marketing3', UserName: 'Rahul Herwadkar', EventDate: '6/12/2014 6:22AM'},
        {AnomalyId: 70, DepartmentName: 'Purchasing4', UserName: 'Peter Parker', EventDate: '2/13/2015 3:44PM'},
        {AnomalyId: 80, DepartmentName: 'Human Resources5', UserName: 'Xiaobin Chen', EventDate: '6/12/2014 6:56AM'},
        {AnomalyId: 90, DepartmentName: 'Human Resources11', UserName: 'Chris Gurley', EventDate: '9/10/2017 3:54PM'},
        {AnomalyId: 100, DepartmentName: 'Administration12', UserName: 'James Perkins', EventDate: '2/2/2015 3:44PM'},
        {AnomalyId: 110, DepartmentName: 'Marketing13', UserName: 'Marlin Peters', EventDate: '9/10/2017 3:55PM'},
        {AnomalyId: 120, DepartmentName: 'Purchasing14', UserName: 'Xiaobin Chen', EventDate: '10/12/2012 3:56AM'},
        {AnomalyId: 130, DepartmentName: 'Human Resources15', UserName: 'Rahul Herwadkar', EventDate: '9/11/2016 3:55PM'},
        {AnomalyId: 1001, DepartmentName: 'ADFPM 1001 neverending', UserName: 'Peter Parker', EventDate: '2/2/2015 3:44PM'},
        {AnomalyId: 55611, DepartmentName: 'BB', UserName: 'Stephanie Higgins', EventDate: '9/11/2016 3:55AM'},
        {AnomalyId: 1011, DepartmentName: 'Administration', UserName: 'Chris Gurley', EventDate: '6/12/2014 6:56AM'},
        {AnomalyId: 2011, DepartmentName: 'Marketing', UserName: 'Marlin Peters', EventDate: '7/11/2016 4:35AM'},
        {AnomalyId: 3011, DepartmentName: 'Purchasing', UserName: 'Chen Zhou', EventDate: '2/2/2015 3:44PM'},
        {AnomalyId: 4011, DepartmentName: 'Human Resources1', UserName: 'Peter Parker', EventDate: '7/11/2016 4:45AM'},
        {AnomalyId: 5011, DepartmentName: 'Administration2', UserName: 'Xiaobin Chen', EventDate: '10/12/2012 3:56AM'},
        {AnomalyId: 6011, DepartmentName: 'Marketing3', UserName: 'Jeff Gibson', EventDate: '7/12/2016 4:45AM'},
        {AnomalyId: 7011, DepartmentName: 'Purchasing4', UserName: 'Rahul Herwadkar', EventDate: '2/2/2015 3:44PM'},
        {AnomalyId: 8011, DepartmentName: 'Human Resources5', UserName: 'Peter Parker', EventDate: '1/12/2016 4:45AM'},
        {AnomalyId: 9011, DepartmentName: 'Human Resources11', UserName: 'Chris Gurley', EventDate: '4/12/2015 9:44PM'},
        {AnomalyId: 10011, DepartmentName: 'Administration12', UserName: 'Chen Zhou', EventDate: '1/13/2016 4:45AM'},
        {AnomalyId: 11011, DepartmentName: 'Marketing13', UserName: 'Peter Parker', EventDate: '6/12/2014 6:56AM'},
        {AnomalyId: 12011, DepartmentName: 'Purchasing14', UserName: 'Chen Zhou', EventDate: '1/13/2013 4:45AM'},
        {AnomalyId: 13011, DepartmentName: 'Human Resources15', UserName: 'Marlin Peters', EventDate: '10/12/2012 3:56AM'},
        {AnomalyId: 100111, DepartmentName: 'ADFPM 1001 neverending', UserName: 'Xiaobin Chen', EventDate: '1/13/2013 1:45AM'},
        {AnomalyId: 55622, DepartmentName: 'BB', UserName: 'Chris Gurley', EventDate: '1/13/2013 1:15AM'},
        {AnomalyId: 1022, DepartmentName: 'Administration', UserName: 'Claire Arlint', EventDate: '6/12/2014 6:56AM'},
        {AnomalyId: 2022, DepartmentName: 'Marketing', UserName: 'Jeff Gibson', EventDate: '1/13/2013 1:17PM'},
        {AnomalyId: 3022, DepartmentName: 'Purchasing', UserName: 'James Perkins', EventDate: '4/12/2015 9:44PM'},
        {AnomalyId: 4022, DepartmentName: 'Human Resources1', UserName: 'Chen Zhou', EventDate: '10/12/2012 3:56AM'},
        {AnomalyId: 5022, DepartmentName: 'Administration2', UserName: 'Rahul Herwadkar', EventDate: '1/19/2013 1:17PM'},
        {AnomalyId: 6022, DepartmentName: 'Marketing3', UserName: 'James Perkins', EventDate: '6/12/2014 6:56AM'},
        {AnomalyId: 7022, DepartmentName: 'Purchasing4', UserName: 'Peter Parker', EventDate: '1/4/2013 1:17PM'},
        {AnomalyId: 8022, DepartmentName: 'Human Resources5', UserName: 'Chen Zhou', EventDate: '2/4/2013 1:17PM'},
        {AnomalyId: 9022, DepartmentName: 'Human Resources11', UserName: 'Jeff Gibson', EventDate: '12/4/2013 7:17PM'},
        {AnomalyId: 10022, DepartmentName: 'Administration12', UserName: 'Rahul Herwadkar', EventDate: '10/12/2012 3:56AM'},
        {AnomalyId: 11022, DepartmentName: 'Marketing13', UserName: 'James Perkins', EventDate: '12/4/2013 7:28PM'},
        {AnomalyId: 12022, DepartmentName: 'Purchasing14', UserName: 'Stephanie Higgins', EventDate: '12/4/2013 7:28AM'},
        {AnomalyId: 13022, DepartmentName: 'Human Resources15', UserName: 'Rachel Smith', EventDate: '4/12/2015 9:44PM'}];
    self.datasource = new oj.ArrayTableDataSource(deptArray, {idAttribute: 'AnomalyId'});

      self.handleActivated = function(info) {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {boolean} info.fromCache - A boolean indicating whether the module was retrieved from cache.
       */
      self.handleAttached = function(info) {
        // Implement if needed
      };


      /**
       * Optional ViewModel method invoked after the bindings are applied on this View. 
       * If the current View is retrieved from cache, the bindings will not be re-applied
       * and this callback will not be invoked.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       */
      self.handleBindingsApplied = function(info) {
        // Implement if needed
      };

      /*
       * Optional ViewModel method invoked after the View is removed from the
       * document DOM.
       * @param {Object} info - An object with the following key-value pairs:
       * @param {Node} info.element - DOM element or where the binding is attached. This may be a 'virtual' element (comment node).
       * @param {Function} info.valueAccessor - The binding's value accessor.
       * @param {Array} info.cachedNodes - An Array containing cached nodes for the View if the cache is enabled.
       */
      self.handleDetached = function(info) {
        // Implement if needed
      };
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constrcuted
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new CustomerViewModel();
  }
);
