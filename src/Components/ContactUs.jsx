

import emailjs from "@emailjs/browser";

import toast, { Toaster } from "react-hot-toast";
import { useRef } from "react";
const ContactUs = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        // Log form values
        console.log("Name:", form.current.user_name.value);
        console.log("Email:", form.current.user_email.value);
        console.log("Message:", form.current.message.value);

        emailjs
            .sendForm(
                "service_ngj61pm",
                "template_39d1qga",
                form.current,
                "fYc9OsJqwXNOnP2_w"
            )
            .then(
                (result) => {
                    toast.success('Message Sent')
                    console.log(result.text);
                    console.log("message sent");
                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    return (
        <div className="min-h-[60vh] mt-14 mb-20">
            <Toaster />
            <div className="md:flex gap-10 md:w-9/12 items-center justify-center p-3 mx-auto">
                <form ref={form} onSubmit={sendEmail} className="flex flex-1  flex-col space-y-5">
                    <h1 className="text-transparent text-3xl pb-3 font-semibold md:text-7xl text-center lg:text-left mt-8 mb-3 bg-clip-text bg-gradient-to-r from-violet-600 to-amber-500">
                        Contact Us
                    </h1>
                    <input required type="text" name="user_name" placeholder="Name" className="bordered input border rounded-full bg-slate-100 p-4  " />
                    <input required type="email" name="user_email" placeholder="Email" className="bordered input border rounded-full bg-slate-100 p-4  " />
                    <textarea required name="message" placeholder="Write your Message" className=" rounded-full bg-slate-100 p-4 h-20  "></textarea>
                    <input type="submit" value={'Send Message'} className="btn border btn-primary rounded-full  p-4  " />
                </form>
                <div className="flex-1 mt-10">
                    <img className="w-full" src={'https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?size=338&ext=jpg&ga=GA1.1.1222169770.1702339200&semt=ais'} />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;