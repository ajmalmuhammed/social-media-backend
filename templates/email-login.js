
const login_subject_mail = "OTP: For Logging in @SocialMedia"


const login_message = (otp) =>{
    return `Dear User, \n\n` 
    + 'OTP for Login is : \n\n'
    + 'This OTP expires in 10 minutes'
    + ` ${otp}\n\n`
    + 'This is a auto-generated email. Please do not reply to this email.\n\n'
    + 'Regards\n'
    + 'Admin\n\n'
}

export {login_subject_mail, login_message};