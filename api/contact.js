module.exports = (router, nodemailer) => {
  const transport = {
    host: process.env.MAIL_HOST,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  };

  const transporter = nodemailer.createTransport(transport);

  transporter.verify((error) => {
    if (error) {
      console.error('Transporter error :', error);
    }
  });

  router.post('/contact/send', (request, response) => {
    const {
      name,
      email,
      object,
      message,
    } = request.body.name;

    const content = `name: ${name} \n email: ${email} \n object: ${object} \n message: ${message}`;

    const mail = {
      from: name,
      to: 'eventListener.oclock@gmail.com', // Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: content,
    };

    transporter.sendMail(mail, (error) => {
      if (error) {
        response.json({
          error: true,
          errorMessage: error,
        });
      }
      else {
        response.json({
          error: false,
        });
      }
    });
  });
};
