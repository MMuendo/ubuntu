// Email templates for Ubuntu AnalytIQ

export interface AssessmentEmailData {
    name?: string;
    email: string;
    score: number;
    scoreTitle: string;
    recommendedPlan: {
        name: string;
        description: string;
        price: number;
    };
    checkoutUrl: string;
}

export interface PurchaseConfirmationData {
    name?: string;
    email: string;
    productName: string;
    amount: number;
    currency: string;
    transactionId?: string;
    accessDetails?: string;
    calendarInvite?: string;
}

export const assessmentResultTemplate = (data: AssessmentEmailData) => {
    const { score, scoreTitle, recommendedPlan, checkoutUrl } = data;

    return {
        subject: `Your AI Fluency Score: ${score}% - ${scoreTitle}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your AI Fluency Assessment Results</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #FFFFFF;
      background-color: #1E1616;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px 0;
      background: linear-gradient(135deg, #2A2222 0%, #1E1616 100%);
      border-radius: 12px;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      color: #FFFFFF;
      margin-bottom: 10px;
    }
    .logo span {
      color: #00B4D8;
    }
    .score-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid #00B4D8;
      background: #2A2222;
      font-size: 36px;
      font-weight: bold;
      color: #FFFFFF;
      margin: 20px 0;
      box-shadow: 0 0 20px rgba(0, 180, 216, 0.3);
    }
    .score-title {
      font-size: 24px;
      color: #00B4D8;
      font-weight: bold;
      margin: 10px 0;
    }
    .content {
      background: #2A2222;
      padding: 30px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 20px;
    }
    .plan-card {
      background: linear-gradient(135deg, #2A2222 0%, #1E1616 100%);
      border: 2px solid #00B4D8;
      border-radius: 12px;
      padding: 25px;
      margin: 20px 0;
    }
    .plan-name {
      font-size: 22px;
      font-weight: bold;
      color: #00B4D8;
      margin-bottom: 10px;
    }
    .plan-description {
      color: #CCCCCC;
      margin-bottom: 15px;
    }
    .price {
      font-size: 28px;
      font-weight: bold;
      color: #FFFFFF;
      margin: 15px 0;
    }
    .cta-button {
      display: inline-block;
      background: #00B4D8;
      color: #1E1616;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      font-size: 16px;
      margin: 20px 0;
      box-shadow: 0 0 20px rgba(0, 180, 216, 0.4);
      transition: all 0.3s;
    }
    .cta-button:hover {
      background: #33C3E5;
      box-shadow: 0 0 30px rgba(0, 180, 216, 0.6);
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #999999;
      font-size: 14px;
    }
    .footer a {
      color: #00B4D8;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Ubuntu <span>AnalytIQ</span></div>
      <p style="color: #CCCCCC; margin: 0;">Your AI Fluency Assessment Results</p>
    </div>
    
    <div class="content" style="text-align: center;">
      <h2 style="color: #FFFFFF; margin-top: 0;">Congratulations on Completing the Assessment!</h2>
      
      <div class="score-badge">${score}%</div>
      <div class="score-title">${scoreTitle}</div>
      
      <p style="color: #CCCCCC; font-size: 16px; margin: 20px 0;">
        Your personalized roadmap is ready. Based on your results, we've identified the perfect learning path for you.
      </p>
    </div>
    
    <div class="plan-card">
      <div style="text-align: center;">
        <div style="display: inline-block; background: #00B4D8; color: #1E1616; padding: 6px 16px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 15px;">
          Recommended For You
        </div>
      </div>
      
      <div class="plan-name">${recommendedPlan.name}</div>
      <div class="plan-description">${recommendedPlan.description}</div>
      <div class="price">KES ${recommendedPlan.price.toLocaleString()}</div>
      
      <div style="text-align: center;">
        <a href="${checkoutUrl}" class="cta-button">Unlock My Personalized Plan →</a>
      </div>
    </div>
    
    <div class="content">
      <h3 style="color: #00B4D8; margin-top: 0;">What's Next?</h3>
      <ul style="color: #CCCCCC; padding-left: 20px;">
        <li style="margin-bottom: 10px;">Review your personalized learning plan</li>
        <li style="margin-bottom: 10px;">Enroll to get immediate access to course materials</li>
        <li style="margin-bottom: 10px;">Book your first mentor session</li>
        <li>Start your transformation journey today</li>
      </ul>
    </div>
    
    <div class="footer">
      <p>Need help? <a href="mailto:hello@ubuntuanalytiq.com">Contact our team</a></p>
      <p>Ubuntu AnalytIQ | Nairobi, Kenya</p>
      <p style="font-size: 12px; color: #666;">
        You received this email because you completed our AI Fluency Assessment.
      </p>
    </div>
  </div>
</body>
</html>
    `,
        text: `
Your AI Fluency Assessment Results

Congratulations! You scored ${score}% - ${scoreTitle}

Recommended Plan: ${recommendedPlan.name}
${recommendedPlan.description}
Price: KES ${recommendedPlan.price.toLocaleString()}

Get started now: ${checkoutUrl}

What's Next?
- Review your personalized learning plan
- Enroll to get immediate access
- Book your first mentor session
- Start your transformation journey

Need help? Contact us at hello@ubuntuanalytiq.com

Ubuntu AnalytIQ | Nairobi, Kenya
    `
    };
};

export const purchaseConfirmationTemplate = (data: PurchaseConfirmationData) => {
    const { productName, amount, currency, transactionId } = data;

    return {
        subject: `Welcome to ${productName}! Your Access Details`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purchase Confirmation</title>
  <style>
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #FFFFFF;
      background-color: #1E1616;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 30px;
      background: linear-gradient(135deg, #2A2222 0%, #1E1616 100%);
      border-radius: 12px;
      margin-bottom: 30px;
    }
    .success-icon {
      width: 80px;
      height: 80px;
      background: rgba(0, 180, 216, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      border: 3px solid #00B4D8;
    }
    .checkmark {
      width: 40px;
      height: 40px;
      border: 3px solid #00B4D8;
      border-radius: 50%;
      position: relative;
    }
    .checkmark:after {
      content: '';
      position: absolute;
      width: 12px;
      height: 20px;
      border: solid #00B4D8;
      border-width: 0 3px 3px 0;
      top: 6px;
      left: 11px;
      transform: rotate(45deg);
    }
    .content {
      background: #2A2222;
      padding: 30px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      margin-bottom: 20px;
    }
    .cta-button {
      display: inline-block;
      background: #00B4D8;
      color: #1E1616;
      padding: 16px 32px;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      font-size: 16px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #999999;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="success-icon">
        <div class="checkmark"></div>
      </div>
      <h1 style="color: #00B4D8; margin: 0;">Payment Successful!</h1>
      <p style="color: #CCCCCC; margin: 10px 0 0 0;">Welcome to Ubuntu AnalytIQ</p>
    </div>
    
    <div class="content">
      <h2 style="color: #FFFFFF; margin-top: 0;">Thank You for Your Purchase!</h2>
      <p style="color: #CCCCCC;">
        We're excited to have you join ${productName}. Your transformation journey starts now!
      </p>
      
      <div style="background: #1E1616; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <table style="width: 100%; color: #CCCCCC;">
          <tr>
            <td style="padding: 8px 0;"><strong style="color: #00B4D8;">Product:</strong></td>
            <td style="padding: 8px 0; text-align: right;">${productName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong style="color: #00B4D8;">Amount:</strong></td>
            <td style="padding: 8px 0; text-align: right;">${currency} ${amount.toLocaleString()}</td>
          </tr>
          ${transactionId ? `
          <tr>
            <td style="padding: 8px 0;"><strong style="color: #00B4D8;">Transaction ID:</strong></td>
            <td style="padding: 8px 0; text-align: right; font-family: monospace;">${transactionId}</td>
          </tr>
          ` : ''}
        </table>
      </div>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://calendly.com" class="cta-button">Book Your First Session →</a>
      </div>
    </div>
    
    <div class="content">
      <h3 style="color: #00B4D8; margin-top: 0;">What Happens Next?</h3>
      <ol style="color: #CCCCCC; padding-left: 20px;">
        <li style="margin-bottom: 12px;">Check your inbox for course access details (arriving within 5 minutes)</li>
        <li style="margin-bottom: 12px;">Book your first mentor session using the link above</li>
        <li style="margin-bottom: 12px;">Join our community Slack channel</li>
        <li>Start learning at your own pace!</li>
      </ol>
    </div>
    
    <div class="footer">
      <p>Questions? <a href="mailto:hello@ubuntuanalytiq.com" style="color: #00B4D8; text-decoration: none;">hello@ubuntuanalytiq.com</a></p>
      <p>Ubuntu AnalytIQ | Nairobi, Kenya</p>
    </div>
  </div>
</body>
</html>
    `,
        text: `
Payment Successful!

Thank you for your purchase of ${productName}!

Order Details:
- Product: ${productName}
- Amount: ${currency} ${amount.toLocaleString()}
${transactionId ? `- Transaction ID: ${transactionId}` : ''}

What's Next?
1. Check your inbox for course access details
2. Book your first mentor session
3. Join our community
4. Start learning!

Questions? Contact us at hello@ubuntuanalytiq.com

Ubuntu AnalytIQ | Nairobi, Kenya
    `
    };
};

// Consultation Booking Email Templates

export interface ConsultationEmailData {
    name: string;
    email: string;
    courseName?: string;
    type: string;
    date?: string;
    time?: string;
    phone?: string;
    notes?: string;
}

export const consultationConfirmationTemplate = (data: ConsultationEmailData) => {
    const { name, courseName, type, date, time } = data;

    return {
        subject: `Consultation Confirmed${courseName ? ` - ${courseName}` : ''}`,
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Consultation Confirmed</title>
  <style>
    body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #FFFFFF; background-color: #1E1616; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding: 30px; background: linear-gradient(135deg, #2A2222 0%, #1E1616 100%); border-radius: 12px; margin-bottom: 30px; }
    .logo { font-size: 28px; font-weight: bold; color: #FFFFFF; }
    .logo span { color: #00B4D8; }
    .content { background: #2A2222; padding: 30px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1); margin-bottom: 20px; }
    .info-box { background: #1E1616; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00B4D8; }
    .cta-button { display: inline-block; background: #00B4D8; color: #1E1616; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #999999; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">Ubuntu <span>AnalytIQ</span></div>
      <p style="color: #00B4D8; font-size: 20px; margin: 10px 0 0 0;">Consultation Confirmed! 🎉</p>
    </div>
    
    <div class="content">
      <h2 style="color: #FFFFFF; margin-top: 0;">Hi ${name},</h2>
      <p style="color: #CCCCCC;">
        Great news! Your consultation request has been confirmed. We're excited to help you on your learning journey!
      </p>
      
      <div class="info-box">
        ${courseName ? `<p style="margin: 5px 0;"><strong style="color: #00B4D8;">Course:</strong> ${courseName}</p>` : ''}
        <p style="margin: 5px 0;"><strong style="color: #00B4D8;">Type:</strong> ${type}</p>
        ${date ? `<p style="margin: 5px 0;"><strong style="color: #00B4D8;">Date:</strong> ${date}</p>` : ''}
        ${time ? `<p style="margin: 5px 0;"><strong style="color: #00B4D8;">Time:</strong> ${time} (EAT)</p>` : ''}
      </div>
      
      <h3 style="color: #00B4D8;">What to Expect</h3>
      <ul style="color: #CCCCCC;">
        <li>Expert guidance on course selection and career paths</li>
        <li>Personalized learning recommendations</li>
        <li>Q&A about our programs and methodology</li>
        <li>Enrollment support if you decide to join</li>
      </ul>
      
      <p style="color: #CCCCCC;">
        We'll send you a reminder email 24 hours before your scheduled consultation. If you need to reschedule, please contact us.
      </p>
    </div>
    
    <div class="footer">
      <p>Questions? <a href="mailto:hello@ubuntuanalytiq.com" style="color: #00B4D8; text-decoration: none;">hello@ubuntuanalytiq.com</a></p>
      <p>Ubuntu AnalytIQ | Nairobi, Kenya</p>
    </div>
  </div>
</body>
</html>
        `,
        text: `
Consultation Confirmed!

Hi ${name},

Your consultation request has been confirmed. We're excited to help you!

${courseName ? `Course: ${courseName}` : ''}
Type: ${type}
${date ? `Date: ${date}` : ''}
${time ? `Time: ${time} (EAT)` : ''}

What to Expect:
- Expert guidance on course selection
- Personalized learning recommendations
- Q&A about our programs
- Enrollment support

We'll send you a reminder 24 hours before your consultation.

Questions? Contact us at hello@ubuntuanalytiq.com

Ubuntu AnalytIQ | Nairobi, Kenya
        `
    };
};
