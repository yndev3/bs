<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>Confirmation of Exchange Application - BrandSwap</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            width: 50%;
            margin: auto;
            background: #ffffff;
            padding: 30px;
        }
        .header, .footer {
            background-color: #e6e6e6;
            text-align: center;
            padding: 10px;
        }
        .header h1 {
            margin: 0;
            color: #333333;
        }
        .content {
            margin: 20px 0;
            padding: 20px;
            border-top: 1px solid #e6e6e6;
            border-bottom: 1px solid #e6e6e6;
        }
        .details {
            margin-bottom: 20px;
        }
        .footer p {
            margin: 0;
            color: #333333;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>BrandSwap</h1>
        </div>
        <div class="content">
            <p>Dear {{ $booking->name }},</p>
            <p>We have received your exchange application. Thank you for using BrandSwap.</p>
            <div class="details">
                <strong>Reservation Number:</strong> {{ $booking->booking_number }}<br>
                <strong>Token ID:</strong> {{ $booking->product->token_id }}<br>
                <strong>Owner Address:</strong> {{ $booking->product->owner_address }}<br>
                <strong>Item Name:</strong> {{ $booking->product->name }}<br>
                <strong>Accepting Store:</strong> {{ $booking->store->name }}<br>
            </div>
            <p>Our staff will contact you via Telegram at 「{{ $booking->tg }}」 within 3 business days.</p>
            <p>■Notes:<br>
            ・If any sale or transfer between wallets is conducted before the exchange, the application will be invalid.<br>
            ・Only exchanges from the applied wallet address will be accepted at the exchange store.<br>
            ・Details such as the location of the store will be disclosed once the exchange date and time are determined for security reasons.</p>
            <p>Thank you for your understanding and cooperation.</p>
            <p>Best Regards,<br>BrandSwap Team</p>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} BrandSwap. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
