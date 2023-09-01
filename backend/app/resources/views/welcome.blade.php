<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- ***** All CSS Files ***** -->

    <!-- Style css -->
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>NetStorm - React NFT Marketplace Template</title>
    @viteReactRefresh @vite(['resources/src/index.jsx'])
</head>
<body>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
<!--
  This HTML file is a template.
  If you open it directly in the browser, you will see an empty page.

  You can add webfonts, meta tags, or analytics to this file.
  The build step will place the bundled scripts into the <body> tag.

  To begin the development, run `npm start` or `yarn start`.
  To create a production bundle, use `npm run build` or `yarn build`.
-->

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
