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
  
    function UsersViewModel() {
      var self = this;
      self.emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$';
      self.Users = ko.observableArray([]);
      self.datasource = ko.observable();
      self.somethingChecked = ko.observable(false);
      self.currentUser = ko.observable({'username': '', 'first_name': '', 'last_name': '', 'email' : '', 'role_id' : 2});
      self.workingId = ko.observable('');

      function getRoleId(role_name) {
        switch(role_name) {
          case "admin":
              return '1';
          case "manager":
              return '3';
          default: //user
              return '2';
        }
      }

      self.findUserIds = function() {
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

        self.deleteUser = function(data, event) {
            var userIds = self.findUserIds();
            var xhr = APIUtility.createXHR(null,"Users/" + JSON.stringify(userIds),"DELETE");
            var newUsers = self.Users().filter(function( obj ) {
              return !userIds.includes(obj.id);
            });
            self.Users(newUsers);
            self.enableDelete();
            $('#demoTable').ojTable('refresh');
        }

        // Update handlers/helpers
        self.showChangeUserDialog = function(userId, data, event) {
            self.workingId(userId);
            data.role_id = getRoleId(data.role_name);
            $('#editRole').val(data.role_id);
            self.currentUser(data);
            $('#editDialog').ojDialog('open');
        }

      function updateUserReqListener () {
        APIUtility.authRedirectIfNotLoggedIn(this.responseText);
        let response = JSON.parse(this.responseText);
        for (var tz in self.Users()) {
          if (self.Users()[tz].id == response.id) {
            self.Users.replace(self.Users()[tz], response);
            break; 
          }
        }
        $('#editDialog').ojDialog('close');
      }

      self.updateUser = function(formData, event) {
          var currentId = self.workingId();
          var recordAttrs = {username: $("#editUserName").val(),
                             first_name: $("#editFirstName").val(),
                             last_name: $("#editLastName").val(),
                             email: $("#editEmail").val(),
                             role_id: $("#editRole").val()
                            };
          var xhr = APIUtility.createXHR(updateUserReqListener,"Users/" + currentId, "PUT", recordAttrs);

      };

      function addUserReqListener () {
        APIUtility.authRedirectIfNotLoggedIn(this.responseText);
        console.log(this.responseText);
        self.Users.push(JSON.parse(this.responseText));
      }

      // Create handler
      self.addUser = function (formElement, event) {
          var recordAttrs = {username: $("#newUserName").val(),
                             first_name: $("#newUserFirstName").val(),
                             last_name: $("#newUserLastName").val(),
                             email: $("#newUserEmail").val(),
                             role_id: $("#newUserRole").val(),
                             password: $("#newUserPassword").val()
                             };
          var xhr = APIUtility.createXHR(addUserReqListener,"Users","POST",recordAttrs);
      };

      self.datasource= new oj.ArrayTableDataSource(self.Users, {idAttribute: "id"});

      function getUsersReqListener () {
        APIUtility.authRedirectIfNotLoggedIn(this.responseText);
        self.Users(JSON.parse(this.responseText));
      }
      var xhr = APIUtility.createXHR(getUsersReqListener,"Users","GET");

    }

    return new UsersViewModel();
  }
);
