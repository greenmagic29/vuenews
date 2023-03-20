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


    function subscribeUserToPush(subscribeOptions) {
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


    async function initServiceWorker() {
      console.log("🚀 ~ file: service-worker.js:5555 ~ Notification.permission:", Notification.permission)
      const publicKey = 'BGzOOtvoTdmQ4c0Ni-25XL7kF6xaDDUnXKewgqdY6MMcTpL_vjBf-rzzn97jUq4C2pHbvfXtXJeT569nyBXCNUw';
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey)
      };

      console.log("🚀 ~ file: service-worker.js:5555 ~ Notification.permission:", Notification.permission)
      if (Notification && Notification.permission !== "granted") {
        console.log("🚀 ~ file: service-worker.js:37 ~ Notification.permission:", Notification.permission)
        Notification.requestPermission().then((permission)=>{        
          if(permission === "granted") {
          subscribeUserToPush(subscribeOptions);
        }})


      }
      else if (Notification && Notification.permission === "granted"){
        // console.log("🚀 ~ file: service-worker.js:44 ~ Notification.permission:", Notification.permission)
        // const pushSubscription = subscribeUserToPush(subscribeOptions);
      }
    }
