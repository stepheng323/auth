/* eslint-disable import/prefer-default-export */
/* eslint-disable object-curly-newline */
import nodemailer from 'nodemailer';
import { EMAIL_USERNAME, EMAIL_PASSWORD } from '../config/constants';

/**
 *
 * @param {String} to
 * @param {String} subject
 * @param {String} body
 * @returns {Promise} null
 */
export const sendMail = ({ emailTo, emailSubject, emailBody }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });

  return transporter.sendMail({
    from: '"After7" <support@after7.ng>',
    to: emailTo,
    subject: emailSubject,
    html: emailBody,
  });
};

export const sendMailToManagment = ({ emailSubject, emailBody }) => {
  const emailRecipients = [
    'ope@intelligentinnovations.co',
    'olalekan@intelligentinnovations.co',
    'promise@intelligentinnovations.co',
    'ayomideoladimeji@intelligentinnovations.co',
  ];
  sendMail({ emailTo: emailRecipients, emailSubject, emailBody });
};
