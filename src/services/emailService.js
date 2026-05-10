export const sendEmail = async (formData) => {
  try {
    const response = await fetch('https://formsubmit.co/ajax/devangpanchal23052006@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        _subject: `New Portfolio Contact from ${formData.name}`,
        _template: "box",
        _autoresponse: "Thank you for reaching out! I have received your message and will get back to you shortly. - Parth Panchal"
      }),
    });

    const data = await response.json();

    if (!response.ok || data.success === 'false') {
      throw new Error(data.message || data.error || 'Failed to send message. You may need to activate FormSubmit first.');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message || 'Failed to connect. Please check your internet connection.'
    };
  }
};
