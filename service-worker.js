    function urlBase64ToUint8Array(base64String) {
      var padding = '='.repeat((4 - base64String.length % 4) % 4);
      var base64 = (base64String + padding)
          .replace(/\-/g, '+')
          .replace(/_/g, '/');

      var rawData = window.atob(base64);
      var outputArray = new Uint8Array(rawData.length);

      for (var i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    }

    const publicKey = 'BGzOOtvoTdmQ4c0Ni-25XL7kF6xaDDUnXKewgqdY6MMcTpL_vjBf-rzzn97jUq4C2pHbvfXtXJeT569nyBXCNUw';
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey)
    };

    function subscribeUserToPush() {
      return navigator.serviceWorker.register('./sw.js')
      .then(function(registration) {
        //registration.showNotification('test');
        return registration.pushManager.subscribe(subscribeOptions);
      })
      .then(function(pushSubscription) {
        console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
        return pushSubscription;
      });
    }

    if (Notification && Notification.permission !== "granted") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }

    const pushSubscription = subscribeUserToPush();
