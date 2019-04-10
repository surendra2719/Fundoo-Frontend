import firebase from 'firebase';
import axios from 'axios';
export const initializeFirebase = () => {
    firebase.initializeApp({
        messagingSenderId: "221030782365"
    });

    navigator.serviceWorker
        .register('/my-sw.js')
        .then((registration) => {
            firebase.messaging().useServiceWorker(registration);
        });
}



export const askForPermissioToReceiveNotifications = async (userdate, title, description) => {
    try {
        console.log("userdateuserdateuserdate==>", userdate);
      //  const messaging = firebase.messaging();
        //await messaging.requestPermission();
        //const token = await messaging.getToken();
      //  console.log('token:============>', token);
        var date = new Date()
        console.log("date-->0", date);
        var date1 = new Date(userdate)
        console.log("date1111-->0", date1);
        //var  compareDate = "2019-04-03 19:00:06"
        var diff = Math.abs(date1 - date);
        console.log("diff----->", diff);


        setTimeout(() => {
            var data = {
                "notification": {
                    "title": title,
                    "body": description,
                    // "click_action": "http://localhost:3000/",
                    // "icon": "http://url-to-an-icon/icon.png"
                },
                "to": "c_7XPRNbNhA:APA91bHCSDVI9_fhdRyUWEExDvScACLaOR_lv86uOUxIy5HowyBg8X4iPfK5CpFcLCMeHiwpzHL8ckPALJ06dHotR3NLnNmHW3sTQu9kaIR79LUKeXJVce-QOb_Q0SHiUv_KqDwWpDHC"
                //"cJCMyRmVwkc:APA91bEtLJYGyezRhjwsKXDCiPEBbg5Mj6aJljc1N-dXZeQP64ripxpIAcVljc4KcT4jog_3P7w0BoVeipgNplLoyXem6FYKuAaOvDRnfyCFSCZdlTaXtaW8tYXT71nZzbEuBF_LKJAf"
            }
            passmessage(data)
        }, diff);
        return diff;

    } catch (error) {
        console.error("errorrrrrrrrrrrrrrrrrr", error);
    }
}

function passmessage(data) {
    try {
        axios.post('https://fcm.googleapis.com/fcm/send', data, { headers: { 'Authorization': "key=AAAA942Y8qg:APA91bGbl3JVvh5u34lQWdnLt2K9ysBIORxGetwYOEtFlJhE4ef9u9ofPyCEqsrWvyHSR-18MWSUGUskt0NNtWIh0EA8us5YpceNRiEBgtDDAH3fgDn9E1pg_2ipksC5IlSMS9u-lrkf" } })
            .then((res) => {
                //return res;
                console.log("res----->", res);
            })
            .catch((err) => {
                console.log("errors==>", err);

            })
    } catch (error) {
        console.log("Error in resetpassword in userservices..");

    }
}
















