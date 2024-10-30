'use server';

import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export type TurnstileStatus = 'success' | 'error' | 'expired' | 'required'

interface FormDataContent {
  name: string
  email: string
  inquiry: string
  cftttoken: string
}

export interface HandleFormSubmitResponse {
  status: number
  errType?: 'captcha' | 'failed'
  err?: string
}

async function verifyTurnstile(token: string, secret: string) {
	const verificationUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
  
	const verificationResponse = await fetch(verificationUrl, {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify({
		secret: secret,
		response: token,
	  })
	})
  
	const verificationResult = await verificationResponse.json()
	return verificationResult.success
}

export async function handleFormSubmit(
  formData: FormData,
  turnstileStatus: TurnstileStatus
): Promise<HandleFormSubmitResponse> {
  const data: FormDataContent = {
    name: (formData.get('name') as string) || '',
    email: (formData.get('email') as string) || '',
    inquiry: (formData.get('inq') as string) || '',
    cftttoken: (formData.get('cf-turnstile-response') as string) || ''
  }

  if (turnstileStatus !== 'success') {
    return { status: 400, errType: 'captcha' }
  }

  const verificationResponse = await verifyTurnstile(data.cftttoken, process.env.TURNSTILE_SECRET_KEY || "")

  if (!verificationResponse){
    return { status: 400, errType: 'captcha' }
  }

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ACC || '',
      pass: process.env.GMAIL_APPPW || ''
    }
  });

  const mailOptions: Mail.Options = {
    from: process.env.GMAIL_ACC,
    to: process.env.GMAIL_ACC,
    subject: `Message from ${data.name} (${data.email})`,
    text: data.inquiry
  };

  try {
    await transport.sendMail(mailOptions)
    return { status: 200 }
  } catch (err) {
    console.error(err)
    return { status: 500, errType: 'failed', err: (err as Error).message }
  }
}
