// services/smsService.js
import axios from "axios";

// ✅ Send OTP for Login
export const sendOtpToMemberForLogin = async (phoneNumber, otp, userName) => {
    try {
        if (!process.env.SMS_LOGIN_API || !process.env.SMS_LOGIN_AUTHORIZATION_KEY) {
            throw new Error("Missing SMS API configuration");
        }

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.SMS_LOGIN_AUTHORIZATION_KEY}==`,
        };

        const data = {
            Text: `नमस्ते ${userName},VivahMahurat में लॉगिन के लिए आपका OTP है ${otp}.जानकारी के लिए कॉल करें - 9827072993 VivahMahurat`,
            Number: `91${phoneNumber}`,
            SenderId: "AANSHI",
            DRNotifyUrl: "https://www.domainname.com/notifyurl",
            DRNotifyHttpMethod: "POST",
            Tool: "API",
        };

        const response = await axios.post(process.env.SMS_LOGIN_API, data, { headers });
        console.log("OTP sent response:", response.data);
        return { success: true, otp, response: response.data };
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw new Error("Failed to send OTP: " + error.message);
    }
};

// ✅ Registration Success SMS
export const sendRegistrationSuccessSmS = async (phoneNumber, userName) => {
    try {
        if (!process.env.SMS_LOGIN_API || !process.env.SMS_LOGIN_AUTHORIZATION_KEY) {
            throw new Error("Missing SMS API configuration");
        }

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.SMS_LOGIN_AUTHORIZATION_KEY}==`,
        };

        const data = {
            Text: `नमस्ते,vivahmahurat मैं आपका रजिस्ट्रेशन हो गया है.जल्दी आपका एक्टिवेशन हो जायेगा.जानकारी के लिए कॉल करें - 9827072993`,
            Number: `91${phoneNumber}`,
            SenderId: "AANSHI",
            TemplateId: process.env.SMS_REG_TEMPLATE_ID,
            DRNotifyUrl: "https://www.domainname.com/notifyurl",
            DRNotifyHttpMethod: "POST",
            Tool: "API",
        };

        const response = await axios.post(process.env.SMS_LOGIN_API, data, { headers });
        console.log("Registration SMS sent:", response.data);
        return { success: true, response: response.data };
    } catch (error) {
        console.error("Error sending registration SMS:", error);
        throw new Error("Failed to send registration SMS: " + error.message);
    }
};

// ✅ Account Activation SMS
export const sendAccountActivationSmS = async (phoneNumber, userName) => {
    try {
        if (!process.env.SMS_LOGIN_API || !process.env.SMS_LOGIN_AUTHORIZATION_KEY) {
            throw new Error("Missing SMS API configuration");
        }

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.SMS_LOGIN_AUTHORIZATION_KEY}==`,
        };

        const data = {
            Text: `नमस्ते,आपका vivahmahurat अकाउंट एक्टिवेट हो गया है,आप लॉगिन करके प्रोफाइल्स देख सकते हैं.vivahmahurat 9827072993`,
            Number: `91${phoneNumber}`,
            SenderId: "AANSHI",
            DRNotifyUrl: "https://www.domainname.com/notifyurl",
            DRNotifyHttpMethod: "POST",
            Tool: "API",
        };

        const response = await axios.post(process.env.SMS_LOGIN_API, data, { headers });
        console.log("Activation SMS sent:", response.data);
        return { success: true, response: response.data };
    } catch (error) {
        console.error("Error sending activation SMS:", error);
        throw new Error("Failed to send activation SMS: " + error.message);
    }
};

// ✅ Account Block SMS
export const sendAccountBlockSmS = async (phoneNumber, userName) => {
    try {
        if (!process.env.SMS_LOGIN_API || !process.env.SMS_LOGIN_AUTHORIZATION_KEY) {
            throw new Error("Missing SMS API configuration");
        }

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.SMS_LOGIN_AUTHORIZATION_KEY}==`,
        };

        const data = {
            Text: `Dear ${userName}, your account is blocked by company, Please contact company for activation. For queries-VivahMahurat-9827072993`,
            Number: `91${phoneNumber}`,
            SenderId: "AANSHI",
            DRNotifyUrl: "https://www.domainname.com/notifyurl",
            DRNotifyHttpMethod: "POST",
            Tool: "API",
        };

        const response = await axios.post(process.env.SMS_LOGIN_API, data, { headers });
        console.log("Block SMS sent:", response.data);
        return { success: true, response: response.data };
    } catch (error) {
        console.error("Error sending block SMS:", error);
        throw new Error("Failed to send block SMS: " + error.message);
    }
};

// ✅ Generic SMS Function
export const sendSmS = async (phoneNumber, message) => {
    try {
        if (!process.env.SMS_LOGIN_API || !process.env.SMS_LOGIN_AUTHORIZATION_KEY) {
            throw new Error("Missing SMS API configuration");
        }

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Basic ${process.env.SMS_LOGIN_AUTHORIZATION_KEY}==`,
        };

        const data = {
            Text: message,
            Number: `91${phoneNumber}`,
            SenderId: "AANSHI",
            DRNotifyUrl: "https://www.domainname.com/notifyurl",
            DRNotifyHttpMethod: "POST",
            Tool: "API",
        };

        const response = await axios.post(process.env.SMS_LOGIN_API, data, { headers });
        console.log("Generic SMS sent:", response.data);
        return { success: true, response: response.data };
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw new Error("Failed to send SMS: " + error.message);
    }
};