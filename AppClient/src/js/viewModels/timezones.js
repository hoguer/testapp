define(['ojs/ojcore', 
        'knockout', 
        'jquery', 
        '../utilities/APIUtility',
        'ojs/ojknockout', 
        'promise', 
        'ojs/ojtable', 
        'ojs/ojmodel', 
        'ojs/ojinputtext',
        'ojs/ojdialog',
        'ojs/ojinputnumber',
        'ojs/ojselectcombobox',
        'ojs/ojcollectiontabledatasource'],
 function(oj, ko, $, APIUtility) {
  
    function TimezonesViewModel() {
      var self = this;
      self.Timezones = ko.observableArray([]);
      self.TimezoneCol = ko.observable();
      self.datasource = ko.observable();
      self.somethingChecked = ko.observable(false);
      self.currentTimezoneName = ko.observable('default');
      self.workingId = ko.observable('');

      function convertGMTOffset(hourViewId, minuteViewId) {
          var gmtOffset_hours = $("#" + hourViewId).val();
          if ((gmtOffset_hours < 10) && (gmtOffset_hours > -10) ) {
            if (gmtOffset_hours >= 0) {
              var gmtOffset_hours = '0' + gmtOffset_hours;
            } else {
              var gmtOffset_hours = '-' + '0' + Math.abs(gmtOffset_hours);
            }
          }
          return  gmtOffset_hours + ':' + $("#" + minuteViewId).val() + ':00';
      }

      self.findTimezoneIds = function() {
        var selectedIdsArray = [];
        $("input:checkbox").each(function() {
              var cb = $(this);
              if (cb.is(":checked")) {
                  selectedIdsArray.push(cb.attr("id"));
              }
          });
          return selectedIdsArray;
      }

      // Deletion handlers/helpers
        self.enableDelete = function() {
            if (!$('input[type=checkbox]:checked').length) {
                self.somethingChecked(false);
            } else {
                self.somethingChecked(true);
            }
            return true;
        }

        self.deleteTimezone = function(data, event) {
            var timezoneIds = [];
            timezoneIds = self.findTimezoneIds();
            timezoneIds.forEach(function(value, index, arr) {
                var model = collection.get(parseInt(value));
            });
            self.enableDelete();
            $('#demoTable').ojTable('refresh');
        }

        // Update handlers/helpers
        self.showChangeNameDialog = function(timezoneId, data, event) {
            var currName = data.TimezoneName;
            self.workingId(timezoneId);
            self.currentTimezoneName(currName);
            $('#editDialog').ojDialog('open');
        }

      self.updateTimezone = function(formData, event) {
          var currentId = self.workingId();
          var newName = formData.elements[0].value;
          if (newName != self.currentTimezoneName() && newName != '') {
              var myCollection = self.TimezoneCol();
              var myModel = myCollection.get(currentId);
          } else {
              alert('Timezone Name is not different or the new name is not valid');
              $('#editDialog').ojDialog('close');
          }
      };

      function addTimezoneReqListener () {
        APIUtility.authRedirectIfNotLoggedIn(this.responseText);
        console.log(JSON.parse(this.responseText));
        self.Timezones.push(JSON.parse(this.responseText));
      }

      // Create handler
      self.addTimezone = function (formElement, event) {
          var gmtOffset =  convertGMTOffset("newTimezoneGMTOffset_hours","newTimezoneGMTOffset_mins");
          var recordAttrs = {name: $("#newTimezoneName").val(),
                             city: $("#newTimezoneCity").val(),
                             gmt_offset: gmtOffset,
                             };
          var xhr = APIUtility.createXHR(addTimezoneReqListener,"Timezones","POST",recordAttrs);
      };

      self.datasource= new oj.ArrayTableDataSource(self.Timezones, {idAttribute: "id"});


      self.handleActivated = function(info) {
        // Implement if needed
      };

      function getTimezonesReqListener () {
        APIUtility.authRedirectIfNotLoggedIn(this.responseText);
        self.Timezones(JSON.parse(this.responseText));
      }
      var xhr = APIUtility.createXHR(getTimezonesReqListener,"Timezones","GET");

    }

    return new TimezonesViewModel();
  }
);
