
define(['ojs/ojcore', 
        'knockout', 
        'jquery', 
        'ojs/ojknockout', 
        'promise', 
        'ojs/ojtable', 
        'ojs/ojmodel', 
        'ojs/ojinputtext',
        'ojs/ojdialog',
        'ojs/ojinputnumber',
        'ojs/ojselectcombobox',
        'ojs/ojcollectiontabledatasource'],
 function(oj, ko, $) {
  
    function TimezonesViewModel() {
      var self = this;
      self.serviceURL = 'http://localhost:3000/Timezones';
      self.Timezones = ko.observableArray([]);
      self.TimezoneCol = ko.observable();
      self.datasource = ko.observable();
      self.somethingChecked = ko.observable(false);
      self.currentTimezoneName = ko.observable('default');
      self.workingId = ko.observable('');
                
      self.fetch = function (successCallBack) {
        // populate the collection by calling fetch()
        self.TimezoneCol().fetch({
          success: successCallBack, 
          error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error in fetch: ' + textStatus);
          }
        });
      };

      parseTimezone = function(response) {
        return {TimezoneId: response['id'],
                TimezoneName: response['name'],
                City: response['city'],
                GMTOffset: response['gmt_offset']
              };
      }

      function parseSaveTimezone(response) {
        return {id: response['id'], 
                name: response['name'], 
                city: response['city'],
                gmt_offset: response['gmt_offset']
              };
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
          console.log("in enable delete");
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
            var collection = data.TimezoneCol();
            timezoneIds.forEach(function(value, index, arr) {
                var model = collection.get(parseInt(value));
                if (model) {
                    collection.remove(model);
                    model.destroy();
                }
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

        self.updateTimezoneName = function(formData, event) {
            var currentId = self.workingId();
            var newName = formData.elements[0].value;
            if (newName != self.currentTimezoneName() && newName != '') {
                var myCollection = self.TimezoneCol();
                var myModel = myCollection.get(currentId);
                myModel.save({'TimezoneName': newName}, {
                    success: function(myModel, response, options) {
                        $('#editDialog').ojDialog('close');
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Update failed with: " + textStatus);
                        $('#editDialog').ojDialog('close');
                    }
                });
            } else {
                alert('Timezone Name is not different or the new name is not valid');
                $('#editDialog').ojDialog('close');
            }
        };

        // Create handler
        self.addTimezone = function (formElement, event) {
            var gmtOffset_hours = $("#newTimezoneGMTOffset_hours").val();
            if ((gmtOffset_hours < 10) && (gmtOffset_hours > -10) ) {
              if (gmtOffset_hours >= 0) {
                var gmtOffset_hours = '0' + gmtOffset_hours;
              } else {
                var gmtOffset_hours = '-' + '0' + Math.abs(gmtOffset_hours);
              }
            }
             
            var gmtOffset =  gmtOffset_hours + ':' + $("#newTimezoneGMTOffset_mins").val() + ':00';
            var recordAttrs = {name: $("#newTimezoneName").val(),
                               city: $("#newTimezoneCity").val(),
                               gmt_offset: gmtOffset,
                               };
            this.TimezoneCol().create(recordAttrs, {wait:true,
                'contentType': 'application/json',
                success: function (response) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error in Create: ' + textStatus);
                }
            });
        };

      var Timezone = oj.Model.extend({
                   urlRoot: self.serviceURL,
                   parse: parseTimezone,
                   parseSave: parseSaveTimezone,
                   idAttribute: 'TimezoneId'
      });

      var newTimezone = new Timezone();

      // this defines our collection and what models it will hold
      var TimezoneCollection = oj.Collection.extend({
        url: self.serviceURL,
        model: newTimezone,
        comparator: "TimezoneId"
      });

      self.TimezoneCol(new TimezoneCollection());
      self.datasource(new oj.CollectionTableDataSource(self.TimezoneCol()));

      self.handleActivated = function(info) {
        // Implement if needed
      };

    }

    return new TimezonesViewModel();
  }
);
