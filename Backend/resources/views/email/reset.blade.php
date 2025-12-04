
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>

    <style>
        /* Basic Reset */
        body, h1, p {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }

        body {
            background-color: #f7f7f7;
            padding: 30px;
        }

        .email-wrapper {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
        }

        h1 {
            font-size: 24px;
            color: #333333;
            text-align: center;
            margin-bottom: 20px;
        }

        p {
            font-size: 16px;
            color: #555555;
            line-height: 1.6;
            margin-bottom: 20px;
        }

        .cta-button {
            display: inline-block;
            background-color: #3498db;
            color: white;
            padding: 12px 30px;
            font-size: 18px;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            margin: 20px auto;
        }

        .cta-button:hover {
            background-color: #2980b9;
        }

        .footer {
            text-align: left;
            font-size: 14px;
            color: #888888;
            margin-top: 30px;
        }

        @media only screen and (max-width: 600px) {
            .email-wrapper {
                padding: 20px;
            }

            h1 {
                font-size: 20px;
            }

            .cta-button {
                font-size: 16px;
                padding: 10px 25px;
            }
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <h1>{{ config('app.name') }}</h1>

        <p>Hello,</p>
        <p>You are receiving this email because we received a password reset request for your account.</p>

        <a href={{ "http://178.128.168.94/reset-password?token=". $token }} class="cta-button">Reset Password</a>

        <p>This password reset link will expire in 60 minutes.</p>
        
        <p>If you did not request a password reset, no further action is required.</p>

        <div class="footer">
            <p>Regards,<br>{{ config('app.name') }}</p>
        </div>
    </div>
</body>
</html>