
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
  
    function UsersViewModel() {
      var self = this;
      self.serviceURL = 'http://localhost:3000/Users';
      self.Users = ko.observableArray([]);
      self.UserCol = ko.observable();
      self.datasource = ko.observable();
      self.somethingChecked = ko.observable(false);
      self.currentUserName = ko.observable('default');
      self.workingId = ko.observable('');
                
      self.fetch = function (successCallBack) {
        // populate the collection by calling fetch()
        self.UserCol().fetch({
          success: successCallBack, 
          error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error in fetch: ' + textStatus);
          }
        });
      };

      parseUser = function(response) {
        return {UserId: response['id'],
                UserName: response['username'],
                FirstName: response['first_name'],
                Lastname: response['last_name'],
                RoleId: response['role_id'],
                Email: response['email']
              };
      }

      function parseSaveUser(response) {
        return {id: response['id'], 
                username: response['username'], 
                first_name: response['first_name'],
                last_name: response['last_name'],
                role_id: response['role_id'],
                email: response['email']
              };
      }

      self.findUserIds = function() {
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

        self.deleteUser = function(data, event) {
            var userIds = [];
            userIds = self.findUserIds();
            var collection = data.UserCol();
            userIds.forEach(function(value, index, arr) {
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
        self.showChangeNameDialog = function(userId, data, event) {
            var currName = data.UserName;
            self.workingId(userId);
            self.currentUserName(currName);
            $('#editDialog').ojDialog('open');
        }

        self.updateUserName = function(formData, event) {
            var currentId = self.workingId();
            var newName = formData.elements[0].value;
            if (newName != self.currentUserName() && newName != '') {
                var myCollection = self.UserCol();
                var myModel = myCollection.get(currentId);
                myModel.save({'UserName': newName}, {
                    success: function(myModel, response, options) {
                        $('#editDialog').ojDialog('close');
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Update failed with: " + textStatus);
                        $('#editDialog').ojDialog('close');
                    }
                });
            } else {
                alert('User Name is not different or the new name is not valid');
                $('#editDialog').ojDialog('close');
            }
        };

        // Create handler
        self.addUser = function (formElement, event) {
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
            this.UserCol().create(recordAttrs, {wait:true,
                'contentType': 'application/json',
                success: function (response) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('Error in Create: ' + textStatus);
                }
            });
        };

      var User = oj.Model.extend({
                   urlRoot: self.serviceURL,
                   parse: parseUser,
                   parseSave: parseSaveUser,
                   idAttribute: 'UserId'
      });

      var newUser = new User();

      // this defines our collection and what models it will hold
      var UserCollection = oj.Collection.extend({
        url: self.serviceURL,
        model: newUser,
        comparator: "UserId"
      });

      self.UserCol(new UserCollection());
      self.datasource(new oj.CollectionTableDataSource(self.UserCol()));

      self.handleActivated = function(info) {
        // Implement if needed
      };

    }

    return new UsersViewModel();
  }
);
