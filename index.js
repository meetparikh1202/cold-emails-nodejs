const nodemailer = require("nodemailer"); // supports sending emails
require("dotenv").config(); // supports env variables

// Read implementation doc for detailed info: https://nodemailer.com/about/

const email = process.env.EMAIL; // Gmail Address (eg., johndoe@gmail.com)

/* Gmail App Password (This is not the actual account password) 
More info on how to create App password: 
https://support.google.com/accounts/answer/185833?visit_id=638256000029737167-825618320&p=InvalidSecondFactor&rd=1 */
const pass = process.env.PASS;
const user_name = "user name"; // User Name (Eg., John Doe)
const resume_file_path = ""; // Local file path to resume - (Eg., ./Resume.pdf)

/* List of objects for sending emails to multiple companies at once.
This object can be modified as per the use-case */
const send_to = [
  {
    name: "HR NAME_1",
    email: "hr@companyA.in",
    company: "Company A",
  },
  {
    name: "HR NAME_2",
    email: "hr@companyB.in",
    company: "Company B",
  },
];

/* The below code is creating a transporter object using the nodemailer library in JavaScript. The
transporter object is used to send emails. It is configured to connect to the Gmail SMTP server
using the host and port specified. The `auth` object contains the email and password used to 
authenticate with the SMTP server. */
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: email,
    pass,
  },
});

/* The below code is using the `verify` method of the `transporter` object to check if the server is
ready to send messages. It takes a callback function as an argument, which will be called with an
error object if there is an error, or a success object if the server is ready. */
transporter.verify((err, _succ) => {
  if (err) console.log("Verification error", err); // logs error msg
  else sendMail(); // send email
});

/**
 * The `sendMail` function sends an email to multiple recipients with a subject, HTML content, and an
 * attachment.
 */
const sendMail = () => {
  send_to.forEach((receiver) => {
    transporter.sendMail(
      {
        from: `${user_name} <${email}>`,
        to: receiver.email,
        subject: `Software Developer Job Application - ${user_name}`,
        html: "<h1>Hello World</h1>", // Here goes the actual HTML content. It can be modified as per the use-case
        attachments: getFileAttachments(),
      },
      /* `(err, info) => {...}` is a callback function that is passed as an argument to the
                `transporter.sendMail` function which is called on error / success */
      (err, info) => {
        if (err) console.log("Email not sent", err); // logs error msg
        else console.log("Email sent", info.response); // logs success msg
      }
    );
  });
};

/**
 * The function `getFileAttachments` returns an array of file attachments, specifically a resume file,
 * if `resume_file_path` is defined.
 */
const getFileAttachments = () => {
  return resume_file_path
    ? [
        {
          filename: "<file name for attachment>", // eg., Resume_<user name>
          path: resume_file_path,
        },
      ]
    : [];
};
