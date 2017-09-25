define(['ojs/ojcore', 'knockout', './utilities/APIUtility', 'ojs/ojrouter', 'ojs/ojknockout', 'ojs/ojarraytabledatasource',
  'ojs/ojoffcanvas'],
  function(oj, ko, APIUtility) {
     function ControllerViewModel() {

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);
      var mdQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.MD_UP);
      self.mdScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(mdQuery);

       // Router setup
       self.router = oj.Router.rootInstance;
       self.router.configure({
         'timezones': {label: 'Timezones', isDefault: true},
         'users': {label: 'Users'},
       });
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();

      // Navigation setup
      var navData = [
      {name: 'Timezones', id: 'timezones',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-26 clockface-icon'},
      {name: 'Users', id: 'users',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'}
      ];
      self.navDataSource = new oj.ArrayTableDataSource(navData, {idAttribute: 'id'});

      // Drawer
      // Close offcanvas on medium and larger screens
      self.mdScreen.subscribe(function() {oj.OffcanvasUtils.close(self.drawerParams);});
      self.drawerParams = {
        displayMode: 'push',
        selector: '#navDrawer',
        content: '#pageContent'
      };
      // Called by navigation drawer toggle button and after selection of nav drawer item
      self.toggleDrawer = function() {
        return oj.OffcanvasUtils.toggle(self.drawerParams);
      }

      // Dropdown menu states
      self.menuItemSelect = function (event, ui) {
        switch (ui.item.attr("id")) {
          case "out":
            window.location = APIUtility.serviceURL + "signout";
            break;
          default:
        }
      };

      // Add a close listener so we can move focus back to the toggle button when the drawer closes
      $("#navDrawer").on("ojclose", function() { $('#drawerToggleButton').focus(); });

      // Header
      // User Info used in Global Navigation area
      function reqListener () {
        APIUtility.authRedirectIfNotLoggedIn(this.responseText);
        var user = JSON.parse(this.responseText);
        self.userLogin = ko.observable(user.email);
      }
      var xhr = APIUtility.createXHR(reqListener,"Users/getCurrentUser","GET");
     }

     return new ControllerViewModel();
  }
);
