export default function validateInfo(inputValue) {
   let errors = {};
   //name
   if (!inputValue.name) {
      errors.name = "name required";
   } else if (!/^[가-힣]+$/.test(inputValue.name)) {
      errors.name = "should be 한글";
   }
   // username
   if (!inputValue.username) {
      errors.username = "Username required";
   }

   //Email
   if (!inputValue.email) {
      errors.email = "email required";
   } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(inputValue.email)
   ) {
      errors.email = "Email address is invalid";
   }

   //phone
   if (!inputValue.phone) {
      errors.phone = "phone required";
   } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(inputValue.phone)) {
      errors.phone = "Phone number is wrong";
   }

   //webSite
   if (!inputValue.website) {
      errors.website = "website required";
   } else if (!/([a-z0-9\w]+\.*)+[a-z0-9]{2,4}/gi.test(inputValue.website)) {
      errors.website = "Website url is wrong";
   }
   return errors;
}
