define(function () {
  //Do setup work here
  var serviceURL= "http://localhost:3000/";

  return {
            authRedirectIfNotLoggedIn: function(responseText) {
              if (responseText == "NOT_LOGGED_IN") {
                window.location = serviceURL + "login";
              }
            },
            createXHR: function(eventListener, path, crudOP, data) {
              var xhr = new XMLHttpRequest();
              xhr.addEventListener("load", eventListener);
              xhr.open(crudOP, serviceURL + path);
              if (crudOP === "POST") {
                xhr.setRequestHeader("Content-type", "application/json");
              }
              xhr.withCredentials = true;
              xhr.send(data ? JSON.stringify(data) : null);
              return xhr;
            }
        }
});


