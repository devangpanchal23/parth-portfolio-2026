import { Resend } from 'resend';

const resend = new Resend('re_FngzBSDX_9ys8rctoSkNwyF7bYAg7UsnL');

export const sendEmail = async (formData) => {
  try {
    const { name, email, message } = formData;
    
    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'devangpanchal23052006@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
            <p>This message was sent from your portfolio website contact form.</p>
          </div>
        </div>
      `,
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { 
      success: false, 
      error: error.message || 'Failed to send email. Please try again.' 
    };
  }
};
