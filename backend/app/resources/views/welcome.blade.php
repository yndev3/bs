<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex, nofollow">
    <!-- ***** All CSS Files ***** -->

    <!-- Style css -->
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">

    <title>Dashboard - BrandSwap</title>
    @viteReactRefresh @vite(['resources/src/index.jsx'])
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>


<!-- ***** All jQuery Plugins ***** -->

<!-- jQuery(necessary for all JavaScript plugins) -->
<script src="/assets/js/vendor/core.min.js"></script>

<!-- Bootstrap js -->
<script src="/assets/js/vendor/popper.min.js"></script>
<script src="/assets/js/vendor/bootstrap.min.js"></script>

<!-- Plugins js -->
<script src="/assets/js/vendor/all.min.js"></script>
<script src="/assets/js/vendor/slider.min.js"></script>
<script src="/assets/js/vendor/countdown.min.js"></script>
{{--<!--    <script src="{{public_path("/assets/js/vendor/shuffle.min.js"}}script>-->--}}

<!-- Active js -->
<script src="/assets/js/main.js"></script>

</body>
</html>
