

export default class GlobalService {

    static Navigation = [
      {
        Link: "/",
        Name: "Главная"
       },
       {
        Link: "/Bucket",
        Name: "Корзина"
       },
       {
        Link: "/Order",
        Name: "Оформить заказ"
       },
       {
        Link: "/Publishers",
        Name: "Издатели"
       },
       {
        Link: "/Auth",
        Name: "Личный кабинет"
       },
    ]

    static setCookie(cookieName, cookieValue, expirationDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
      }

    static getCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');
        for(var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i].trim();
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
      }

      static exit() {
        this.setCookie("UserLogin","",0)
        this.setCookie("UserPassword","",0)
        sessionStorage.removeItem("UserLogin")
        sessionStorage.removeItem("serPassword")
      }

      static NumberValue(e,key,Array,SetArray) {
        if (e.target.value === "") {
          return;
        }
        let prevValue = Array[key]
        const NumbersValue = parseFloat(e.target.value)
        if (!isNaN(e.target.value))  
        {
          const NewArray = Array
          NewArray[key] = NumbersValue
          SetArray(NewArray)
        }
        else { 
          e.target.value = prevValue; 
        }
      }

      static getFormattedDate() {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; 
        const year = currentDate.getFullYear();
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
        return `${formattedDay}.${formattedMonth}.${year}`;
      }

      static GetLoginAndPassword() {
        let login = sessionStorage.getItem("UserLogin")
        let password = sessionStorage.getItem("UserPassword")
        if (login && password)
            return {Login: login, Password: password}
        login = GlobalService.getCookie("UserLogin")
        password = GlobalService.getCookie("UserPassword")
        return {Login: login, Password: password}
      }

}
