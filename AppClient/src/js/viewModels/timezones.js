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
      self.datasource = ko.observable();
      self.somethingChecked = ko.observable(false);
      self.currentTimezone = ko.observable({'name': '', 'city': '', 'gmt_offset_hours': 0, 'gmt_offset_mins' : ''});
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

      function getHoursFromGMTOffset(gmt_offset) {
        let hour_string = gmt_offset.split(":")[0];
        return parseInt(hour_string);
      }
      function getMinutesFromGMTOffset(gmt_offset) {
        return gmt_offset.split(":")[1];
      }

      self.findTimezoneIds = function() {
        var selectedIdsArray = [];
        $("input:checkbox").each(function() {
              var cb = $(this);
              if (cb.is(":checked")) {
                  selectedIdsArray.push(parseInt(cb.attr("id")));
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
            var timezoneIds = self.findTimezoneIds();
            var xhr = APIUtility.createXHR(null,"Timezones/" + JSON.stringify(timezoneIds),"DELETE");
            var newTimezones = self.Timezones().filter(function( obj ) {
              return !timezoneIds.includes(obj.id);
            });
            self.Timezones(newTimezones);
            self.enableDelete();
            $('#demoTable').ojTable('refresh');
        }

        // Update handlers/helpers
        self.showChangeTimezoneDialog = function(timezoneId, data, event) {
            self.workingId(timezoneId);
            data.gmt_offset_hours = getHoursFromGMTOffset(data.gmt_offset);
            data.gmt_offset_mins = getMinutesFromGMTOffset(data.gmt_offset);
            self.currentTimezone(data);
            $('#newOffset_mins').val(data.gmt_offset_mins);
            $('#editDialog').ojDialog('open');
        }

      function updateTimezoneReqListener () {
        APIUtility.authRedirectIfNotLoggedIn(this.responseText);
        let response = JSON.parse(this.responseText);
        for (var tz in self.Timezones()) {
          if (self.Timezones()[tz].id == response.id) {
            self.Timezones.replace(self.Timezones()[tz], response);
            break; 
          }
        }
        $('#editDialog').ojDialog('close');
      }

      self.updateTimezone = function(formData, event) {
          var currentId = self.workingId();
          var gmtOffset =  convertGMTOffset("newOffset_hours","newOffset_mins");
          var recordAttrs = {name: $("#newName").val(),
                             city: $("#newCity").val(),
                             gmt_offset: gmtOffset
                            };
          var xhr = APIUtility.createXHR(updateTimezoneReqListener,"Timezones/" + currentId, "PUT", recordAttrs);

      };

      function addTimezoneReqListener () {
        APIUtility.authRedirectIfNotLoggedIn(this.responseText);
        self.Timezones.push(JSON.parse(this.responseText));
      }

      // Create handler
      self.addTimezone = function (formElement, event) {
          var gmtOffset =  convertGMTOffset("newTimezoneGMTOffset_hours","newTimezoneGMTOffset_mins");
          var recordAttrs = {name: $("#newTimezoneName").val(),
                             city: $("#newTimezoneCity").val(),
                             gmt_offset: gmtOffset
                             };
          var xhr = APIUtility.createXHR(addTimezoneReqListener,"Timezones","POST",recordAttrs);
      };

      self.datasource= new oj.ArrayTableDataSource(self.Timezones, {idAttribute: "id"});

      function getTimezonesReqListener () {
        APIUtility.authRedirectIfNotLoggedIn(this.responseText);
        self.Timezones(JSON.parse(this.responseText));
      }
      var xhr = APIUtility.createXHR(getTimezonesReqListener,"Timezones","GET");

    }

    return new TimezonesViewModel();
  }
);
