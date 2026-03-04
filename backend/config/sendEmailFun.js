import sendEmail from "./emailService.js"

async function sendEmailFun({sendTo,subject,text}){
   const result  = await sendEmail(sendTo,subject,text);
   if(result.success){
     return true;
   }else{
    return false;
   }
}

export default sendEmailFun