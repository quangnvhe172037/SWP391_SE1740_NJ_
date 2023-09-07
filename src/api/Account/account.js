import getRole from "../../role";
const api = "http://6th.onrender.com";

async function LoginApi(account) {
    const kq = {
        ok: false,
        token: "",
        status: 0,
    };
    try {
        const response = await fetch(`${api}/auth/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
        });

        kq.ok = response.ok;
        kq.status = response.status;

        if (kq.status === 200) {
            const data = await response.json();
            kq.token = data.accessToken;
        }
    } catch (err) {
        kq.status = err;
    }
    return kq;
}

async function RegisterApi(account) {
    const kq = {
        status: 0,
        message: "",
    };
    try {
        const response = await fetch(`${api}/auth/register`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
        });
        if (response.status === 200) {
            kq.status = response.status;
            const mess = await response.json();
            kq.message = mess.message;
        } else {
            kq.status = response.status;
        }
    } catch (err) {
        kq.status = err;
    }
    console.log(kq);
    return kq;
}

async function ForgotPasswordgetEmail(email) {
    const kq = {
        status: 0,
        mess: "",
    };
    const emailJson = {
        email: email,
    };
    try {
        const response = await fetch(`${api}/forgot-password`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailJson),
        });
        kq.status = response.status;
        const mess = await response.json();
        kq.mess = mess.message;
    } catch (err) {
        kq.mess = err;
    }
    return kq;
}

async function ChangePasswordForgotPassword(account) {
    const kq = {
        status: 0,
        mess: "",
    };
    try {
        const response = await fetch(`${api}/forgot-password/update`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
        });
        kq.status = response.status;
        if (kq.status === 200) {
            kq.message = "Change Password Successfully!!!";
        } else {
            const resuilt = await response.json();
            kq.message = resuilt;
        }
    } catch (err) {
        kq.message = err;
    }
    return kq;
}

async function ChangePassword(data) {
    try {
        const role = getRole();
        const response = await fetch(
            `${api}/customer/my-account-info/update-password`,
            {
                method: "post",
                headers: {
                    "Content-type": "application/json",
                    authorization: role?.token ? `Bearer ${role.token}` : "",
                },
                body: JSON.stringify(data),
            }
        );
        if (response.status === 200) {
            const data = await response.json();
            return { success: true, message: data };
        } else if (response.status === 401) {
            return {
                success: false,
                message: "token has wrong or expired, please login again",
            };
        } else {
            return { success: false, message: "Unexpected error" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}

async function setEmailChangePassword() {
    try {
        const role = getRole();
        const response = await fetch(
            `${api}/customer/my-account-info/password-change`,
            {
                method: "get",
                headers: {
                    "Content-type": "application/json",
                    authorization: role?.token ? `Bearer ${role.token}` : "",
                },
            }
        );
        if (response.status === 200) {
            const data = await response.json();
            return { success: true, message: data.message };
        } else if (response.status === 401) {
            return {
                success: false,
                message: "token has wrong or expired, please login again",
            };
        } else {
            return { success: false, message: "Unexpected error" };
        }
    } catch (error) {
        return { success: false, message: "Error: " + error.message };
    }
}

export {
    LoginApi,
    RegisterApi,
    ForgotPasswordgetEmail,
    ChangePasswordForgotPassword,
    ChangePassword,
    setEmailChangePassword,
};